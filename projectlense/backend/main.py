import os
import shutil
import uuid
from datetime import datetime
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from pdf_processor import extract_pdf_data
from zip_processor import analyze_zip_archive
from llm_evaluator import evaluate_project_with_ai
from database import insert_project, get_all_projects, get_project_by_id, update_project

app = FastAPI(title="ProjectLense AI Evaluation API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
EXTRACT_DIR = os.path.join(os.path.dirname(__file__), "extracted_projects")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(EXTRACT_DIR, exist_ok=True)

class FacultyReviewRequest(BaseModel):
    final_score: int
    comment: str
    faculty_name: Optional[str] = "Dr. Priya Nair"

@app.get("/")
def read_root():
    return {
        "service": "ProjectLense AI Evaluation API",
        "status": "online",
        "supported_uploads": ["PDF (.pdf)", "ZIP Project Archive (.zip)"],
        "llm_provider": os.getenv("LLM_PROVIDER", "Auto (Gemini / OpenAI / Content-Aware Fallback)")
    }

@app.post("/api/projects/upload")
async def upload_and_evaluate_project(
    title: str = Form(...),
    description: Optional[str] = Form(""),
    department: Optional[str] = Form("Computer Science"),
    academic_year: Optional[str] = Form("2024-25"),
    faculty_guide: Optional[str] = Form("Dr. Priya Nair"),
    student_name: Optional[str] = Form("Rahul Sharma"),
    student_id: Optional[str] = Form("student-1"),
    report: UploadFile = File(...)
):
    """
    Receives either a PDF report OR a ZIP codebase archive.
    Performs real text extraction, code analysis, and rubric evaluation.
    """
    filename_lower = report.filename.lower()
    is_pdf = filename_lower.endswith(".pdf")
    is_zip = filename_lower.endswith(".zip")
    
    if not (is_pdf or is_zip):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported format. Please upload either a PDF document (.pdf) or a ZIP archive (.zip)."
        )
    
    project_id = f"proj-{uuid.uuid4().hex[:8]}"
    saved_filename = f"{project_id}_{report.filename}"
    file_path = os.path.join(UPLOAD_DIR, saved_filename)
    
    # 1. Save uploaded file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(report.file, buffer)
        
    try:
        extracted_text = ""
        doc_stats = {}
        detected_sections = []
        codebase_metrics = None

        if is_pdf:
            # Extract PDF directly
            pdf_data = extract_pdf_data(file_path)
            extracted_text = pdf_data["text"]
            detected_sections = pdf_data["detected_sections"]
            doc_stats = {
                "page_count": pdf_data["page_count"],
                "word_count": pdf_data["word_count"],
                "char_count": pdf_data["char_count"],
                "reading_time_min": pdf_data["reading_time_min"]
            }
        elif is_zip:
            # Extract and inspect ZIP archive
            project_extract_dir = os.path.join(EXTRACT_DIR, project_id)
            zip_analysis = analyze_zip_archive(file_path, project_extract_dir)
            
            codebase_metrics = {
                "total_files": zip_analysis["total_files"],
                "total_loc": zip_analysis["total_loc"],
                "detected_stack": zip_analysis["detected_stack"],
                "file_distribution": zip_analysis["file_distribution"],
                "sample_tree": zip_analysis["sample_tree"],
                "found_report_pdf": zip_analysis["found_report_pdf"]
            }

            if zip_analysis["pdf_report_data"]:
                # Use PDF embedded in ZIP
                inner_pdf = zip_analysis["pdf_report_data"]
                extracted_text = inner_pdf["text"]
                detected_sections = inner_pdf["detected_sections"]
                doc_stats = {
                    "page_count": inner_pdf["page_count"],
                    "word_count": inner_pdf["word_count"],
                    "char_count": inner_pdf["char_count"],
                    "reading_time_min": inner_pdf["reading_time_min"]
                }
            else:
                # Synthesize text from codebase structure
                extracted_text = f"Project: {title}\nDescription: {description}\nTechnologies: {', '.join(zip_analysis['detected_stack'])}\nLines of Code: {zip_analysis['total_loc']}\nFiles: {', '.join(zip_analysis['sample_tree'])}"
                detected_sections = ["Codebase Architecture", "Implementation Modules", "Repository Documentation"]
                doc_stats = {
                    "page_count": 1,
                    "word_count": zip_analysis["total_loc"] // 4,
                    "char_count": zip_analysis["total_loc"] * 25,
                    "reading_time_min": max(1, zip_analysis["total_loc"] // 800)
                }

        # 3. Perform Rubric-Based AI Evaluation
        ai_evaluation = evaluate_project_with_ai(
            extracted_text=extracted_text,
            project_title=title,
            detected_sections=detected_sections,
            doc_stats=doc_stats
        )
        
        # If codebase metrics exist, enhance the implementation rubric score with real code data
        if codebase_metrics:
            ai_evaluation["codebase_metrics"] = codebase_metrics
            if codebase_metrics["total_loc"] > 500:
                for c in ai_evaluation.get("criterion_scores", []):
                    if c["criterion"] == "Implementation":
                        c["reasoning"] = f"Verified codebase with {codebase_metrics['total_loc']:,} lines of code across {codebase_metrics['total_files']} files ({', '.join(codebase_metrics['detected_stack'][:3])})."

        # 4. Construct complete project record
        project_record = {
            "id": project_id,
            "title": title,
            "description": description or (extracted_text[:300] + "..."),
            "department": department,
            "academic_year": academic_year,
            "faculty_guide": faculty_guide,
            "student_id": student_id,
            "student_name": student_name,
            "status": "evaluated",
            "submitted_at": datetime.utcnow().isoformat() + "Z",
            "filename": report.filename,
            "file_type": "zip" if is_zip else "pdf",
            "document_stats": doc_stats,
            "detected_sections": detected_sections,
            "codebase_metrics": codebase_metrics,
            "ai_evaluation": ai_evaluation,
            "faculty_evaluation": None
        }
        
        # 5. Persist to database
        saved = insert_project(project_record)
        return {"success": True, "project": saved}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File evaluation failed: {str(e)}")


@app.get("/api/projects")
def list_projects(student_id: Optional[str] = None):
    all_p = get_all_projects()
    if student_id:
        return [p for p in all_p if p.get("student_id") == student_id]
    return all_p


@app.get("/api/projects/{project_id}")
def get_project_details(project_id: str):
    p = get_project_by_id(project_id)
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    return p


@app.post("/api/projects/{project_id}/faculty-review")
def save_faculty_review(project_id: str, review: FacultyReviewRequest):
    p = get_project_by_id(project_id)
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
        
    updated = update_project(project_id, {
        "status": "under_review",
        "faculty_evaluation": {
            "final_score": review.final_score,
            "comment": review.comment,
            "reviewed_by": review.faculty_name,
            "reviewed_at": datetime.utcnow().isoformat() + "Z",
            "is_approved": False
        }
    })
    return {"success": True, "project": updated}


@app.post("/api/projects/{project_id}/approve")
def approve_faculty_review(project_id: str, review: FacultyReviewRequest):
    p = get_project_by_id(project_id)
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
        
    updated = update_project(project_id, {
        "status": "approved",
        "faculty_evaluation": {
            "final_score": review.final_score,
            "comment": review.comment,
            "reviewed_by": review.faculty_name,
            "approved_at": datetime.utcnow().isoformat() + "Z",
            "is_approved": True
        }
    })
    return {"success": True, "project": updated}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
