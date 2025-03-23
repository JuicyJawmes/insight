import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Typography } from '@mui/material';

const LandingPage = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  background: 'linear-gradient(45deg,rgb(2, 2, 43), #1a2a6c)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
});

const Piece = styled('div')({
  position: 'absolute',
  borderRadius: '50%',
  pointerEvents: 'none',
  transition: 'transform 0.2s ease-out, top 0.3s ease-out, left 0.3s ease-out',
});

const StepOne = ({ onNext }) => {
  const [pieces, setPieces] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(""); // To hold error messages

  // Initialize particle pieces
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

  // Particle movement on mouse move
  const handleMouseMove = (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    setCursorPosition({ x: cursorX, y: cursorY });

    const threshold = 150;

    setPieces((prevPieces) =>
      prevPieces.map((piece) => {
        const distanceX = cursorX - piece.x;
        const distanceY = cursorY - piece.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

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

  // Subtle random particle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPieces((prevPieces) =>
        prevPieces.map((piece) => {
          const randomMoveX = Math.random() * 2 - 1;
          const randomMoveY = Math.random() * 2 - 1;
          return {
            ...piece,
            x: piece.x + randomMoveX,
            y: piece.y + randomMoveY,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle GitHub username input
  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  // Handle file upload input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  // Handle next button click (backend processes)
  const handleNext = async () => {
    console.log("Next button clicked");

    setError(""); // Reset any previous errors

    // Upload GitHub username (if provided)
    if (github.trim()) {
      try {
        const response = await fetch("http://localhost:5002/api/github", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: github }),
        });

        const data = await response.json();
        if (data.repos) {
          console.log("✅ GitHub Repos:", data.repos);
        } else {
          setError("GitHub username not found.");
        }
      } catch (error) {
        console.error("❌ Error fetching GitHub data:", error);
        setError("Error fetching GitHub data.");
      }
    }

    // Upload resume (if provided)
    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);

      try {
        const res = await fetch("http://localhost:5002/api/uploadResume", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.message) {
          console.log("✅ Resume Upload Success:", data.message);
        } else {
          setError("Error uploading resume.");
        }
      } catch (error) {
        console.error("❌ Error uploading resume:", error);
        setError("Error uploading resume.");
      }
    }

    // Move to the next step regardless
    onNext();
  };

  return (
    <LandingPage onMouseMove={handleMouseMove}>
      {/* Particles floating in background */}
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Add Image */}
        <img 
          src="your-image-url-here" 
          alt="Profile Illustration" 
          style={{ width: '120px', marginBottom: '20px', borderRadius: '10px' }}
        />

      {/* GitHub + Resume Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          id="github-username"
          label="Enter your GitHub username"
          variant="standard"
          value={github}
          onChange={handleGithubChange}
          style={{
            marginBottom: '20px',
            width: '300px',
            color: 'white',
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputProps={{
            style: { color: 'white' },
          }}
          sx={{
            '& .MuiInput-underline:before': {
              borderBottom: '2px solid white',
            },
            '& .MuiInput-underline:after': {
              borderBottom: '2px solid white',
            },
          }}
        />

        <Button
          variant="filled"
          component="label"
          style={{
            marginBottom: '20px',
            backgroundColor: '#373D20',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          Upload Resume
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {error && (
          <Typography variant="body2" color="error" style={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleNext}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          Next
        </Button>
      </div>
    </LandingPage>
  );
};

export default StepOne;