const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Manual CORS override middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // frontend origin
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors()); // still keep this
app.use(express.json());

const githubRoutes = require("./routes/github");
app.use("/api/github", githubRoutes);

const uploadResumeRoutes = require("./routes/uploadResume");
app.use("/api/uploadResume", uploadResumeRoutes);


const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
