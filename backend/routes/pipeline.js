const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

const pythonPath = 'python'; // or 'python3'

const resumeScrapePath = path.join(__dirname, '../resumeScrape.py');
const combineInputsPath = path.join(__dirname, '../combined-inputs.py');
const geminiRecsPath = path.join(__dirname, '../gemini_recs.py');

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
