def combine_files(file_list, output_filename):
    combined = ''
    
    for file in file_list:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                combined += f"\n--- {file} ---\n"
                combined += f.read()
                combined += "\n\n"
        except FileNotFoundError:
            print(f"⚠️ File not found: {file}")
        except Exception as e:
            print(f"❌ Error reading {file}: {str(e)}")

    with open(output_filename, 'w', encoding='utf-8') as f_out:
        f_out.write(combined)
        print(f"✅ Combined data saved to {output_filename}")


if __name__ == "__main__":
    files = [
        "extracted_resumes/output_resume.txt",   # Resume content
        "user_inputs/default_user_input.txt",              # User preferences/input
        "github_outputs/JuicyJawmes_github_repos.txt" # GitHub data saved earlier
    ]

    combine_files(files, "combined_input.txt")
