
import React, { useEffect, useState } from 'react';
import './Roadmap.css';
import { Typography, Card, CardContent, Divider } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

  const beginnerCerts = certifications?.beginner || [];
  const intermediateCerts = certifications?.intermediate || [];
  const advancedCerts = certifications?.advanced || [];

  const beginnerProjects = projects?.beginner || [];
  const intermediateProjects = projects?.intermediate || [];
  const advancedProjects = projects?.advanced || [];

  return (
    <div className="roadmap-background">
      <Typography variant="h3" align="center" gutterBottom className="roadmap-title">
        🚀 Your Career Roadmap
      </Typography>

      <Typography variant="body1" align="center">
        <strong>Current Skills:</strong> {current_skills.join(", ")}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <strong>Target Roles:</strong> {recommended_target_roles.join(", ")}
      </Typography>

      <StageBlock
        title="Beginner"
        skills={skill_roadmap?.beginner || []}
        certifications={beginnerCerts}
        projects={beginnerProjects}
      />

      <ArrowDownwardIcon fontSize="large" style={{ margin: '20px auto', display: 'block' }} />

      <StageBlock
        title="Intermediate"
        skills={skill_roadmap?.intermediate || []}
        certifications={intermediateCerts}
        projects={intermediateProjects}
      />

      <ArrowDownwardIcon fontSize="large" style={{ margin: '20px auto', display: 'block' }} />

      <StageBlock
        title="Advanced"
        skills={skill_roadmap?.advanced || []}
        certifications={advancedCerts}
        projects={advancedProjects}
      />
    </div>
  );
};

const StageBlock = ({ title, skills, certifications, projects }) => (
  <div className="stage-outer">
    <Card className="stage-card">
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h4" className="stage-title">{title}</Typography>
        <Divider sx={{ my: 2 }} />

        <div className="pill-container">
          {skills.map((skill, i) => (
            <div key={i} className="pill" style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '30px',
              padding: '6px 15px',
              margin: '6px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                display: 'inline-block',
                marginRight: '8px'
              }}></span>
              {skill}
            </div>
          ))}
        </div>

        <div className="cert-section">
          {certifications.map((cert, idx) => (
            <Typography key={idx} className="cert-item">Certification #{idx + 1}: {cert.name}</Typography>
          ))}
        </div>

        <div className="project-section" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {projects.map((proj, idx) => (
            <div key={idx} style={{
              borderRadius: '25px',
              background: '#f7f17d',
              padding: '20px',
              width: '200px',
              height: '150px',
              boxShadow: '3px 3px 10px rgba(0,0,0,0.2)'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{proj.title}</Typography>
              <Typography variant="body2">{proj.description}</Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Roadmap;
