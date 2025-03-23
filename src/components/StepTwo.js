
import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // ✅ v5
import "./StepTwo.css";

const StepTwo = ({ githubUsername }) => {
  const history = useHistory();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allRoles = [
    "Software Engineer", "Frontend Developer", "Backend Developer",
    "Data Scientist", "AI/ML Engineer", "Mobile Developer", "DevOps Engineer",
    "Cybersecurity Analyst", "Embedded Systems Engineer", "Game Developer",
    "Product Manager", "Cloud Engineer", "Research Scientist",
  ];

  const allPreferences = [
    "Remote", "Hybrid", "Onsite", "Internship", "Full-Time", "Open to Any",
  ];

  const allIndustries = [
    "AI/ML", "Fintech", "Healthcare", "EdTech", "Cybersecurity", "Gaming",
    "SaaS", "AR/VR", "Telecom", "Space Tech", "E-Commerce", "Open to Any",
  ];

  const toggleSelection = (value, setter, state) => {
    setter(state.includes(value) ? state.filter((v) => v !== value) : [...state, value]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const payload = {
      username: githubUsername || "default_user",
      formData: {
        targetRoles: selectedRoles,
        workPreferences: selectedPreferences,
        industryInterests: selectedIndustries,
      },
    };

    try {
      const response = await fetch("http://localhost:5002/api/user-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit user input");

      const result = await response.json();
      console.log("✅ User Input Submitted:", result);

      const pipelineResponse = await fetch("http://localhost:5002/api/runPipeline", {
        method: "POST",
      });

      if (!pipelineResponse.ok) throw new Error("Failed to run pipeline");

      const pipelineData = await pipelineResponse.json();
      console.log("✅ Pipeline completed:", pipelineData.message);

      history.push("/roadmap");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <h2>Career Interests</h2>

      <div className="form-section">
        <label>Target Roles</label>
        <div className="button-group">
          {allRoles.map((role) => (
            <button
              key={role}
              onClick={() => toggleSelection(role, setSelectedRoles, selectedRoles)}
              className={selectedRoles.includes(role) ? "selected" : ""}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <label>Work Preferences</label>
        <div className="button-group">
          {allPreferences.map((pref) => (
            <button
              key={pref}
              onClick={() => toggleSelection(pref, setSelectedPreferences, selectedPreferences)}
              className={selectedPreferences.includes(pref) ? "selected" : ""}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <label>Industry Interests</label>
        <div className="button-group">
          {allIndustries.map((industry) => (
            <button
              key={industry}
              onClick={() => toggleSelection(industry, setSelectedIndustries, selectedIndustries)}
              className={selectedIndustries.includes(industry) ? "selected" : ""}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit"}
      </button>
    </div>
  );
};

export default StepTwo;
