import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime

DB_FILE = os.path.join(os.path.dirname(__file__), "projects_db.json")

def load_db() -> List[Dict[str, Any]]:
    if not os.path.exists(DB_FILE):
        return []
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_db(projects: List[Dict[str, Any]]) -> None:
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)

def insert_project(project: Dict[str, Any]) -> Dict[str, Any]:
    projects = load_db()
    projects.insert(0, project)
    save_db(projects)
    return project

def get_all_projects() -> List[Dict[str, Any]]:
    return load_db()

def get_project_by_id(project_id: str) -> Optional[Dict[str, Any]]:
    projects = load_db()
    for p in projects:
        if p.get("id") == project_id:
            return p
    return None

def update_project(project_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    projects = load_db()
    for idx, p in enumerate(projects):
        if p.get("id") == project_id:
            projects[idx] = {**p, **updates}
            save_db(projects)
            return projects[idx]
    return None
