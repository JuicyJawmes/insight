
const express = require("express");
const cors = require("cors");
const app = express();

// Routes
const userInputRoutes = require("./routes/userInput");
const githubRoutes = require("./routes/github");
const uploadResumeRoutes = require("./routes/uploadResume");
const pipelineRoutes = require('./routes/pipeline');
const recommendationsRoutes = require("./routes/recommendations"); // ✅ Add this import


// CORS middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// OPTIONS handler (put this AFTER your CORS)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

// Route handlers
app.use("/api/user-input", userInputRoutes);  // ✅ http://localhost:5002/api/user-input
app.use("/api/github", githubRoutes);         // ✅ http://localhost:5002/api/github
app.use("/api/uploadResume", uploadResumeRoutes);  // ✅ http://localhost:5002/api/uploadResume
app.use("/api", pipelineRoutes);              // ✅ any other pipeline routes
app.use("/api", recommendationsRoutes);  // ✅ Makes GET available at /api/getRecommendations


// Server startup
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
