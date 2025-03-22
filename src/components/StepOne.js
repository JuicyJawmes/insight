import React from "react";
import insightLogo from "../assets/insight-logo.png"; // Use your actual logo path

const StepOne = ({ resume, github, onResumeChange, onGithubChange, onNext }) => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <img src={insightLogo} alt="Insight Logo" style={{ maxWidth: "250px", marginBottom: "2rem" }} />

      <h2>Welcome to Insight</h2>
      <p>Please upload your resume and optionally provide your GitHub username.</p>

      <div style={{ marginTop: "2rem" }}>
        <label>Upload Resume (PDF):</label><br />
        <input type="file" accept=".pdf" onChange={onResumeChange} required />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <label>GitHub Username (optional):</label><br />
        <input
          type="text"
          value={github}
          onChange={(e) => onGithubChange(e.target.value)}
          placeholder="e.g., arjunagravat"
        />
      </div>

      <button
        onClick={onNext}
        style={{ marginTop: "2rem", padding: "0.5rem 1.5rem", fontSize: "16px", cursor: "pointer" }}
      >
        Next
      </button>
    </div>
  );
};

export default StepOne;
