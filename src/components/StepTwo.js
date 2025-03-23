// // import React from "react";
// // import Select from "react-select";

// // // Predefined dropdown values
// // const jobOptions = [
// //   "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Engineer", "Data Scientist",
// //   "ML Engineer", "AI Researcher", "DevOps Engineer", "Data Engineer", "Cybersecurity Analyst",
// //   "Product Manager", "UI/UX Designer", "Embedded Systems Engineer", "Mobile App Developer", "AR/VR Developer",
// //   "QA/Test Engineer", "Game Developer", "Technical Program Manager", "Systems Architect", "Hardware Engineer"
// // ].map(role => ({ value: role, label: role }));

// // const industryOptions = [
// //   "Health Tech", "Fintech", "Gaming", "AI Research", "EdTech", "E-Commerce", "SaaS/Cloud",
// //   "Green Tech / Sustainability", "Robotics", "Automotive / EV", "Cybersecurity", "Telecom / Networking",
// //   "Consumer Electronics", "Aerospace", "AR/VR", "Open Source", "IoT / Smart Devices",
// //   "Digital Media / Streaming", "Social Platforms", "General Tech"
// // ].map(industry => ({ value: industry, label: industry }));

// // const workOptions = [
// //   { value: "Remote", label: "Remote" },
// //   { value: "Hybrid", label: "Hybrid" },
// //   { value: "On-site", label: "On-site" },
// //   { value: "Open to Any", label: "Open to Any" }
// // ];

// // const StepTwo = ({
// //   selectedJobs,
// //   selectedIndustries,
// //   workPrefs,
// //   setSelectedJobs,
// //   setSelectedIndustries,
// //   setWorkPrefs,
// //   onSubmit
// // }) => {
// //   return (
// //     <form onSubmit={onSubmit} style={{ padding: "2rem" }}>
// //       <h2>Career Interests</h2>
// //       <p>Let us know where you want to go — so we can tell you how to get there.</p>

// //       <div style={{ marginTop: "1.5rem" }}>
// //         <label>Target Job Roles:</label>
// //         <Select
// //           options={jobOptions}
// //           isMulti
// //           value={selectedJobs}
// //           onChange={setSelectedJobs}
// //         />
// //       </div>

// //       <div style={{ marginTop: "1.5rem" }}>
// //         <label>Industry Interests:</label>
// //         <Select
// //           options={industryOptions}
// //           isMulti
// //           value={selectedIndustries}
// //           onChange={setSelectedIndustries}
// //         />
// //       </div>

// //       <div style={{ marginTop: "1.5rem" }}>
// //         <label>Work Preferences:</label>
// //         <Select
// //           options={workOptions}
// //           isMulti
// //           value={workPrefs}
// //           onChange={setWorkPrefs}
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         style={{ marginTop: "2rem", padding: "0.5rem 1.5rem", fontSize: "16px", cursor: "pointer" }}
// //       >
// //         Submit
// //       </button>
// //     </form>
// //   );
// // };

// // export default StepTwo;
// import React, { useState } from "react";
// import "./StepTwo.css"; // Make sure this file exists or add styles to index.css

// const StepTwo = ({ githubUsername, onNext }) => {
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [selectedPreferences, setSelectedPreferences] = useState([]);
//   const [selectedIndustries, setSelectedIndustries] = useState([]);

//   const allRoles = [
//     "Software Engineer", "Frontend Developer", "Backend Developer",
//     "Data Scientist", "AI/ML Engineer", "Mobile Developer", "DevOps Engineer",
//     "Cybersecurity Analyst", "Embedded Systems Engineer", "Game Developer",
//     "Product Manager", "Cloud Engineer", "Research Scientist"
//   ];

//   const allPreferences = [
//     "Remote", "Hybrid", "Onsite", "Internship", "Full-Time", "Open to Any"
//   ];

//   const allIndustries = [
//     "AI/ML", "Fintech", "Healthcare", "EdTech", "Cybersecurity", "Gaming",
//     "SaaS", "AR/VR", "Telecom", "Space Tech", "E-Commerce", "Open to Any"
//   ];

//   const toggleSelection = (value, setter, state) => {
//     setter(
//       state.includes(value)
//         ? state.filter((v) => v !== value)
//         : [...state, value]
//     );
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       username: githubUsername || "default_user",
//       formData: {
//         targetRoles: selectedRoles,
//         workPreferences: selectedPreferences,
//         industryInterests: selectedIndustries,
//       },
//     };

//     try {
//       const response = await fetch("http://localhost:5002/api/user-input", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();
//       console.log("✅ Form submitted:", result);
//       // inside handleSubmit:
//       if (onNext) {
//         onNext(); // only call if defined
//       }
//     } catch (error) {
//       console.error("❌ Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2>Career Interests</h2>

//       <div className="form-section">
//         <label>Target Roles</label>
//         <div className="button-group">
//           {allRoles.map((role) => (
//             <button
//               key={role}
//               onClick={() => toggleSelection(role, setSelectedRoles, selectedRoles)}
//               className={selectedRoles.includes(role) ? "selected" : ""}
//             >
//               {role}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="form-section">
//         <label>Work Preferences</label>
//         <div className="button-group">
//           {allPreferences.map((pref) => (
//             <button
//               key={pref}
//               onClick={() => toggleSelection(pref, setSelectedPreferences, selectedPreferences)}
//               className={selectedPreferences.includes(pref) ? "selected" : ""}
//             >
//               {pref}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="form-section">
//         <label>Industry Interests</label>
//         <div className="button-group">
//           {allIndustries.map((industry) => (
//             <button
//               key={industry}
//               onClick={() => toggleSelection(industry, setSelectedIndustries, selectedIndustries)}
//               className={selectedIndustries.includes(industry) ? "selected" : ""}
//             >
//               {industry}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button className="submit-button" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default StepTwo;

import React, { useState } from "react";
import "./StepTwo.css"; // Make sure this file exists or add styles to index.css

const StepTwo = ({ githubUsername, onNext }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const allRoles = [
    "Software Engineer", "Frontend Developer", "Backend Developer",
    "Data Scientist", "AI/ML Engineer", "Mobile Developer", "DevOps Engineer",
    "Cybersecurity Analyst", "Embedded Systems Engineer", "Game Developer",
    "Product Manager", "Cloud Engineer", "Research Scientist"
  ];

  const allPreferences = [
    "Remote", "Hybrid", "Onsite", "Internship", "Full-Time", "Open to Any"
  ];

  const allIndustries = [
    "AI/ML", "Fintech", "Healthcare", "EdTech", "Cybersecurity", "Gaming",
    "SaaS", "AR/VR", "Telecom", "Space Tech", "E-Commerce", "Open to Any"
  ];

  const toggleSelection = (value, setter, state) => {
    setter(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatusMessage("Submitting your preferences...");

    const payload = {
      username: githubUsername || "default_user",
      formData: {
        targetRoles: selectedRoles,
        workPreferences: selectedPreferences,
        industryInterests: selectedIndustries,
      },
    };

    try {
      // 1️⃣ Submit user preferences
      const response = await fetch("http://localhost:5002/api/user-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("✅ Form submitted:", result);

      // 2️⃣ Run the pipeline after user-input is processed
      setStatusMessage("Running recommendation pipeline...");
      const pipelineResponse = await fetch("http://localhost:5002/api/runPipeline", {
        method: "POST"
      });

      const pipelineResult = await pipelineResponse.json();
      console.log("✅ Pipeline completed:", pipelineResult);

      setStatusMessage("Recommendations are ready!");

      // 3️⃣ Move to StepThree (Roadmap or Recommendations)
      if (onNext) {
        onNext();
      }

    } catch (error) {
      console.error("❌ Error submitting form or running pipeline:", error);
      setStatusMessage("Something went wrong. Please try again.");
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

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      {/* Status message feedback */}
      {statusMessage && (
        <p style={{ marginTop: "20px", color: "white" }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default StepTwo;
