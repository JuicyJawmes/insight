const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ResumesPDF/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), (req, res) => {
    try {
      console.log("Incoming file upload...");
  
      if (!req.file) {
        console.log("❌ No file received");
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      console.log("✅ File uploaded:", req.file.filename);
  
      return res.status(200).json({
        message: "Resume uploaded successfully",
        filename: req.file.filename,
      });
      
    } catch (error) {
      console.error("❌ Error in /api/resume:", error);
      res.status(500).json({ error: "Server error during resume upload" });
    }
  });  

module.exports = router;
