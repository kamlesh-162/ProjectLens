import requests
import json

url = "http://127.0.0.1:8000/api/projects/upload"
pdf_path = "sample_reports/Student_Management_System_Report.pdf"

with open(pdf_path, "rb") as f:
    files = {"report": ("Student_Management_System_Report.pdf", f, "application/pdf")}
    data = {
        "title": "Smart Student Management System",
        "description": "An automated web-based platform designed to streamline academic records and grading rubrics.",
        "department": "Computer Science",
        "academic_year": "2024-25",
        "faculty_guide": "Dr. Priya Nair",
        "student_name": "Rahul Sharma",
        "student_id": "student-1"
    }
    
    resp = requests.post(url, files=files, data=data)
    print("STATUS CODE:", resp.status_code)
    try:
        res = resp.json()
        print("OVERALL AI SCORE:", res["project"]["ai_evaluation"]["overall_score"])
        print("DETECTED SECTIONS:", res["project"]["detected_sections"])
        print("DOCUMENT STATS:", res["project"]["document_stats"])
        print("CRITERION SCORES:")
        for c in res["project"]["ai_evaluation"]["criterion_scores"]:
            print(f"  - {c['criterion']}: {c['score']}/{c['maximum_score']} -> {c['reasoning']}")
        print("STRENGTHS:", res["project"]["ai_evaluation"]["strengths"])
        print("SUGGESTIONS:", res["project"]["ai_evaluation"]["suggestions"])
    except Exception as e:
        print("Raw response:", resp.text)
