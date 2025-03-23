import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { quantum } from 'ldrs';

quantum.register();

const jobOptions = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Mobile Developer", "iOS Developer", "Android Developer", "Web Developer",
  "Data Scientist", "Data Analyst", "Machine Learning Engineer", "AI Researcher",
  "DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer", "Systems Administrator",
  "Cybersecurity Analyst", "Security Engineer", "Penetration Tester", "Compliance Analyst",
  "Embedded Systems Engineer", "Firmware Engineer", "Hardware-Software Integration Engineer",
  "Game Developer", "Game Designer", "XR Developer", "AR/VR Engineer",
  "Product Manager", "Technical Program Manager", "Project Manager",
  "UI/UX Designer", "UX Researcher", "Interaction Designer", "Design Technologist",
  "Business Analyst", "Solutions Architect", "Enterprise Architect",
  "Blockchain Developer", "Smart Contract Engineer", "Solidity Developer",
  "Robotics Engineer", "Automation Engineer", "NLP Engineer", "Computer Vision Engineer",
  "QA Engineer", "Test Automation Engineer", "Release Engineer",
  "Academic Researcher", "Technical Writer", "Open Source Contributor"
].map(role => ({ value: role, label: role }));

const industryOptions = [
  "AI/ML", "Cybersecurity", "Fintech", "Healthcare", "EdTech", "Gaming",
  "Cloud Computing", "AR/VR", "Web3 / Blockchain", "Space Tech", "Robotics",
  "E-Commerce", "Telecom", "Agritech", "Biotech", "Smart Cities",
  "Automotive / Self-driving", "Green Tech / Sustainability", "Quantum Computing",
  "IoT / Edge Computing", "Legal Tech", "Insurance Tech", "Logistics / Supply Chain",
  "Media / Entertainment Tech", "Real Estate Tech", "Government / Public Sector",
  "SaaS / B2B", "Startups / VC-backed", "Open Source / Research",
  "Consulting", "Defense / Aerospace", "Manufacturing Tech", "Retail Tech",
  "Energy / Oil & Gas", "HR Tech / Recruiting", "Food Tech", "Fashion Tech",
  "Nonprofits / Social Impact", "Open to Any"
].map(industry => ({ value: industry, label: industry }));

const workOptions = [
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Onsite", label: "Onsite" },
  { value: "Internship", label: "Internship" },
  { value: "Full-Time", label: "Full-Time" },
  { value: "Open to Any", label: "Open to Any" }
];

const LandingPage = styled("div")({
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  background: "linear-gradient(45deg,rgb(2, 2, 43), #1a2a6c)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const Piece = styled("div")({
  position: "absolute",
  borderRadius: "50%",
  pointerEvents: "none",
  transition: "transform 0.2s ease-out, top 0.3s ease-out, left 0.3s ease-out",
  zIndex: 1,
  animation: "pulse 2s infinite alternate ease-in-out",
  "@keyframes pulse": {
    "0%": {
      opacity: 0.2,
      transform: "scale(1)",
    },
    "100%": {
      opacity: 0.8,
      transform: "scale(1.3)",
    },
  },
});

const StepTwo = ({ githubUsername, onNext }) => {
  const [pieces, setPieces] = useState([]);
  const piecesRef = useRef([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [workPrefs, setWorkPrefs] = useState([]);
  const [loading, setLoading] = useState(false);  // Track loading state

  useEffect(() => {
    const newPieces = [];
    const numPieces = 75;
    for (let i = 0; i < numPieces; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 5 + 2;
      const opacity = Math.random() * 0.3 + 0.2;
      const animationDelay = Math.random() * 2;
      newPieces.push({ id: i, x, y, originX: x, originY: y, size, opacity, animationDelay });
    }
    setPieces(newPieces);
    piecesRef.current = newPieces;
  }, []);

  const handleMouseMove = (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const threshold = 150;
    const updatedPieces = piecesRef.current.map((piece) => {
      const distanceX = cursorX - piece.x;
      const distanceY = cursorY - piece.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < threshold) {
        return {
          ...piece,
          x: piece.x - distanceX * 0.1,
          y: piece.y - distanceY * 0.1
        };
      }
      const backDistanceX = piece.originX - piece.x;
      const backDistanceY = piece.originY - piece.y;
      return {
        ...piece,
        x: piece.x + backDistanceX * 0.05,
        y: piece.y + backDistanceY * 0.05
      };
    });
    piecesRef.current = updatedPieces;
    setPieces([...updatedPieces]);
  };

  const handleSubmit = async () => {
    setLoading(true);  // Set loading to true before submitting

    // Simulate a 5-second loading time for testing
    setTimeout(() => {
      setLoading(false);  // Hide the loading icon after 5 seconds
    }, 5000);

    const payload = {
      username: githubUsername || "default_user",
      formData: {
        targetRoles: selectedJobs.map(j => j.value),
        workPreferences: workPrefs.map(p => p.value),
        industryInterests: selectedIndustries.map(i => i.value),
      },
    };

    try {
      const response = await fetch("http://localhost:5001/api/user-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("✅ Form submitted:", result);
      if (onNext) onNext();
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    } finally {
      // The loading icon will disappear after 5 seconds due to the setTimeout
    }
  };

  return (
    <LandingPage onMouseMove={handleMouseMove}>
      {pieces.map((piece) => (
        <Piece
          key={piece.id}
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: `rgba(255, 255, 255, ${piece.opacity})`,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 100px ${piece.size * 3}px rgba(255, 255, 255, ${piece.opacity * 1.5})`,
            animationDelay: `${piece.animationDelay}s`,
          }}
        />
      ))}

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative", // Ensure everything is positioned correctly
  }}
>
  {loading ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10, // Make sure the loading symbol appears above the form
        opacity: 0.8, // Adjust opacity as needed (between 0 and 1)
      }}
    >
      <l-quantum size="80" speed="5.1" color="white"></l-quantum>
    </div>
  ) : (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{
          padding: "3.5rem",
          background: "#2b2b2b",
          opacity: "80%",
          borderRadius: "50px",
          boxShadow: "0 0 15px rgba(240, 240, 240, 0.7)",
          maxWidth: "475px",
          width: "100%",
          color: "white",
          position: "relative",
          zIndex: 1, // Ensure the form is below the loading symbol
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "40px", marginBottom: "5px", marginTop: "0px" }}>
          Career Interests
        </h2>
        <p style={{ marginTop: "20px" }}>
          Let us know where you want to go — so we can tell you how to get
          there.
        </p>
        <hr />

        <div style={{ marginTop: "1.5rem" }}>
          <label
            style={{
              marginBottom: "0.75rem",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Target Job Roles:
          </label>
          <Select
            options={jobOptions}
            isMulti
            value={selectedJobs}
            onChange={setSelectedJobs}
            styles={customStyles}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <label
            style={{
              marginBottom: "0.75rem",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Fields of Interest:
          </label>
          <Select
            options={industryOptions}
            isMulti
            value={selectedIndustries}
            onChange={setSelectedIndustries}
            styles={customStyles}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <label
            style={{
              marginBottom: "0.75rem",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Work Preferences:
          </label>
          <Select
            options={workOptions}
            isMulti
            value={workPrefs}
            onChange={setWorkPrefs}
            styles={customStyles}
          />
        </div>
      </form>

      <Fab
        variant="extended"
        size="large"
        color="primary"
        onClick={handleSubmit}
        style={{
          marginTop: "45px",
          background: "linear-gradient(45deg, #252422, #3a3832)",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Generate Roadmap
      </Fab>
    </>
  )}
</div>

    </LandingPage>
  );
};

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: "white",
    borderRadius: "18px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e1e1e",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#555" : "#1e1e1e",
    color: state.isFocused ? "white" : "rgba(255, 255, 255, 0.95)",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#3a3a3a",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "left",
  }),
};

export default StepTwo;
