import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def get_latest_github_file():
    """Find the latest GitHub repo file based on naming convention."""
    github_folder = "github_outputs"
    prefix = "_github_repos.txt"
    
    try:
        files = os.listdir(github_folder)
        github_files = [f for f in files if f.endswith(prefix)]
        
        if github_files:
            latest_file = max(github_files, key=lambda x: os.path.getctime(os.path.join(github_folder, x)))
            return os.path.join(github_folder, latest_file)
        else:
            print("⚠️ No GitHub files found. Skipping GitHub data.")
            return None
    except Exception as e:
        print(f"❌ Error accessing {github_folder}: {str(e)}")
        return None

def combine_files(file_list, output_filename):
    """Combine the contents of multiple files into one output file."""
    combined = ''
    
    for file in file_list:
        if not os.path.exists(file):  # Skip missing files
            print(f"⚠️ File not found: {file}. Skipping.")
            continue

        try:
            with open(file, 'r', encoding='utf-8') as f:
                combined += f"\n--- {file} ---\n"
                combined += f.read()
                combined += "\n\n"
        except Exception as e:
            print(f"❌ Error reading {file}: {str(e)}")

    with open(output_filename, 'w', encoding='utf-8') as f_out:
        f_out.write(combined)
        print(f"✅ Combined data saved to {output_filename}")

if __name__ == "__main__":
    files = [
        "extracted_resumes/output_resume.txt",  # Resume content
        "user_inputs/default_user_input.txt"    # User preferences/input
    ]

    github_file = get_latest_github_file()
    if github_file:
        files.append(github_file)

    combine_files(files, "combined_input.txt")
