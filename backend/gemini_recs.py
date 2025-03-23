# import google.generativeai as genai
# import json
# import re
# import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Configure Gemini with your hidden API key
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# def read_input_file(filename):
#     with open(filename, 'r', encoding='utf-8') as file:
#         return file.read()

# def generate_gemini_prompt(combined_text):
#     prompt = f"""
#     Given the user's combined profile information below:

#     {combined_text}

#     Provide structured career recommendations strictly as JSON (no explanations or extra text) in this exact format:

#     {{
#         "current_skills": ["...", "..."],
#         "recommended_target_roles": ["...", "..."],
#         "skill_roadmap": {{
#             "beginner": ["...", "..."],
#             "intermediate": ["...", "..."],
#             "advanced": ["...", "..."]
#         }},
#         "certifications": [
#             {{"name": "...", "description": "...", "url": "..."}}
#         ],
#         "projects": [
#             {{
#                 "title": "...",
#                 "description": "...",
#                 "skills_developed": ["...", "..."],
#                 "difficulty": "beginner/intermediate/advanced"
#             }}
#         ],
#         "job_market_trends": {{
#             "demand_growth_percentage": ...,
#             "industry_growth_percentages": [
#                 {{"industry": "...", "growth_percentage": ...}},
#                 {{"industry": "...", "growth_percentage": ...}}
#             ],
#             "salary_expectations": {{"min_salary_usd": ..., "max_salary_usd": ...}},
#             "emerging_skills": ["...", "..."],
#             "future_outlook_summary": "..."
#         }},
#         "competitive_metrics": {{
#             "average_applicants_per_role": {{
#                 "current_year": ...,
#                 "previous_years": [{{"year": ..., "value": ...}}, {{"year": ..., "value": ...}}]
#             }},
#             "average_time_to_hire_days": {{
#                 "current_year": ...,
#                 "previous_years": [{{"year": ..., "value": ...}}, {{"year": ..., "value": ...}}]
#             }},
#             "skills_highest_in_demand": ["...", "..."],
#             "competitive_advantages": ["...", "..."],
#             "recommendations_to_stand_out": ["...", "..."]
#         }}
#     }}

#     Guidelines:
#     - Clearly provide numerical values for demand growth percentages, industry growth percentages, salary expectations (USD), and competitive metrics including previous years' data.
#     - Align all recommendations closely with the user's skills, target roles, industries, and preferences.
#     - Provide actionable and structured recommendations suitable for career growth.
#     - Return only valid JSON.
#     """
#     return prompt

# def get_career_recommendations(prompt):
#     model = genai.GenerativeModel("gemini-1.5-pro-latest")
#     response = model.generate_content(prompt)
#     return response.text

# def extract_json(text):
#     try:
#         json_match = re.search(r'\{.*\}', text, re.DOTALL)
#         if json_match:
#             return json.loads(json_match.group())
#         else:
#             raise ValueError("No JSON found in response.")
#     except json.JSONDecodeError as e:
#         raise ValueError(f"Invalid JSON format: {e}")

# def save_to_json(recommendations, output_filename):
#     with open(output_filename, 'w', encoding='utf-8') as file:
#         json.dump(recommendations, file, indent=4)
#     print(f"✅ Recommendations saved to {output_filename}")

# if __name__ == "__main__":
#     combined_text = read_input_file("combined_input.txt")
#     prompt = generate_gemini_prompt(combined_text)
#     raw_response = get_career_recommendations(prompt)

#     print(raw_response)  # For debugging and verification

#     recommendations = extract_json(raw_response)

#     save_to_json(recommendations, "career_recommendations.json")
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
    """Reads the combined input text from a file."""
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

def generate_gemini_prompt(combined_text):
    """Generates the prompt for Gemini with structured JSON instructions."""
    prompt = f"""
    Given the user's combined profile information below:

    {combined_text}

    Provide structured career recommendations strictly as JSON (no explanations or extra text) in this exact format:

    {{
        "current_skills": ["...", "..."],
        "recommended_target_roles": ["...", "..."],
        "skill_roadmap": {{
            "beginner": ["...", "..."],
            "intermediate": ["...", "..."],
            "advanced": ["...", "..."]
        }},
        "certifications": {{
            "beginner": [
                {{"name": "...", "description": "...", "url": "..."}},
                {{"name": "...", "description": "...", "url": "..."}}
            ],
            "intermediate": [
                {{"name": "...", "description": "...", "url": "..."}},
                {{"name": "...", "description": "...", "url": "..."}}
            ],
            "advanced": [
                {{"name": "...", "description": "...", "url": "..."}},
                {{"name": "...", "description": "...", "url": "..."}}
            ]
        }},
        "projects": {{
            "beginner": [
                {{
                    "title": "...",
                    "description": "...",
                    "skills_developed": ["...", "..."]
                }},
                {{
                    "title": "...",
                    "description": "...",
                    "skills_developed": ["...", "..."]
                }}
            ],
            "intermediate": [
                {{
                    "title": "...",
                    "description": "...",
                    "skills_developed": ["...", "..."]
                }},
                {{
                    "title": "...",
                    "description": "...",
                    "skills_developed": ["...", "..."]
                }}
            ],
            "advanced": [
                {{
                    "title": "...",
                    "description": "...",
                    "skills_developed": ["...", "..."]
                }},
                {{
                    "title": "...",
                    "description": "...",
                    "skills_developed": ["...", "..."]
                }}
            ]
        }},
        "job_market_trends": {{
            "demand_growth_percentage": ...,
            "industry_growth_percentages": [
                {{"industry": "...", "growth_percentage": ...}},
                {{"industry": "...", "growth_percentage": ...}}
            ],
            "salary_expectations": {{
                "min_salary_usd": ...,
                "max_salary_usd": ...
            }},
            "emerging_skills": ["...", "..."],
            "future_outlook_summary": "..."
        }},
        "competitive_metrics": {{
            "average_applicants_per_role": {{
                "current_year": ...,
                "previous_years": [
                    {{"year": ..., "value": ...}},
                    {{"year": ..., "value": ...}}
                ]
            }},
            "average_time_to_hire_days": {{
                "current_year": ...,
                "previous_years": [
                    {{"year": ..., "value": ...}},
                    {{"year": ..., "value": ...}}
                ]
            }},
            "skills_highest_in_demand": ["...", "..."],
            "competitive_advantages": ["...", "..."],
            "recommendations_to_stand_out": ["...", "..."]
        }}
    }}

    Guidelines:
    - Provide **2-3 certifications** and **2-3 projects** per difficulty level (beginner, intermediate, advanced).
    - Certifications should align with skills needed at each level.
    - Projects should be practical, achievable at each level, and help build portfolio strength.
    - Provide **specific** and **numerical values** for demand growth, salary expectations, industry trends, etc.
    - Align all recommendations closely with the user's skills, target roles, industries, and preferences.
    - Return only **valid JSON**, no explanations or text outside of JSON.
    """
    return prompt

def get_career_recommendations(prompt):
    """Calls Gemini API with the prompt and returns the response."""
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    
    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.7,  # adjust randomness as needed
            "max_output_tokens": 2048
        }
    )

    return response.text

def extract_json(text):
    """Extracts and parses JSON from Gemini response text."""
    try:
        # Match JSON from the response (if it includes any text before/after JSON)
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        else:
            raise ValueError("No JSON found in the response.")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON format: {e}")

def save_to_json(recommendations, output_filename):
    """Saves JSON recommendations to a file."""
    with open(output_filename, 'w', encoding='utf-8') as file:
        json.dump(recommendations, file, indent=4)
    print(f"✅ Recommendations saved to {output_filename}")

if __name__ == "__main__":
    combined_text = read_input_file("combined_input.txt")

    # Step 1: Generate the prompt
    prompt = generate_gemini_prompt(combined_text)

    # Step 2: Get raw response from Gemini
    raw_response = get_career_recommendations(prompt)

    print("=== RAW RESPONSE FROM GEMINI ===\n")
    print(raw_response)

    # Step 3: Extract and parse the JSON content
    recommendations = extract_json(raw_response)

    # Step 4: Save the structured recommendations to JSON
    save_to_json(recommendations, "career_recommendations.json")
