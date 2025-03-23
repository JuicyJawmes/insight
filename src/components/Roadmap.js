import React, { useEffect, useState } from 'react';
import './Roadmap.css';
import { Typography, Card, CardContent, Divider } from '@mui/material';

const Roadmap = () => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/getRecommendations');
        const data = await res.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchData();
  }, []);

  if (!recommendations) {
    return <div>Loading roadmap...</div>;
  }

  const {
    current_skills,
    recommended_target_roles,
    skill_roadmap,
    certifications,
    projects,
    job_market_trends
  } = recommendations;

  return (
    <div className="roadmap-container">
      <Typography variant="h3" gutterBottom>🚀 Your Personalized Career Roadmap</Typography>

      <section className="roadmap-section">
        <Typography variant="h5">🛠️ Current Skills</Typography>
        <Divider />
        <p>{current_skills.join(", ")}</p>
      </section>

      <section className="roadmap-section">
        <Typography variant="h5">🎯 Recommended Target Roles</Typography>
        <Divider />
        <ul>
          {recommended_target_roles.map((role, idx) => (
            <li key={idx}>{role}</li>
          ))}
        </ul>
      </section>

      <section className="roadmap-section">
        <Typography variant="h5">📚 Skill Roadmap</Typography>
        <Divider />
        <div className="skill-columns">
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <Card className="skill-card" key={level}>
              <CardContent>
                <Typography variant="h6">{level.toUpperCase()}</Typography>
                <ul>
                  {skill_roadmap[level].map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="roadmap-section">
        <Typography variant="h5">🏅 Recommended Certifications</Typography>
        <Divider />
        {certifications.map((cert, idx) => (
          <Card className="cert-card" key={idx}>
            <CardContent>
              <Typography variant="h6">{cert.name}</Typography>
              <Typography>{cert.description}</Typography>
              <a href={cert.url} target="_blank" rel="noopener noreferrer">View Certification</a>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="roadmap-section">
        <Typography variant="h5">💻 Suggested Projects</Typography>
        <Divider />
        {projects.map((proj, idx) => (
          <Card className="project-card" key={idx}>
            <CardContent>
              <Typography variant="h6">{proj.title}</Typography>
              <Typography>{proj.description}</Typography>
              <Typography variant="caption">Difficulty: {proj.difficulty}</Typography>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="roadmap-section">
        <Typography variant="h5">📈 Job Market Trends</Typography>
        <Divider />
        <p>Demand Trends: {job_market_trends.demand_trends}</p>
        <p>Emerging Skills: {job_market_trends.emerging_skills.join(", ")}</p>
        <p>Industry Growth: {job_market_trends.industry_growth}</p>
        <p>
          Salary Expectations: ${job_market_trends.salary_expectations.min_salary_usd} - ${job_market_trends.salary_expectations.max_salary_usd}
        </p>
        <p>Future Outlook: {job_market_trends.future_outlook}</p>
      </section>
    </div>
  );
};

export default Roadmap;
