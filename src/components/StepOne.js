import React, { useState } from "react";

const StepOne = ({ onNext }) => {
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState(null);

  const handleNext = async () => {
    console.log("Next button clicked");
  
    // Upload resume first
    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);
  
      try {
        const response = await fetch("http://localhost:5001/api/resume", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
        console.log("Resume upload:", result);
      } catch (error) {
        console.error("Resume upload failed:", error);
      }
    }
  
    // Then fetch GitHub data (if any)
    if (github.trim()) {
      try {
        const response = await fetch("http://localhost:5001/api/github", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: github }),
        });
        
        const result = await response.json();
        console.log("Resume upload response:", result);
      } catch (error) {
        console.error("Resume upload failed:", error);
      }
    }
  
    onNext();
  };
  

  return (
    <div>
      <h2>Step One</h2>

      <label>GitHub Username (optional):</label>
      <input
        type="text"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        placeholder="e.g. arjunagravat"
      />

      <br /><br />

      <label>Resume (PDF):</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepOne;
