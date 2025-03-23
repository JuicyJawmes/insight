
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { quantum } from "ldrs";

quantum.register();

// === OPTIONS ===
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

// === Styled Components ===
const LandingPage = styled("div")({
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  background: "linear-gradient(45deg, rgb(2, 2, 43), #1a2a6c)",
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
    "0%": { opacity: 0.2, transform: "scale(1)" },
    "100%": { opacity: 0.8, transform: "scale(1.3)" },
  },
});

const StepTwo = ({ githubUsername }) => {
  const history = useHistory();
  const [pieces, setPieces] = useState([]);
  const piecesRef = useRef([]);

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [workPrefs, setWorkPrefs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // === Particle Effect ===
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

    const updatedPieces = piecesRef.current.map(piece => {
      const dx = cursorX - piece.x;
      const dy = cursorY - piece.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        return {
          ...piece,
          x: piece.x - dx * 0.1,
          y: piece.y - dy * 0.1
        };
      }

      const backX = piece.originX - piece.x;
      const backY = piece.originY - piece.y;

      return {
        ...piece,
        x: piece.x + backX * 0.05,
        y: piece.y + backY * 0.05
      };
    });

    piecesRef.current = updatedPieces;
    setPieces([...updatedPieces]);
  };

  // === Backend Submit and Routing ===
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const payload = {
      username: githubUsername || "default_user",
      formData: {
        targetRoles: selectedJobs.map(job => job.value),
        industryInterests: selectedIndustries.map(industry => industry.value),
        workPreferences: workPrefs.map(pref => pref.value),
      },
    };

    try {
      const userInputRes = await fetch("http://localhost:5002/api/user-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!userInputRes.ok) throw new Error("Failed to submit user input");

      console.log("✅ User input submitted!");

      const pipelineRes = await fetch("http://localhost:5002/api/runPipeline", {
        method: "POST",
      });

      if (!pipelineRes.ok) throw new Error("Failed to run pipeline");

      console.log("✅ Pipeline run successful!");

      history.push("/roadmap");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // === JSX ===
  return (
    <LandingPage onMouseMove={handleMouseMove}>
      {pieces.map(piece => (
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <l-quantum size="80" speed="5.1" color="white"></l-quantum>
          </div>
        )}

        <form
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
            zIndex: 1,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "40px", marginBottom: "5px" }}>Career Interests</h2>
          <p style={{ marginTop: "20px" }}>
            Let us know where you want to go — so we can tell you how to get there.
          </p>
          <hr />

          <div style={{ marginTop: "1.5rem" }}>
            <label style={{ marginBottom: "0.75rem", display: "block", fontWeight: "bold" }}>
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
            <label style={{ marginBottom: "0.75rem", display: "block", fontWeight: "bold" }}>
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
            <label style={{ marginBottom: "0.75rem", display: "block", fontWeight: "bold" }}>
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

        {error && (
          <p style={{ color: "red", marginTop: "1rem", fontSize: "18px" }}>
            {error}
          </p>
        )}

        <Fab
          variant="extended"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: "45px",
            background: "linear-gradient(45deg, #252422, #3a3832)",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          {loading ? "Processing..." : "Generate Roadmap"}
        </Fab>
      </div>
    </LandingPage>
  );
};

// === Custom Styles for react-select ===
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
  }),
};

export default StepTwo;