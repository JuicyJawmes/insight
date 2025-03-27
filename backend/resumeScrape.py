import fitz
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def extract_text_from_pdf(pdf_path):
    with fitz.open(pdf_path) as doc:
        text = ''
        for page in doc:
            text += page.get_text()
    return text

def save_text_to_file(text, output_filepath):
    with open(output_filepath, 'w', encoding='utf-8') as file:
        file.write(text)

def extract_from_folder(folder_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(folder_path):
        if filename.lower().endswith('.pdf'):
            pdf_path = os.path.join(folder_path, filename)
            extracted_text = extract_text_from_pdf(pdf_path)
            
            # output_filename = f"{os.path.splitext(filename)[0]}_output.txt"
            output_filename = "output_resume.txt"
            output_filepath = os.path.join(output_folder, output_filename)
            
            save_text_to_file(extracted_text, output_filepath)
            print(f"Saved extracted text to {output_filepath}")

if __name__ == "__main__":
    pdf_folder = "ResumesPDF"
    output_folder = "extracted_resumes"
    extract_from_folder(pdf_folder, output_folder)
