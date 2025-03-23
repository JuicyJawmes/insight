
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";

const LandingPage = styled("div")({
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  background: "linear-gradient(45deg, rgb(2, 2, 43), #1a2a6c)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
});

const Piece = styled("div")({
  position: "absolute",
  borderRadius: "50%",
  pointerEvents: "none",
  transition: "transform 0.2s ease-out, top 0.3s ease-out, left 0.3s ease-out",
});

const StepOne = ({ github, onGithubChange, resume, onResumeChange, onNext }) => {
  const [pieces, setPieces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newPieces = [];
    const numPieces = 50;

    for (let i = 0; i < numPieces; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 10 + 3;
      const opacity = Math.random() * 0.3 + 0.2;
      newPieces.push({ id: i, x, y, originX: x, originY: y, size, opacity });
    }

    setPieces(newPieces);
  }, []);

  const handleMouseMove = (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const threshold = 150;

    setPieces((prevPieces) =>
      prevPieces.map((piece) => {
        const distanceX = cursorX - piece.x;
        const distanceY = cursorY - piece.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < threshold) {
          return {
            ...piece,
            x: piece.x - distanceX * 0.1,
            y: piece.y - distanceY * 0.1,
          };
        }

        const backDistanceX = piece.originX - piece.x;
        const backDistanceY = piece.originY - piece.y;

        return {
          ...piece,
          x: piece.x + backDistanceX * 0.05,
          y: piece.y + backDistanceY * 0.05,
        };
      })
    );
  };

  const handleNext = async () => {
    setLoading(true);
    setError("");

    try {
      if (resume) {
        const formData = new FormData();
        formData.append("resume", resume);

        const resumeRes = await fetch("http://localhost:5002/api/uploadResume", {
          method: "POST",
          body: formData,
        });

        if (!resumeRes.ok) throw new Error("Failed to upload resume");
      }

      if (github.trim()) {
        const githubRes = await fetch("http://localhost:5002/api/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: github }),
        });

        if (!githubRes.ok) throw new Error("Failed to submit GitHub username");
      }

      onNext(); // ✅ Move to StepTwo when both succeed
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
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
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TextField
          id="github-username"
          label="Enter your GitHub username"
          variant="standard"
          value={github}
          onChange={(e) => onGithubChange(e.target.value)} // ✅ Updates github state in parent
          style={{ marginBottom: "20px", width: "300px", color: "white" }}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          sx={{
            "& .MuiInput-underline:before": { borderBottom: "2px solid white" },
            "& .MuiInput-underline:after": { borderBottom: "2px solid white" },
          }}
        />

        <Button
          variant="filled"
          component="label"
          style={{ marginBottom: "20px", backgroundColor: "#373D20", color: "white", padding: "10px 20px" }}
        >
          Upload Resume
          <input type="file" accept=".pdf" hidden onChange={onResumeChange} /> {/* ✅ Updates resume in parent */}
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={loading}
          style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px" }}
        >
          {loading ? "Uploading..." : "Next"}
        </Button>
      </div>
    </LandingPage>
  );
};

export default StepOne;
