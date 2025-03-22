const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Insight backend is live!");
});

const githubRoutes = require("./routes/github");
app.use("/api", githubRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
