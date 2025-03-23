const express = require("express");
const cors = require("cors");
const multer = require("multer"); // For file upload functionality
const app = express();

// Routes
const resumeRoutes = require("./routes/resume"); // Added for resume handling
const userInputRoutes = require("./routes/userInput");
const githubRoutes = require("./routes/github");
const uploadResumeRoutes = require("./routes/uploadResume"); // From first file
const pipelineRoutes = require('./routes/pipeline'); // From first file
const recommendationsRoutes = require("./routes/recommendations"); // From first file

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend from localhost:3000
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware to parse JSON requests
app.use(express.json());

// Logging middleware for debugging requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Handling CORS preflight requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

// Define the API routes
app.use("/api/user-input", userInputRoutes); // http://localhost:5002/api/user-input
app.use("/api/resume", resumeRoutes); // For handling resume upload
app.use("/api/uploadResume", uploadResumeRoutes); // For uploading resumes via a separate endpoint
app.use("/api/github", githubRoutes); // For GitHub-related routes
app.use("/api", pipelineRoutes); // For pipeline-related routes
app.use("/api", recommendationsRoutes); // For recommendations endpoint

// Server startup
const PORT = 5002; // Port for running the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
