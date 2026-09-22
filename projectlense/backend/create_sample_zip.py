import zipfile
import os

def create_sample_project_zip():
    os.makedirs("sample_reports", exist_ok=True)
    zip_path = os.path.join("sample_reports", "ResQ_Crisis_Platform_Project.zip")
    
    with zipfile.ZipFile(zip_path, 'w') as zf:
        # 1. Add report PDF if exists
        pdf_source = os.path.join("sample_reports", "Student_Management_System_Report.pdf")
        if os.path.exists(pdf_source):
            zf.write(pdf_source, "documentation/ResQ_Final_Project_Report.pdf")
            
        # 2. Add sample code files
        zf.writestr("src/App.jsx", "import React from 'react';\nexport default function App() { return <h1>ResQ Command Center</h1>; }\n")
        zf.writestr("src/components/IncidentMap.jsx", "import React from 'react';\n// Multi-agency GIS real-time incident tracking\nexport const IncidentMap = () => <div>Map Component</div>;\n")
        zf.writestr("backend/api/dispatch.py", "#!/usr/bin/env python3\n# Multi-agency resource allocation engine\ndef dispatch_responders(incident_id, agency_type):\n    return {'status': 'dispatched', 'incident': incident_id}\n")
        zf.writestr("backend/models/incident.py", "from pydantic import BaseModel\nclass Incident(BaseModel):\n    title: str\n    severity: int\n    location: str\n")
        zf.writestr("database/schema.sql", "CREATE TABLE incidents (id VARCHAR(36) PRIMARY KEY, severity INT, agency VARCHAR(50));\n")
        zf.writestr("README.md", "# ResQ: Smart Crisis Coordination Platform\nMulti-agency emergency response framework integrating AI incident verification.\n")
        
    print(f"Sample project ZIP created at: {zip_path}")

if __name__ == "__main__":
    create_sample_project_zip()
