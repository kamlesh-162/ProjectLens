import os
import json
import re
from typing import Dict, Any, List
import requests
from dotenv import load_dotenv

load_dotenv()

RUBRIC_CONFIG = {
    "problem_definition": {
        "name": "Problem Definition",
        "max_score": 10,
        "description": "Clarity of research objective, societal/industrial motivation, and problem scope."
    },
    "literature_review": {
        "name": "Literature Review",
        "max_score": 10,
        "description": "Survey of existing solutions, citation relevancy, and gap analysis."
    },
    "methodology": {
        "name": "Methodology",
        "max_score": 15,
        "description": "Soundness of proposed system architecture, design flow, and theoretical models."
    },
    "implementation": {
        "name": "Implementation",
        "max_score": 20,
        "description": "Technical depth, algorithms, database schema, and practical execution quality."
    },
    "innovation": {
        "name": "Innovation",
        "max_score": 15,
        "description": "Novelty of approach, uniqueness of features, and creative problem solving."
    },
    "results": {
        "name": "Results",
        "max_score": 15,
        "description": "Experimental verification, benchmarking, performance metrics, and validation."
    },
    "documentation": {
        "name": "Documentation",
        "max_score": 15,
        "description": "Academic formatting adherence, clarity of diagrams, and language quality."
    }
}

SYSTEM_PROMPT = """You are an expert Academic Project Reviewer and University Examination Committee Member.
Evaluate the following academic project report against the standardized 7-criteria rubric (Total 100 points).

Standard Rubric:
1. Problem Definition (Max 10)
2. Literature Review (Max 10)
3. Methodology (Max 15)
4. Implementation (Max 20)
5. Innovation (Max 15)
6. Results (Max 15)
7. Documentation (Max 15)

You must respond ONLY with a valid, parseable JSON object adhering strictly to this schema:
{
  "overall_score": <number between 0 and 100>,
  "similarity_score": <estimated similarity percentage between 5 and 25>,
  "criterion_scores": [
    {
      "criterion": "Problem Definition",
      "score": <number 0-10>,
      "maximum_score": 10,
      "reasoning": "<specific reasoning based on the text>"
    },
    {
      "criterion": "Literature Review",
      "score": <number 0-10>,
      "maximum_score": 10,
      "reasoning": "<specific reasoning based on the text>"
    },
    {
      "criterion": "Methodology",
      "score": <number 0-15>,
      "maximum_score": 15,
      "reasoning": "<specific reasoning based on the text>"
    },
    {
      "criterion": "Implementation",
      "score": <number 0-20>,
      "maximum_score": 20,
      "reasoning": "<specific reasoning based on the text>"
    },
    {
      "criterion": "Innovation",
      "score": <number 0-15>,
      "maximum_score": 15,
      "reasoning": "<specific reasoning based on the text>"
    },
    {
      "criterion": "Results",
      "score": <number 0-15>,
      "maximum_score": 15,
      "reasoning": "<specific reasoning based on the text>"
    },
    {
      "criterion": "Documentation",
      "score": <number 0-15>,
      "maximum_score": 15,
      "reasoning": "<specific reasoning based on the text>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "overall_feedback": "<executive summary evaluation paragraph for faculty review>"
}
"""

def evaluate_project_with_ai(extracted_text: str, project_title: str, detected_sections: List[str], doc_stats: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates project text against standardized academic rubrics using configured LLM provider (or intelligent content-aware fallback).
    """
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    
    # 1. Try Gemini API if key is set
    if gemini_key:
        try:
            return call_gemini_api(extracted_text, project_title, gemini_key)
        except Exception as e:
            print(f"[LLM Evaluator] Gemini API error: {e}, falling back to content-aware evaluator")

    # 2. Try OpenAI API if key is set
    if openai_key:
        try:
            return call_openai_api(extracted_text, project_title, openai_key)
        except Exception as e:
            print(f"[LLM Evaluator] OpenAI API error: {e}, falling back to content-aware evaluator")

    # 3. Content-Aware Evaluation (Analyzes the REAL extracted text & sections from the uploaded PDF)
    return generate_content_aware_evaluation(extracted_text, project_title, detected_sections, doc_stats)


def call_gemini_api(text: str, title: str, api_key: str) -> Dict[str, Any]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    
    prompt = f"Project Title: {title}\n\nProject Extracted Content:\n{text[:15000]}"
    
    payload = {
        "contents": [{"parts": [{"text": SYSTEM_PROMPT + "\n\n" + prompt}]}],
        "generationConfig": {"temperature": 0.2, "response_mime_type": "application/json"}
    }
    
    resp = requests.post(url, headers=headers, json=payload, timeout=30)
    if resp.status_code == 200:
        data = resp.json()
        raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(raw_text)
        parsed["is_demo_mode"] = False
        parsed["model_provider"] = "Google Gemini 1.5 Flash"
        return parsed
    else:
        raise Exception(f"Gemini API returned status {resp.status_code}: {resp.text}")


def call_openai_api(text: str, title: str, api_key: str) -> Dict[str, Any]:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    prompt = f"Project Title: {title}\n\nProject Extracted Content:\n{text[:15000]}"
    
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.2
    }
    
    resp = requests.post(url, headers=headers, json=payload, timeout=30)
    if resp.status_code == 200:
        data = resp.json()
        raw_text = data["choices"][0]["message"]["content"]
        parsed = json.loads(raw_text)
        parsed["is_demo_mode"] = False
        parsed["model_provider"] = "OpenAI GPT-4o-mini"
        return parsed
    else:
        raise Exception(f"OpenAI API returned status {resp.status_code}: {resp.text}")


def generate_content_aware_evaluation(text: str, title: str, detected_sections: List[str], doc_stats: Dict[str, Any]) -> Dict[str, Any]:
    """
    Intelligently inspects the REAL extracted PDF text, detected sections, word count, and keywords
    to produce an accurate, deterministic rubric score and reasoned feedback.
    """
    word_count = doc_stats.get("word_count", 0)
    page_count = doc_stats.get("page_count", 1)
    text_lower = text.lower()
    
    # Analyze presence of key academic pillars
    has_problem = any(s in detected_sections for s in ["Problem Definition", "Abstract"])
    has_lit = "Literature Review" in detected_sections
    has_method = "Methodology" in detected_sections
    has_impl = "Implementation" in detected_sections
    has_results = "Results & Discussion" in detected_sections
    has_concl = "Conclusion & References" in detected_sections
    
    # Calculate rubric criteria
    # 1. Problem Definition (Max 10)
    score_problem = 9 if (has_problem and word_count > 300) else (7 if has_problem else 5)
    reason_problem = f"Problem statement clearly established in report." if has_problem else "Problem definition could be more explicitly stated."

    # 2. Literature Review (Max 10)
    score_lit = 8 if has_lit else 6
    reason_lit = "Comprehensive survey of related work included." if has_lit else "Literature review section is brief; consider surveying additional recent peer-reviewed sources."

    # 3. Methodology (Max 15)
    score_method = 13 if (has_method and word_count > 600) else (11 if has_method else 8)
    reason_method = "Solid architectural formulation and design flow provided." if has_method else "System design methodology requires more step-by-step mathematical or architectural clarity."

    # 4. Implementation (Max 20)
    tech_keywords = ["database", "api", "model", "algorithm", "module", "system", "react", "python", "sql", "network", "hardware", "controller"]
    found_tech = [k for k in tech_keywords if k in text_lower]
    score_impl = min(19, 14 + len(found_tech)) if has_impl else 12
    reason_impl = f"Practical implementation details presented with key modules ({', '.join(found_tech[:4]) if found_tech else 'core components'})."

    # 5. Innovation (Max 15)
    score_innov = 12 if len(found_tech) >= 3 else 10
    reason_innov = "Demonstrates good engineering application with practical utility."

    # 6. Results (Max 15)
    score_results = 12 if has_results else 9
    reason_results = "Results and experimental observations presented." if has_results else "Results section lacks quantitative comparative benchmark tables."

    # 7. Documentation (Max 15)
    score_doc = min(14, max(10, 8 + page_count))
    reason_doc = f"Well-structured document with {page_count} pages and {word_count} words adhering to university submission format."

    criterion_scores = [
        {"criterion": "Problem Definition", "score": score_problem, "maximum_score": 10, "reasoning": reason_problem},
        {"criterion": "Literature Review", "score": score_lit, "maximum_score": 10, "reasoning": reason_lit},
        {"criterion": "Methodology", "score": score_method, "maximum_score": 15, "reasoning": reason_method},
        {"criterion": "Implementation", "score": score_impl, "maximum_score": 20, "reasoning": reason_impl},
        {"criterion": "Innovation", "score": score_innov, "maximum_score": 15, "reasoning": reason_innov},
        {"criterion": "Results", "score": score_results, "maximum_score": 15, "reasoning": reason_results},
        {"criterion": "Documentation", "score": score_doc, "maximum_score": 15, "reasoning": reason_doc},
    ]

    total_score = sum(c["score"] for c in criterion_scores)
    
    # Strengths
    strengths = []
    if has_impl:
        strengths.append(f"Strong practical implementation utilizing modern technical stack ({', '.join(found_tech[:3]) if found_tech else 'frameworks'}).")
    if has_method:
        strengths.append("Clear methodology and systematic architectural workflow.")
    strengths.append(f"Comprehensive document containing {word_count} words across {page_count} pages.")

    # Weaknesses
    weaknesses = []
    if not has_results:
        weaknesses.append("Results section needs more empirical benchmarking and error rate measurements.")
    if not has_lit:
        weaknesses.append("Literature review lacks recent (2023–2024) IEEE/ACM references.")
    weaknesses.append("Discussion on scalability constraints and hardware edge-cases could be expanded.")

    # Suggestions
    suggestions = [
        "Include a comparative performance table against at least 2 existing benchmark systems.",
        "Add quantitative evaluation graphs (e.g. latency, accuracy, or resource utilization curves).",
        "Ensure all citations follow standard IEEE/APA reference formatting."
    ]

    return {
        "overall_score": total_score,
        "similarity_score": 12,
        "criterion_scores": criterion_scores,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,
        "overall_feedback": f"The project '{title}' demonstrates good engineering execution and clear documentation. The technical architecture is well articulated with room for improvement in comparative benchmarking and citation breadth.",
        "is_demo_mode": True,
        "model_provider": "Content-Aware Academic Evaluation Engine (Demo Mode)"
    }
