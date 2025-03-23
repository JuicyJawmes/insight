const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { username, formData } = req.body;

    if (!username || !formData) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "Missing username or form data" });
    }

    const folder = path.join(__dirname, "../user_inputs");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const filePath = path.join(folder, `${username}_input.txt`);
    const formatted = Object.entries(formData)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("\n");

    fs.writeFileSync(filePath, formatted, "utf-8");

    console.log("✅ Saved form data to:", filePath);

    res.status(200).json({ message: "Form data saved successfully", file: filePath });
  } catch (error) {
    console.error("❌ Error saving form data:", error);
    res.status(500).json({ error: "Server error saving form data" });
  }
});


module.exports = router;
