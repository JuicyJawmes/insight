const express = require("express");
const cors = require("cors");
const app = express();
const resumeRoutes = require("./routes/resume");
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
app.use("/api/resume", resumeRoutes);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});


app.use(cors()); // still keep this

const githubRoutes = require("./routes/github");
app.use("/api/github", githubRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
