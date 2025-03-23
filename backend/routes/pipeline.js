const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

const pythonPath = 'python'; // or 'python3'

const resumeScrapePath = path.join(__dirname, '../resumeScrape.py');
const combineInputsPath = path.join(__dirname, '../combined-inputs.py');
const geminiRecsPath = path.join(__dirname, '../gemini_recs.py');
const fs = require('fs');
//const path = require('path');

function runScript(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing ${command}:`, error);
        return reject(error);
      }
      if (stderr) {
        console.error(`⚠️ Stderr from ${command}:`, stderr);
      }
      console.log(`✅ Output from ${command}:`, stdout);
      resolve(stdout);
    });
  });
}

router.post('/runPipeline', async (req, res) => {
  try {
    console.log('🚀 Running full pipeline...');

    await runScript(`${pythonPath} ${resumeScrapePath}`);
    await runScript(`${pythonPath} ${combineInputsPath}`);
    await runScript(`${pythonPath} ${geminiRecsPath}`);

    // ✅ Step 2: Delete all resumes in the ResumesPDF folder
    const resumeFolder = path.join(__dirname, "../ResumesPDF");

    fs.readdir(resumeFolder, (err, files) => {
      if (err) {
        console.error("❌ Error reading resume folder:", err);
        return;
      }

      if (files.length === 0) {
        console.log("⚠️ No files found to delete.");
      }

      files.forEach((file) => {
        const filePath = path.join(resumeFolder, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`❌ Error deleting ${filePath}:`, err);
          } else {
            console.log(`✅ Deleted file: ${filePath}`);
          }
        });
      });
    });

    console.log('✅ Pipeline complete!');
    res.json({ message: '✅ Pipeline complete! Recommendations generated.' });

  } catch (error) {
    console.error('❌ Pipeline failed:', error);
    res.status(500).json({
      error: 'Pipeline failed',
      details: error.message || error
    });
  }
});


module.exports = router;
