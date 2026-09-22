import requests
import json

url = "http://127.0.0.1:8000/api/projects/upload"
zip_path = "sample_reports/ResQ_Crisis_Platform_Project.zip"

with open(zip_path, "rb") as f:
    files = {"report": ("ResQ_Crisis_Platform_Project.zip", f, "application/zip")}
    data = {
        "title": "ResQ: Smart Crisis Coordination Platform",
        "description": "Multi-agency emergency response and incident verification platform.",
        "department": "Computer Engineering",
        "academic_year": "2024-25",
        "faculty_guide": "Prof. Mrunal Vaidya",
        "student_name": "Rohit Jadhav",
        "student_id": "student-1"
    }
    
    resp = requests.post(url, files=files, data=data)
    print("STATUS CODE:", resp.status_code)
    try:
        res = resp.json()
        print("OVERALL AI SCORE:", res["project"]["ai_evaluation"]["overall_score"])
        print("FILE TYPE:", res["project"]["file_type"])
        print("CODEBASE METRICS:", res["project"]["codebase_metrics"])
        print("DETECTED SECTIONS:", res["project"]["detected_sections"])
    except Exception as e:
        print("Raw response:", resp.text)
