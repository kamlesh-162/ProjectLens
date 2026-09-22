import fitz  # PyMuPDF
import re
from typing import Dict, Any, List

ACADEMIC_SECTIONS_PATTERNS = {
    "Abstract": r"(?i)\b(abstract|executive\s+summary)\b",
    "Problem Definition": r"(?i)\b(problem\s+definition|problem\s+statement|motivation|objectives?|introduction)\b",
    "Literature Review": r"(?i)\b(literature\s+review|related\s+work|prior\s+work|background\s+study|existing\s+systems?)\b",
    "Methodology": r"(?i)\b(methodology|proposed\s+system|system\s+architecture|design\s+methodology|workflow)\b",
    "Implementation": r"(?i)\b(implementation|system\s+development|algorithms?|modules?|code\s+structure|database\s+design|tech\s+stack)\b",
    "Results & Discussion": r"(?i)\b(results?|performance\s+analysis|experimental\s+results?|discussion|findings?|testing)\b",
    "Conclusion & References": r"(?i)\b(conclusion|future\s+scope|future\s+work|references|bibliography)\b",
}

def extract_pdf_data(file_path: str) -> Dict[str, Any]:
    """
    Extracts text, statistics, and academic sections from a PDF file using PyMuPDF.
    """
    doc = fitz.open(file_path)
    page_count = len(doc)
    full_text = []
    
    for page_num in range(page_count):
        page = doc[page_num]
        text = page.get_text("text")
        full_text.append(text)
        
    combined_text = "\n".join(full_text).strip()
    
    # Calculate statistics
    words = re.findall(r'\b\w+\b', combined_text)
    word_count = len(words)
    char_count = len(combined_text)
    est_reading_time_min = max(1, round(word_count / 200)) # ~200 wpm standard
    
    # Section Detection
    detected_sections = []
    for section_name, pattern in ACADEMIC_SECTIONS_PATTERNS.items():
        if re.search(pattern, combined_text):
            detected_sections.append(section_name)
            
    # If no major sections detected by regex, provide fallback indicators
    if not detected_sections:
        detected_sections = ["General Content", "Technical Documentation"]

    doc.close()
    
    return {
        "text": combined_text,
        "page_count": page_count,
        "word_count": word_count,
        "char_count": char_count,
        "reading_time_min": est_reading_time_min,
        "detected_sections": detected_sections,
        "preview_snippet": combined_text[:1200] if len(combined_text) > 1200 else combined_text
    }
