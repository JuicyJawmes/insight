const express = require("express");
const router = express.Router();
const axios = require("axios");
const { setUserData } = require("../utils/userDataCache");

router.post("/", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(200).json({ repos: [] }); // No username provided
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    const repoInfo = repos.map(repo => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      topics: repo.topics || [],
      lastUpdated: repo.updated_at,
      url: repo.html_url
    }));

    setUserData(username, { github: repoInfo });

    res.json({ repos: repoInfo });

  } catch (error) {
    console.error("Error fetching GitHub data:", error.message);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

module.exports = router;