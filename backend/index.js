const express = require("express");
const cors = require("cors");
const app = express();
const userInputRoutes = require("./routes/userInput");

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.use("/api/user-input", userInputRoutes);
//app.use("/api/resume", resumeRoutes);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const githubRoutes = require("./routes/github");
app.use("/api/github", githubRoutes);

const uploadResumeRoutes = require("./routes/uploadResume");
app.use("/api/uploadResume", uploadResumeRoutes);

const pipelineRoutes = require('./routes/pipeline');
app.use('/api', pipelineRoutes);
