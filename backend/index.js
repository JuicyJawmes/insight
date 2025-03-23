const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

// Import routes
const resumeRoutes = require("./routes/resume");
const userInputRoutes = require("./routes/userInput");
const githubRoutes = require("./routes/github");

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow the frontend from localhost:3000
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware to parse JSON requests
app.use(express.json());

// Handling CORS preflight requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

// Define the API routes
app.use("/api/user-input", userInputRoutes);
app.use("/api/resume", resumeRoutes);  // Make sure this is correct for the upload route
app.use("/api/github", githubRoutes);

// Log every request to the console for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Server running on port 5001
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
