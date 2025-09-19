import cv2
import pytesseract
import re
import spacy
import scispacy
from transformers import pipeline

# ====== 1. Load SciSpacy model ======
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
try:
    nlp = spacy.load("en_core_sci_sm")
    ner_available = True
except:
    print("⚠️ SciSpacy model not installed. Run installation commands before using NER.")
    ner_available = False

# ====== 2. Load Summarizer ======
summarizer = pipeline("summarization", model="google/flan-t5-base")

# ====== 3. OCR Preprocessing ======
def preprocess_image(img_path):
    img = cv2.imread(img_path, 0)  # grayscale
    img = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY)[1]  # binarize
    img = cv2.medianBlur(img, 3)  # reduce noise
    return img

def extract_text_from_image(img_path):
    img = preprocess_image(img_path)
    text = pytesseract.image_to_string(img)
    return text

# ====== 4. Text Cleaning ======
def clean_text(text):
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)  # remove non-ascii
    text = re.sub(r'\b(?:Hospital|Report|Doctor|Name|Column|Biochemistry|TEST)\b', '', text, flags=re.I)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# ====== 5. Entity Extraction ======
def extract_entities(text):
    if not ner_available:
        return []
    doc = nlp(text)
    return [ent.text for ent in doc.ents]

# ====== 6. Summarization ======
def generate_summary(text):
    if len(text.split()) < 30:
        return "Text too short for summarization."
    summary = summarizer(text, max_length=120, min_length=50, do_sample=False)
    return summary[0]['summary_text']

# ====== 7. Full Pipeline ======
def process_report(img_path):
    print("🔹 Extracting text from report...\n")
    extracted_text = extract_text_from_image(img_path)
    
    print("🔹 Cleaning text...\n")
    cleaned_text = clean_text(extracted_text)
    
    print("🔹 Extracting medical entities...\n")
    entities = extract_entities(cleaned_text) if ner_available else ["NER not available"]
    
    print("🔹 Generating summary...\n")
    summary = generate_summary(" ".join(entities) if entities else cleaned_text)

    # ===== OUTPUT =====
    print("\n===== OCR Extracted Text =====")
    print(extracted_text[:500] + "..." if len(extracted_text) > 500 else extracted_text)
    
    print("\n===== Cleaned Text =====")
    print(cleaned_text[:500] + "..." if len(cleaned_text) > 500 else cleaned_text)
    
    print("\n===== Medical Entities (NER) =====")
    print(entities)
    
    print("\n===== Patient-Friendly Summary =====")
    print(summary)

# ====== Run Example ======
if __name__ == "__main__":
    img_path = "report.png"
 # replace with your image/pdf page path
    process_report(img_path)
