import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography, IconButton, Fade, InputAdornment } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationIcon from "@mui/icons-material/Navigation";
import GitHubIcon from '@mui/icons-material/GitHub';
import Fab from "@mui/material/Fab";
import logo from "../assets/insight_logo.png";

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
  fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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

const Logo = styled("img")({
  width: "360px",
  marginBottom: "20px",
  display: "block",
  position: "absolute",
  top: "10px",
  left: "48.5%",
  transform: "translateX(-50%)",
  zIndex: 10
});

const IntroText = styled("div")({
  color: "white",
  textAlign: "center",
  zIndex: 10,
  marginBottom: "40px",
});

const StepOne = ({ onNext }) => {
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const piecesRef = useRef([]);

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

    setTimeout(() => setShowForm(true), 1750);
  }, []);

  const handleMouseMove = (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const threshold = 150;

    const updatedPieces = piecesRef.current.map((piece) => {
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
    });

    piecesRef.current = updatedPieces;
    setPieces([...updatedPieces]);
  };

  const handleNext = async () => {
    console.log("Next button clicked");

    if (!resume) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

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

    if (github.trim()) {
      try {
        const response = await fetch("http://localhost:5001/api/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: github }),
        });
        const result = await response.json();
        console.log("GitHub data:", result);
      } catch (error) {
        console.error("GitHub fetch failed:", error);
      }
    }

    onNext();
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

      <Logo src={logo} alt="Insight Logo" />

      {!showForm ? (
        <IntroText>
          <Typography variant="h2" sx={{ fontWeight: 600, mt: 3, fontFamily: 'Poppins, sans-serif' }}>Welcome to Insight</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mt: 1, fontFamily: 'Poppins, sans-serif' }}>
            Chart your path.
          </Typography>
        </IntroText>
      ) : (
        <Fade in={true} timeout={{ enter: 2000, exit: 1000 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
            <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "white", fontFamily: 'Poppins, sans-serif' }}>Upload Resume & GitHub</h2>

            <TextField
              fullWidth
              placeholder="Enter your GitHub username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ transform: "translateY(0px)" }}>
                    <GitHubIcon sx={{ color: "white", fontSize: 24, marginRight: 1 }} />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  input: {
                    transform: "translateY(0px)",
                    opacity: 1,
                    color: "#fff",
                    fontSize: "1.2rem",
                  },
                },
              }}
              sx={{
                mb: 4,
                width: "320px",
                "& .MuiInput-underline:before": { borderBottom: "2.5px solid white" },
                "& .MuiInput-underline:after": { borderBottom: "2.5px solid white" },
              }}
            />

            {resume && (
              <Typography variant="body2" sx={{ color: "#ccc", mb: 1 }}>
                Selected: {resume.name}
                <IconButton size="small" onClick={() => setResume(null)} sx={{ ml: 1, color: "white" }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Typography>
            )}

            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{
                mb: 3,
                backgroundColor: resume ? "#222" : "#444",
                "&:hover": { backgroundColor: resume ? "#333" : "#666" },
                color: "white",
              }}
            >
              Upload Resume (PDF)
              <input type="file" hidden accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
            </Button>

            {showError && (
              <Typography variant="body2" sx={{ color: "red", mb: 2 }}>
                Field Required
              </Typography>
            )}

            <Fab
              variant="extended"
              size="large"
              color="primary"
              onClick={handleNext}
              sx={{
                mt: 3,
                background: "linear-gradient(45deg, #252422, #3a3836)",
                color: "white",
                transform: "scale(1.2)",
                boxShadow: "0 0 15px rgba(240, 240, 240, 0.7)",
              }}
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Continue
            </Fab>
          </div>
        </Fade>
      )}
    </LandingPage>
  );
};

export default StepOne;