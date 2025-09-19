import cv2
import pytesseract
from transformers import pipeline

# Load summarizer model
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Extract text from multiple images
def extract_text_from_images(image_paths):
    all_text = ""
    for path in image_paths:
        img = cv2.imread(path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(gray)
        all_text += text + "\n"
    return all_text

# Summarize text safely
def summarize_text(text):
    if len(text.split()) < 30:
        return "Text too short for summarization."
    summary = summarizer(text, max_length=120, min_length=30, do_sample=False)
    return summary[0]['summary_text']

if __name__ == "__main__":
    # Add multiple image paths here
    image_paths = [
        r"C:\Users\pragn.LAPTOP-DAHFBVDA\OneDrive\Pictures\Screenshots\Screenshot 2025-09-18 183101.png",
        r"C:\Users\pragn.LAPTOP-DAHFBVDA\OneDrive\Pictures\Screenshots\Screenshot 2025-09-18 184637.png"
    ]
    
    raw_text = extract_text_from_images(image_paths)
    print("\n🔹 OCR Extracted Text:\n", raw_text)

    summary = summarize_text(raw_text)
    print("\n🔹 Generated Summary:\n", summary)
