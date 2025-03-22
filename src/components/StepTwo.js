import React from "react";
import Select from "react-select";

// Predefined dropdown values
const jobOptions = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Engineer", "Data Scientist",
  "ML Engineer", "AI Researcher", "DevOps Engineer", "Data Engineer", "Cybersecurity Analyst",
  "Product Manager", "UI/UX Designer", "Embedded Systems Engineer", "Mobile App Developer", "AR/VR Developer",
  "QA/Test Engineer", "Game Developer", "Technical Program Manager", "Systems Architect", "Hardware Engineer"
].map(role => ({ value: role, label: role }));

const industryOptions = [
  "Health Tech", "Fintech", "Gaming", "AI Research", "EdTech", "E-Commerce", "SaaS/Cloud",
  "Green Tech / Sustainability", "Robotics", "Automotive / EV", "Cybersecurity", "Telecom / Networking",
  "Consumer Electronics", "Aerospace", "AR/VR", "Open Source", "IoT / Smart Devices",
  "Digital Media / Streaming", "Social Platforms", "General Tech"
].map(industry => ({ value: industry, label: industry }));

const workOptions = [
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
  { value: "Open to Any", label: "Open to Any" }
];

const StepTwo = ({
  selectedJobs,
  selectedIndustries,
  workPrefs,
  setSelectedJobs,
  setSelectedIndustries,
  setWorkPrefs,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} style={{ padding: "2rem" }}>
      <h2>Career Interests</h2>
      <p>Let us know where you want to go — so we can tell you how to get there.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <label>Target Job Roles:</label>
        <Select
          options={jobOptions}
          isMulti
          value={selectedJobs}
          onChange={setSelectedJobs}
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <label>Industry Interests:</label>
        <Select
          options={industryOptions}
          isMulti
          value={selectedIndustries}
          onChange={setSelectedIndustries}
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <label>Work Preferences:</label>
        <Select
          options={workOptions}
          isMulti
          value={workPrefs}
          onChange={setWorkPrefs}
        />
      </div>

      <button
        type="submit"
        style={{ marginTop: "2rem", padding: "0.5rem 1.5rem", fontSize: "16px", cursor: "pointer" }}
      >
        Submit
      </button>
    </form>
  );
};

export default StepTwo;
