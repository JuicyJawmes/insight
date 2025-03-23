import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

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

const StepComponent = ({ selectedJobs, selectedIndustries, workPrefs, setSelectedJobs, setSelectedIndustries, setWorkPrefs, onSubmit }) => {
  const [pieces, setPieces] = useState([]);
  const piecesRef = useRef([]);

  useEffect(() => {
    const newPieces = [];
    const numPieces = 75;
    for (let i = 0; i < numPieces; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 5 + 2;
      const opacity = Math.random() * 0.3 + 0.2;
      const animationDelay = Math.random() * 2; // Keep this constant

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

    // Update ref but minimize state updates to avoid re-rendering
  piecesRef.current = updatedPieces;
  setPieces([...updatedPieces]); // Only update state when necessary
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
            animationDelay: `${piece.animationDelay}s`, // Keeps animation delay constant
          }}
        />
      ))}
  
      {/* FORM SECTION */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <form
          onSubmit={onSubmit}
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
            zIndex: 10,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          <h2 id="stepTwoTitle" style={{ fontSize: "40px", marginBottom: "5px", marginTop: "0px" }}>
            Career Interests
          </h2>
          <p style={{ marginTop: "20px" }}>
            Let us know where you want to go — so we can tell you how to get there.
          </p>

          <hr></hr>
          
          {/* Dropdown Select Components */}
          <div style={{ marginTop: "1.5rem" }}>
          <label style={{ marginBottom: "0.75rem", display: "block", fontWeight: "bold" }}>Target Job Roles:</label>
          <Select options={jobOptions} isMulti value={selectedJobs} onChange={setSelectedJobs} 
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e", // Solid dark background
              borderColor: "rgba(255, 255, 255, 0.3)", // Subtle border
              color: "white",
              borderRadius: "18px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e", // Ensures dropdown is not transparent
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#555" : "#1e1e1e",
              color: state.isFocused ? "white" : "rgba(255, 255, 255, 0.95)",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white", // Ensures text is visible
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#3a3a3a", // Background for selected items
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "rgba(255, 255, 255, 0.7)", // Placeholder color for readability
              textAlign: "left",
            }),
          }}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ marginBottom: "0.75rem", display: "block", fontWeight: "bold" }}>Fields of Interest:</label>
          <Select options={industryOptions} isMulti value={selectedIndustries} onChange={setSelectedIndustries} 
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e", // Solid dark background
              borderColor: "rgba(255, 255, 255, 0.3)", // Subtle border
              color: "white",
              borderRadius: "18px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e", // Ensures dropdown is not transparent
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#555" : "#1e1e1e",
              color: state.isFocused ? "white" : "rgba(255, 255, 255, 0.95)",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white", // Ensures text is visible
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#3a3a3a", // Background for selected items
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "rgba(255, 255, 255, 0.7)", // Placeholder color for readability
              textAlign: "left",
            }),
          }}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ marginBottom: "0.75rem", display: "block", fontWeight: "bold" }}>Work Preferences:</label>
          <Select options={workOptions} isMulti value={workPrefs} onChange={setWorkPrefs} 
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e", // Solid dark background
              borderColor: "rgba(255, 255, 255, 0.3)", // Subtle border
              color: "white",
              borderRadius: "18px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1e1e1e", // Ensures dropdown is not transparent
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#555" : "#1e1e1e",
              color: state.isFocused ? "white" : "rgba(255, 255, 255, 0.95)",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white", // Ensures text is visible
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#3a3a3a", // Background for selected items
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "rgba(255, 255, 255, 0.7)", // Placeholder color for readability
              textAlign: "left",
            }),
          }}
          />
        </div>
        </form>
  
        {/* MOVE BUTTON OUTSIDE FORM */}
        <Fab
          variant="extended"
          size="large"
          color="primary"
          style={{
            marginTop: "45px", // Space between form and button
            background: "linear-gradient(45deg, #252422, #3a3836)", // Vibrant gradient
            color: "white",
            boxShadow: "0px 4px 10px rgba(58, 56, 54, 0.4)", // Soft glow
            textTransform: "uppercase",
            transform: "scale(1.3)", // Scale button 1.5x larger
            zIndex: 1,
            boxShadow: "0 0 15px rgba(240, 240, 240, 0.7)"
          }}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Generate Roadmap
        </Fab>
      </div>
    </LandingPage>
  );
  
};

export default StepComponent;
