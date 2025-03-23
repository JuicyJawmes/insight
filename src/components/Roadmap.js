// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   CardContent,
//   Divider,
//   Box,
//   Container,
// } from "@mui/material";
// import "./Roadmap.css";

// const Roadmap = () => {
//   const [recommendations, setRecommendations] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:5002/api/getRecommendations");
//         const data = await res.json();
//         setRecommendations(data);
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!recommendations) {
//     return <div>Loading roadmap...</div>;
//   }

//   const {
//     current_skills,
//     recommended_target_roles,
//     skill_roadmap,
//     certifications,
//     projects,
//     job_market_trends,
//   } = recommendations;

//   // Utility function to filter data based on level (optional)
//   const filterByLevel = (items, level) =>
//     items.filter(
//       (item) =>
//         item.level &&
//         item.level.toLowerCase() === level.toLowerCase()
//     );

//   // Shared component for each stage block
//   const StageBlock = ({ title, skills, certs, projs }) => (
//     <Box className="stage-block">
//       <Typography variant="h5">{title}</Typography>
//       <Divider sx={{ my: 2 }} />

//       <Typography variant="h6">Skills to Learn</Typography>
//       <Box className="card-row">
//         {skills.length ? (
//           skills.map((skill, idx) => (
//             <Card className="roadmap-card" key={idx}>
//               <CardContent>
//                 <Typography>{skill}</Typography>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography>No skills listed</Typography>
//         )}
//       </Box>

//       <Typography variant="h6" sx={{ mt: 3 }}>
//         Recommended Certifications
//       </Typography>
//       <Box className="card-row">
//         {certs.length ? (
//           certs.map((cert, idx) => (
//             <Card className="roadmap-card" key={idx}>
//               <CardContent>
//                 <Typography variant="h6">{cert.name}</Typography>
//                 <Typography>{cert.description}</Typography>
//                 {cert.url && (
//                   <a href={cert.url} target="_blank" rel="noopener noreferrer">
//                     Learn More
//                   </a>
//                 )}
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography>No certifications listed</Typography>
//         )}
//       </Box>

//       <Typography variant="h6" sx={{ mt: 3 }}>
//         Projects to Build
//       </Typography>
//       <Box className="card-row">
//         {projs.length ? (
//           projs.map((proj, idx) => (
//             <Card className="roadmap-card" key={idx}>
//               <CardContent>
//                 <Typography variant="h6">{proj.title}</Typography>
//                 <Typography>{proj.description}</Typography>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography>No projects listed</Typography>
//         )}
//       </Box>
//     </Box>
//   );

//   return (
//     <Container className="roadmap-container">
//       <Typography variant="h3" gutterBottom>
//         🚀 Your Career Roadmap
//       </Typography>

//       <Typography variant="h6" gutterBottom>
//         Current Skills: {current_skills.join(", ")}
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         Target Roles: {recommended_target_roles.join(", ")}
//       </Typography>

//       {/* Beginner Stage */}
//       <StageBlock
//         title="Beginner Stage"
//         skills={skill_roadmap.beginner || []}
//         certs={filterByLevel(certifications, "beginner")}
//         projs={projects.filter(
//           (proj) => proj.difficulty?.toLowerCase() === "beginner"
//         )}
//       />

//       {/* Intermediate Stage */}
//       <StageBlock
//         title="Intermediate Stage"
//         skills={skill_roadmap.intermediate || []}
//         certs={filterByLevel(certifications, "intermediate")}
//         projs={projects.filter(
//           (proj) => proj.difficulty?.toLowerCase() === "intermediate"
//         )}
//       />

//       {/* Advanced Stage */}
//       <StageBlock
//         title="Advanced Stage"
//         skills={skill_roadmap.advanced || []}
//         certs={filterByLevel(certifications, "advanced")}
//         projs={projects.filter(
//           (proj) => proj.difficulty?.toLowerCase() === "advanced"
//         )}
//       />

//       {/* Job Market Trends Section */}
//       <Box className="stage-block">
//         <Typography variant="h5">📈 Job Market Trends</Typography>
//         <Divider sx={{ my: 2 }} />

//         <Typography variant="body1" sx={{ mb: 2 }}>
//           <strong>Demand Trends:</strong> {job_market_trends.demand_trends}
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//           <strong>Emerging Skills:</strong>{" "}
//           {job_market_trends.emerging_skills.join(", ")}
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//           <strong>Industry Growth:</strong> {job_market_trends.industry_growth}
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//         <strong>Salary Expectations:</strong> ${job_market_trends.salary_expectations.min_salary_usd.toLocaleString()} - ${job_market_trends.salary_expectations.max_salary_usd.toLocaleString()} USD
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//           <strong>Future Outlook:</strong> {job_market_trends.future_outlook}
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Roadmap;

import React, { useEffect, useState } from 'react';
import './Roadmap.css'; // Optional but recommended for styling
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

  // Separate certifications and projects by level (from Gemini response)
  const beginnerCerts = certifications?.beginner || [];
  const intermediateCerts = certifications?.intermediate || [];
  const advancedCerts = certifications?.advanced || [];

  const beginnerProjects = projects?.beginner || [];
  const intermediateProjects = projects?.intermediate || [];
  const advancedProjects = projects?.advanced || [];

  return (
    <div className="roadmap-container">
      <Typography variant="h3" gutterBottom>🚀 Your Career Roadmap</Typography>

      <Typography variant="body1" align="center" gutterBottom>
        <strong>Current Skills:</strong> {current_skills.join(", ")}
      </Typography>

      <Typography variant="body1" align="center" gutterBottom>
        <strong>Target Roles:</strong> {recommended_target_roles.join(", ")}
      </Typography>

      {/* Beginner Stage */}
      <StageBlock
        title="Beginner Stage"
        skills={skill_roadmap?.beginner || []}
        certifications={beginnerCerts}
        projects={beginnerProjects}
      />

      <ArrowDownwardIcon fontSize="large" style={{ margin: '20px 0' }} />

      {/* Intermediate Stage */}
      <StageBlock
        title="Intermediate Stage"
        skills={skill_roadmap?.intermediate || []}
        certifications={intermediateCerts}
        projects={intermediateProjects}
      />

      <ArrowDownwardIcon fontSize="large" style={{ margin: '20px 0' }} />

      {/* Advanced Stage */}
      <StageBlock
        title="Advanced Stage"
        skills={skill_roadmap?.advanced || []}
        certifications={advancedCerts}
        projects={advancedProjects}
      />

      {/* Market Trends */}
      <section className="roadmap-section">
        <Typography variant="h4" gutterBottom>📈 Job Market Trends</Typography>
        <Divider />
        <Typography><strong>Demand Growth:</strong> {job_market_trends?.demand_growth_percentage}%</Typography>
        
        <Typography><strong>Industry Growth:</strong></Typography>
        <ul>
          {job_market_trends?.industry_growth_percentages?.map((industry, idx) => (
            <li key={idx}>{industry.industry}: {industry.growth_percentage}%</li>
          ))}
        </ul>

        <Typography>
          <strong>Salary Expectations:</strong> ${job_market_trends?.salary_expectations?.min_salary_usd.toLocaleString()} - ${job_market_trends?.salary_expectations?.max_salary_usd.toLocaleString()}
        </Typography>

        <Typography>
          <strong>Emerging Skills:</strong> {job_market_trends?.emerging_skills?.join(", ")}
        </Typography>

        <Typography>
          <strong>Future Outlook:</strong> {job_market_trends?.future_outlook_summary}
        </Typography>
      </section>
    </div>
  );
};

// ✅ Reusable component for each stage block
const StageBlock = ({ title, skills, certifications, projects }) => (
  <section className="roadmap-section">
    <Card className="stage-card">
      <CardContent>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        <Divider style={{ marginBottom: '15px' }} />

        {/* Skills */}
        <Typography variant="h6">Skills to Learn</Typography>
        <div className="skill-list">
          {skills.map((skill, idx) => (
            <Card key={idx} className="skill-item">
              <CardContent>{skill}</CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Typography variant="h6" style={{ marginTop: '20px' }}>Recommended Certifications</Typography>
        <div className="cert-list">
          {certifications.length > 0 ? certifications.map((cert, idx) => (
            <Card key={idx} className="cert-item">
              <CardContent>
                <Typography variant="subtitle1"><strong>{cert.name}</strong></Typography>
                <Typography variant="body2">{cert.description}</Typography>
                <a href={cert.url} target="_blank" rel="noopener noreferrer">View Certification</a>
              </CardContent>
            </Card>
          )) : <Typography variant="body2">No certifications available.</Typography>}
        </div>

        {/* Projects */}
        <Typography variant="h6" style={{ marginTop: '20px' }}>Projects to Build</Typography>
        <div className="project-list">
          {projects.length > 0 ? projects.map((proj, idx) => (
            <Card key={idx} className="project-item">
              <CardContent>
                <Typography variant="subtitle1"><strong>{proj.title}</strong></Typography>
                <Typography variant="body2">{proj.description}</Typography>
                <Typography variant="caption">Skills Developed: {proj.skills_developed.join(", ")}</Typography>
              </CardContent>
            </Card>
          )) : <Typography variant="body2">No projects available.</Typography>}
        </div>
      </CardContent>
    </Card>
  </section>
);

export default Roadmap;
