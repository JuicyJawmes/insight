const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/github/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    // Filter top 5 non-forked repos by most recent push date
    const topRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 5)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        topics: repo.topics || [],
        lastUpdated: repo.pushed_at,
        url: repo.html_url
      }));

    res.json({ repos: topRepos });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch GitHub repos" });
  }
});

module.exports = router;
