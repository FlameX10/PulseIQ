import pdfplumber
import os

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from PDF file.
    Returns cleaned text string.
    """
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    return clean_text(text)


def clean_text(text: str) -> str:
    """
    Basic cleaning of extracted text.
    """
    text = text.replace("\n", " ")
    text = " ".join(text.split())  # remove extra spaces
    return text
