import React, { useEffect, useState } from 'react';
import './Roadmap.css';
import { Typography, Card, CardContent, Divider, Link } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import ArrowImage from '../assets/down-arrow (1).png'; // Assuming the image is in this path

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
    <div className="roadmap-background" style={{ background: 'linear-gradient(to bottom, #0d0d2b, #000011)', minHeight: '100vh', padding: '30px', color: '#FDFEFE', textAlign: 'center', fontFamily: '"Nunito", sans-serif' }}>
      <Typography variant="h3" gutterBottom className="roadmap-title">
        Your Career Roadmap
      </Typography>
      <Divider sx={{ backgroundColor: 'white', height: '3px', margin: '10px auto 25px', width: '60%' }} />

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Target Roles:
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '15px' }}>{recommended_target_roles.join(", ")}</Typography>

      <div className="pill-container" style={{ marginBottom: '30px' }}>
        {current_skills.map((skill, i) => (
          <div key={i} className="pill" style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#444',
            color: '#FDFEFE',
            borderRadius: '30px',
            padding: '6px 15px',
            margin: '6px',
            fontSize: '14px'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#80cbc4',
              display: 'inline-block',
              marginRight: '8px'
            }}></span>
            {skill}
          </div>
        ))}
      </div>

      <StageBlock
        title="Beginner"
        skills={skill_roadmap?.beginner || []}
        certifications={beginnerCerts}
        projects={beginnerProjects}
      />

      <img src={ArrowImage} alt="arrow to next" style={{ width: '100px', margin: '40px auto', display: 'block' }} />

      <StageBlock
        title="Intermediate"
        skills={skill_roadmap?.intermediate || []}
        certifications={intermediateCerts}
        projects={intermediateProjects}
      />

      <img src={ArrowImage} alt="arrow to next" style={{ width: '100px', margin: '40px auto', display: 'block' }} />

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
  <div className="stage-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
    <div className="stage-outer" style={{ backgroundColor: '#121212', padding: '30px', borderRadius: '20px', width: '85%', border: '1px solid #333' }}>
      <Typography variant="h4" style={{ color: 'white', marginBottom: '10px' }}>{title}</Typography>
      <Divider sx={{ backgroundColor: 'white', height: '3px', marginBottom: '25px' }} />

      <div className="pill-container" style={{ marginBottom: '20px' }}>
        {skills.map((skill, i) => (
          <div key={i} className="pill" style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#444',
            color: '#FDFEFE',
            borderRadius: '30px',
            padding: '6px 15px',
            margin: '6px',
            fontSize: '14px'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#80cbc4',
              display: 'inline-block',
              marginRight: '8px'
            }}></span>
            {skill}
          </div>
        ))}
      </div>

      <div className="cert-section" style={{
        borderRadius: '25px',
        background: '#222',
        padding: '20px 30px',
        marginBottom: '30px',
        color: '#FDFEFE',
        textAlign: 'left',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {certifications.map((cert, idx) => (
          <Typography key={idx} style={{ marginBottom: '10px', fontSize: '15px' }}>
            <strong>Certification #{idx + 1}:</strong> <Link href={cert.url} target="_blank" rel="noopener" underline="hover" sx={{ color: '#FDFEFE', fontWeight: 'bold' }}>{cert.name}</Link>
          </Typography>
        ))}
      </div>

      <div className="project-section" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {projects.map((proj, idx) => (
          <div key={idx} style={{
            borderRadius: '25px',
            background: '#333',
            padding: '20px',
            width: '220px',
            height: '160px',
            boxShadow: '3px 3px 10px rgba(0,0,0,0.4)',
            color: '#FDFEFE',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}><WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', marginRight: '6px' }} />{proj.title}</Typography>
              <Typography variant="body2" sx={{ fontSize: '13px' }}>{proj.description}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Roadmap;