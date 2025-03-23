import React, { useEffect, useState } from "react";
import "./Roadmap.css"; // You can style it with clean modern CSS

const Roadmap = () => {
  const [roadmapData, setRoadmapData] = useState(null);

  useEffect(() => {
    // Fetch Gemini output stored in backend
    fetch("http://localhost:5001/api/recommendations")
      .then((res) => res.json())
      .then((data) => {
        setRoadmapData(data);
      })
      .catch((err) => console.error("Failed to load roadmap:", err));
  }, []);

  if (!roadmapData) return <div>Loading roadmap...</div>;

  return (
    <div className="roadmap-container">
      <h1>🎯 Your Personalized Career Roadmap</h1>

      <section>
        <h2>🛠 Current Skills</h2>
        <ul>{roadmapData.current_skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </section>

      <section>
        <h2>🏆 Target Roles</h2>
        <ul>{roadmapData.recommended_target_roles.map((role) => <li key={role}>{role}</li>)}</ul>
      </section>

      <section>
        <h2>🧩 Skill Roadmap</h2>
        {["beginner", "intermediate", "advanced"].map(level => (
          <div key={level}>
            <h3>{level.toUpperCase()}</h3>
            <ul>{roadmapData.skill_roadmap[level].map(skill => <li key={skill}>{skill}</li>)}</ul>
          </div>
        ))}
      </section>

      <section>
        <h2>📚 Recommended Certifications</h2>
        {roadmapData.certifications.map(cert => (
          <div key={cert.name}>
            <strong>{cert.name}</strong>: {cert.description}<br />
            <a href={cert.url} target="_blank" rel="noopener noreferrer">Link</a>
          </div>
        ))}
      </section>

      <section>
        <h2>💡 Recommended Projects</h2>
        {roadmapData.projects.map(proj => (
          <div key={proj.title}>
            <strong>{proj.title}</strong> ({proj.difficulty})<br />
            <em>{proj.description}</em><br />
            Skills: {proj.skills_developed.join(", ")}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Roadmap;