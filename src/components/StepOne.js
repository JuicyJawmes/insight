import React, { useState } from "react";

const StepOne = ({ onNext }) => {
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState(null);

  const handleNext = async () => {
    console.log("Next button clicked");
    // Only call GitHub route if username is provided
    if (github.trim()) {
      try {
        const response = await fetch("http://localhost:5001/api/github", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: github }),
        });

        const data = await response.json();
        console.log("GitHub Repos:", data.repos);
        // You can store this in global state or pass to parent

      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    }

    // Move to Step Two regardless
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
