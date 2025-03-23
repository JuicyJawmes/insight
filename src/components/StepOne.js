
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Fade,
  InputAdornment,
  Fab
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationIcon from "@mui/icons-material/Navigation";
import GitHubIcon from '@mui/icons-material/GitHub';
import logo from "../components/assets/insight_logo.png"; // ✅ Adjust path if needed!

// === Styled Components ===
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
  zIndex: 10,
});

const IntroText = styled("div")({
  color: "white",
  textAlign: "center",
  zIndex: 10,
  marginBottom: "40px",
  marginTop: "200px", // ✅ Pushes down the intro text
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 10,
  marginTop: "150px", // ✅ Pushes down the form below the logo
});

// === StepOne Component ===
const StepOne = ({ github, onGithubChange, resume, onResumeChange, onNext }) => {
  const [pieces, setPieces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const piecesRef = useRef([]);
  const fileInputRef = useRef();

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

  const handleResumeDelete = () => {
    onResumeChange({ target: { files: [null] } });
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleNext = async () => {
    setLoading(true);
    setError("");
    setShowError(false);

    try {
      if (!resume) {
        setShowError(true);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);

      const resumeRes = await fetch("http://localhost:5002/api/uploadResume", {
        method: "POST",
        body: formData,
      });

      if (!resumeRes.ok) throw new Error("Failed to upload resume");

      const resumeResult = await resumeRes.json();

      if (github.trim()) {
        const githubRes = await fetch("http://localhost:5002/api/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: github }),
        });

        if (!githubRes.ok) throw new Error("Failed to submit GitHub username");

        const githubResult = await githubRes.json();
        console.log("✅ GitHub submission success:", githubResult);
      }

      onNext();
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
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 100px ${piece.size * 3}px rgba(255, 255, 255, ${piece.opacity * 1.5})`,
            animationDelay: `${piece.animationDelay}s`,
          }}
        />
      ))}

      <Logo src={logo} alt="Insight Logo" />

      {!showForm ? (
        <IntroText>
          <Typography variant="h2" sx={{ fontWeight: 600, mt: 3 }}>
            Welcome to Insight
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
            Chart your path.
          </Typography>
        </IntroText>
      ) : (
        <Fade in={true} timeout={{ enter: 2000, exit: 1000 }}>
          <FormContainer>
            <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "white" }}>
              Upload Resume & GitHub
            </h2>

            <TextField
              fullWidth
              placeholder="Enter your GitHub username"
              value={github}
              onChange={(e) => onGithubChange(e.target.value)}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon sx={{ color: "white", fontSize: 24, marginRight: 1 }} />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  input: {
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
                <IconButton
                  size="small"
                  onClick={handleResumeDelete}
                  sx={{ ml: 1, color: "white" }}
                >
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
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".pdf"
                onChange={onResumeChange}
              />
            </Button>

            {showError && (
              <Typography variant="body2" sx={{ color: "red", mb: 2 }}>
                Please upload your resume.
              </Typography>
            )}
            {error && (
              <Typography variant="body2" sx={{ color: "red", mb: 2 }}>
                {error}
              </Typography>
            )}

            <Fab
              variant="extended"
              size="large"
              color="primary"
              onClick={handleNext}
              disabled={loading}
              sx={{
                mt: 3,
                background: "linear-gradient(45deg, #252422, #3a3836)",
                color: "white",
                transform: "scale(1.2)",
                boxShadow: "0 0 15px rgba(240, 240, 240, 0.7)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              <NavigationIcon sx={{ mr: 1 }} />
              {loading ? "Uploading..." : "Continue"}
            </Fab>
          </FormContainer>
        </Fade>
      )}
    </LandingPage>
  );
};

export default StepOne;
