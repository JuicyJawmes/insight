import google.generativeai as genai
import json
import re
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Gemini with your hidden API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def read_input_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

def generate_gemini_prompt(combined_text):
    prompt = f"""
    Given the user's combined profile information below:

    {combined_text}

    Provide structured career recommendations strictly as JSON (no explanations or extra text) in this format:

    {{
        "current_skills": [...],
        "recommended_target_roles": [...],
        "skill_roadmap": {{
            "beginner": [...],
            "intermediate": [...],
            "advanced": [...]
        }},
        "certifications": [
            {{"name": "...", "description": "...", "url": "..."}}
        ],
        "projects": [
            {{"title": "...", "description": "...", "skills_developed": [...], "difficulty": "..."}}
        ]
    }}

    Return only JSON.
    """
    return prompt

def get_career_recommendations(prompt):
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    response = model.generate_content(prompt)
    return response.text

def extract_json(text):
    try:
        # Extract JSON from text using regex
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        else:
            raise ValueError("No JSON found in response.")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON format: {e}")

def save_to_json(recommendations, output_filename):
    with open(output_filename, 'w', encoding='utf-8') as file:
        json.dump(recommendations, file, indent=4)
    print(f"✅ Recommendations saved to {output_filename}")

if __name__ == "__main__":
    combined_text = read_input_file("combined_input.txt")
    prompt = generate_gemini_prompt(combined_text)
    raw_response = get_career_recommendations(prompt)

    # Print raw response for debugging if needed
    print(raw_response)

    # Extract JSON safely
    recommendations = extract_json(raw_response)

    # Save structured recommendations
    save_to_json(recommendations, "career_recommendations.json")
