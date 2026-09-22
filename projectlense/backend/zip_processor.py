import os
import zipfile
import shutil
from typing import Dict, Any, List, Optional
from pdf_processor import extract_pdf_data

SUPPORTED_CODE_EXTS = {
    ".py": "Python",
    ".js": "JavaScript",
    ".jsx": "React (JSX)",
    ".ts": "TypeScript",
    ".tsx": "React (TSX)",
    ".java": "Java",
    ".cpp": "C++",
    ".c": "C",
    ".html": "HTML",
    ".css": "CSS",
    ".sql": "SQL",
    ".json": "JSON Configuration",
    ".md": "Markdown Documentation"
}

def analyze_zip_archive(zip_path: str, extract_to_dir: str) -> Dict[str, Any]:
    """
    Safely extracts a ZIP archive, inspects file structure, calculates code statistics,
    identifies tech stacks, and locates any embedded PDF reports.
    """
    os.makedirs(extract_to_dir, exist_ok=True)
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to_dir)
        
    total_files = 0
    total_loc = 0
    language_counts = {}
    found_pdfs = []
    file_tree = []
    
    for root, dirs, files in os.walk(extract_to_dir):
        # Ignore common hidden / heavy dependency directories
        dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', '__pycache__', 'dist', 'build', '.venv', 'env'}]
        
        for file in files:
            total_files += 1
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, extract_to_dir)
            
            _, ext = os.path.splitext(file)
            ext = ext.lower()
            
            # Check for PDF reports inside ZIP
            if ext == ".pdf":
                found_pdfs.append(full_path)
                
            # Count Code Metrics
            if ext in SUPPORTED_CODE_EXTS:
                lang = SUPPORTED_CODE_EXTS[ext]
                language_counts[lang] = language_counts.get(lang, 0) + 1
                
                try:
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = len(f.readlines())
                        total_loc += lines
                except Exception:
                    pass
                    
            if len(file_tree) < 25:
                file_tree.append(rel_path)

    # Detect Primary Tech Stack
    detected_stack = list(language_counts.keys())
    if not detected_stack:
        detected_stack = ["Standard Project Archive"]

    # Extract report text if a PDF is found inside the ZIP
    pdf_report_data = None
    if found_pdfs:
        try:
            pdf_report_data = extract_pdf_data(found_pdfs[0])
        except Exception as e:
            print(f"[ZIP Processor] Error parsing inner PDF: {e}")

    return {
        "is_zip": True,
        "total_files": total_files,
        "total_loc": total_loc,
        "detected_stack": detected_stack,
        "file_distribution": language_counts,
        "sample_tree": file_tree,
        "found_report_pdf": os.path.basename(found_pdfs[0]) if found_pdfs else None,
        "pdf_report_data": pdf_report_data
    }
