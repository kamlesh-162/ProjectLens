import fitz  # PyMuPDF
import os

def create_student_management_pdf():
    os.makedirs("sample_reports", exist_ok=True)
    pdf_path = os.path.join("sample_reports", "Student_Management_System_Report.pdf")
    
    doc = fitz.open()
    
    # Page 1: Title & Abstract
    p1 = doc.new_page()
    text_p1 = """
PROJECT REPORT: SMART STUDENT MANAGEMENT SYSTEM
Department of Computer Science & Engineering | Academic Year 2024–25
Submitted by: Rahul Sharma (Roll: CS2024-042)
Faculty Guide: Dr. Priya Nair

1. ABSTRACT
The Smart Student Management System (SMS) is an automated web-based platform designed to streamline academic records, student enrollment, grading rubrics, and attendance management. Traditional manual record-keeping in universities suffers from data redundancy, processing latency, and security vulnerabilities. This project introduces a 3-tier client-server architecture built on React.js, Node.js, and a normalized MySQL database, featuring Role-Based Access Control (RBAC) and real-time dashboard analytics.

2. PROBLEM DEFINITION & MOTIVATION
In modern higher education institutions, administrative staff and faculty spend up to 14 hours weekly managing course allocations, transcript verification, and attendance logs. The core problem this capstone addresses:
- Lack of centralized real-time synchronization between department portals.
- Vulnerabilities in paper-based viva evaluations and mark tabulation.
- Inability to quickly generate compliance reports for academic accreditation committees.
The proposed system automates end-to-end student lifecycle management with high data integrity.
"""
    p1.insert_text((50, 50), text_p1, fontsize=11, fontname="helv")
    
    # Page 2: Literature Review & Methodology
    p2 = doc.new_page()
    text_p2 = """
3. LITERATURE REVIEW & RELATED WORK
We surveyed several existing Enterprise Resource Planning (ERP) frameworks:
- Sharma et al. (2021) designed a cloud-hosted university information system but noted significant database latency during peak registration periods.
- Patel & Verma (2023) implemented attendance tracking using RFID tokens; however, hardware deployment costs make it unfeasible for distributed campus environments.
- Kumar (2022) surveyed web-based grading portals, identifying a critical gap in automated rubric-based faculty review workflows.

4. METHODOLOGY & PROPOSED SYSTEM ARCHITECTURE
The system is architected into three decoupled layers:
- Presentation Layer: Responsive Single Page Application (SPA) built in React with Tailwind CSS.
- Application Layer: RESTful microservices powered by Node.js/Express, managing authentication via JWT.
- Data Storage Layer: Normalized Relational Database (3NF) ensuring ACID transactional compliance for grade submissions.
- Security Subsystem: Bcrypt hashing for password credentials and token-based RBAC for Student, Faculty, and Admin roles.
"""
    p2.insert_text((50, 50), text_p2, fontsize=11, fontname="helv")

    # Page 3: Implementation, Results & Conclusion
    p3 = doc.new_page()
    text_p3 = """
5. IMPLEMENTATION & TECHNICAL STACK
- Frontend Modules: Student Portal, Faculty Grading Workbench, Admin User Roster.
- Backend Services: Student Enrollment API, Marks Processing Controller, Report Generation Service.
- Database Tables: Students, Courses, Enrollments, Grades, RubricCriteria, AuditLogs.

6. RESULTS & PERFORMANCE BENCHMARKS
The prototype was tested across a simulated dataset of 500 student records:
- User Authentication Latency: Average response time of 42ms under 50 concurrent requests.
- Transcript Generation: PDF generation latency averaged 180ms per student record.
- Security Validation: SQL injection tests and XSS payload validations passed without exploitability.

7. CONCLUSION & FUTURE SCOPE
The Smart Student Management System demonstrates an efficient, user-friendly, and secure platform for academic administration. Future enhancements include:
- Integrating biometrics or AI facial recognition for attendance verification.
- Deploying machine learning models for early predictive warnings on at-risk student performance.

8. REFERENCES
[1] Sharma, R., et al. (2021). "Cloud-based Campus Management Systems." IEEE Trans. Edu.
[2] Patel, K., & Verma, S. (2023). "Automated Attendance Systems." Int. J. Computer Applications.
[3] Kumar, A. (2022). "Standardized Grading Portals in Higher Education." ACM SIGCSE.
"""
    p3.insert_text((50, 50), text_p3, fontsize=11, fontname="helv")

    doc.save(pdf_path)
    doc.close()
    print(f"Sample PDF created at {pdf_path}")

if __name__ == "__main__":
    create_student_management_pdf()
