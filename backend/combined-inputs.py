# combine_inputs.py
def combine_files(file_list, output_filename):
    combined = ''
    for file in file_list:
        with open(file, 'r', encoding='utf-8') as f:
            combined += f"\n--- {file} ---\n"
            combined += f.read()
            combined += "\n\n"
    with open(output_filename, 'w', encoding='utf-8') as f_out:
        f_out.write(combined)

if __name__ == "__main__":
    files = [
        "extracted_resumes/output_resume.txt",
        # "scraped_github/github_output.txt",
        "user_input/user_input.txt"
    ]
    combine_files(files, "combined_input.txt")
