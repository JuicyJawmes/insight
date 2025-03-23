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

// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const router = express.Router();

// router.get("/:username", (req, res) => {
//   const { username } = req.params;

//   if (!username) {
//     return res.status(400).json({ error: "Username is required" });
//   }

//   const filePath = path.join(__dirname, "../user_inputs", `${username}_input.txt`);

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "User data not found" });
//   }

//   try {
//     const data = fs.readFileSync(filePath, "utf8");

//     // Convert text file contents into JSON
//     const userData = {};
//     data.split("\n").forEach(line => {
//       const [key, value] = line.split(": ");
//       if (key && value) {
//         userData[key] = value.includes(", ") ? value.split(", ") : value;
//       }
//     });

//     console.log(`✅ Loaded user data for ${username}:`, userData);
//     res.json(userData);
//   } catch (error) {
//     console.error("❌ Error reading user data file:", error);
//     res.status(500).json({ error: "Server error reading user data" });
//   }
// });

// module.exports = router;
