const express = require("express");
const router = express.Router();
const axios = require("axios");
<<<<<<< HEAD
const fs = require("fs");
const path = require("path");
=======
>>>>>>> origin/sri
const { setUserData } = require("../utils/userDataCache");

router.post("/", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(200).json({ repos: [] }); // No username provided
  }

  try {
    console.log(`✅ Fetching repos for username: ${username}`);

    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    const repoInfo = repos.map(repo => ({
      name: repo.name,
<<<<<<< HEAD
      description: repo.description || "No description",
      language: repo.language || "Not specified",
=======
      description: repo.description,
      language: repo.language,
>>>>>>> origin/sri
      topics: repo.topics || [],
      lastUpdated: repo.updated_at,
      url: repo.html_url
    }));

<<<<<<< HEAD
    // Cache the user data
    setUserData(username, { github: repoInfo });

    // ✅ SAVE TO FILE LOGIC STARTS HERE ✅

    // Define the directory path for GitHub outputs
    const outputDir = path.join(__dirname, '../github_outputs');

    // If directory doesn't exist, create it
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Define the file path
    const filePath = path.join(outputDir, `${username}_github_repos.txt`);

    // Prepare the text output
    const textOutput = repoInfo.map(repo => `
===============================
Name: ${repo.name}
Description: ${repo.description}
Language: ${repo.language}
Topics: ${repo.topics.join(", ")}
Last Updated: ${repo.lastUpdated}
URL: ${repo.url}
===============================
    `).join("\n");

    // Write the output to the file
    fs.writeFileSync(filePath, textOutput);
    console.log(`✅ GitHub repo data saved to ${filePath}`);

    // ✅ SAVE TO FILE LOGIC ENDS HERE ✅

    // Respond to the frontend with JSON data
    res.json({
      message: `✅ Repo data for '${username}' cached and saved`,
      repos: repoInfo
    });

  } catch (error) {
    console.error("❌ Error fetching GitHub data:", error.message);
=======
    setUserData(username, { github: repoInfo });

    res.json({ repos: repoInfo });

  } catch (error) {
    console.error("Error fetching GitHub data:", error.message);
>>>>>>> origin/sri
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

module.exports = router;
