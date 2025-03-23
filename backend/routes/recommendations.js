const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Route to serve recommendations JSON
router.get("/getRecommendations", (req, res) => {
  const filePath = path.join(__dirname, "../career_recommendations.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading recommendations file:", err);
      return res.status(500).json({ error: "Failed to load recommendations" });
    }

    try {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    } catch (parseError) {
      console.error("❌ Error parsing recommendations JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format in recommendations file" });
    }
  });
});

module.exports = router;
