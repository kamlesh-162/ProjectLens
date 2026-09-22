// ProjectLense API Client
// Connects React frontend directly to the FastAPI PyMuPDF backend with graceful fallback

const API_BASE_URL = 'http://127.0.0.1:8000';

export async function uploadProjectReport(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Upload failed');
    }
    return await res.json();
  } catch (error) {
    console.warn('[API] Backend unreachable or failed, using client-side service fallback:', error);
    throw error;
  }
}

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[API] Backend offline, reading local cache');
  }
  return null;
}

export async function fetchProjectById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[API] Backend offline for project ID:', id);
  }
  return null;
}

export async function submitFacultyReview(id, reviewData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}/faculty-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[API] Failed to submit faculty review:', e);
  }
  return null;
}

export async function approveProjectEvaluation(id, approvalData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(approvalData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[API] Failed to approve evaluation:', e);
  }
  return null;
}
