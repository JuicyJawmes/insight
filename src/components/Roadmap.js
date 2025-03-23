

import React, { useEffect, useState, useRef } from 'react';
import './Roadmap.css';
import { Typography, Card, CardContent, Divider, Link, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import downArrow from '../components/assets/down-arrow.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const tagColors = ['#80cbc4', '#f48fb1', '#ffb74d', '#9575cd', '#4db6ac', '#e57373'];

const Roadmap = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [hideIntro, setHideIntro] = useState(false);
  const piecesRef = useRef([]);
  const pdfRef = useRef();

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

    const newPieces = [];
    const numPieces = 75;
    for (let i = 0; i < numPieces; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 5 + 2;
      const opacity = Math.random() * 0.3 + 0.2;
      const animationDelay = Math.random() * 2;
      newPieces.push({ id: i, x, y, originX: x, originY: y, size, opacity, animationDelay });
    }
    setPieces(newPieces);
    piecesRef.current = newPieces;
  }, []);

  const handleMouseMove = (e) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const threshold = 150;

    const updatedPieces = piecesRef.current.map((piece) => {
      const distanceX = cursorX - piece.x;
      const distanceY = cursorY - piece.y;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < threshold) {
        return {
          ...piece,
          x: piece.x - distanceX * 0.1,
          y: piece.y - distanceY * 0.1,
        };
      }

      const backDistanceX = piece.originX - piece.x;
      const backDistanceY = piece.originY - piece.y;

      return {
        ...piece,
        x: piece.x + backDistanceX * 0.05,
        y: piece.y + backDistanceY * 0.05,
      };
    });

    piecesRef.current = updatedPieces;
    setPieces([...updatedPieces]);
  };

  const handleDownloadPDF = () => {
    setHideIntro(true);

    setTimeout(() => {
      const input = pdfRef.current;
      html2canvas(input, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.scrollHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("career-roadmap.pdf");
        setHideIntro(false);
      });
    }, 100);
  };

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
    <div className="roadmap-background" onMouseMove={handleMouseMove} style={{ 
      background: 'linear-gradient(to top, #0d0d2b 1%, #1a1a1a)', 
      minHeight: '100vh', 
      padding: '30px', 
      color: '#FDFEFE', 
      textAlign: 'center', 
      fontFamily: 'monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {pieces.map((piece) => (
        <div key={piece.id} style={{
          position: 'absolute',
          left: piece.x,
          top: piece.y,
          width: piece.size,
          height: piece.size,
          borderRadius: '50%',
          backgroundColor: `rgba(255, 255, 255, ${piece.opacity})`,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      ))}

      <div ref={pdfRef} style={{ position: 'relative', zIndex: 1 }}>
        {!hideIntro && (
          <>
            <Typography variant="h3" sx={{ fontFamily: 'monospace'}}gutterBottom className="roadmap-title">
              Your Career Roadmap
            </Typography>
            <Divider sx={{ backgroundColor: 'white', height: '3px', margin: '10px auto 25px', width: '60%' }} />

            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
              Target Roles:
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '20px', fontFamily: 'monospace' }}>{recommended_target_roles.join(", ")}</Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px', fontFamily: 'monospace' }}>
              Current Skills:
            </Typography>
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
                    backgroundColor: tagColors[i % tagColors.length],
                    display: 'inline-block',
                    marginRight: '8px'
                  }}></span>
                  {skill}
                </div>
              ))}
            </div>
          </>
        )}

        <StageBlock title="Beginner" skills={skill_roadmap?.beginner || []} certifications={beginnerCerts} projects={beginnerProjects} />
        <img src={downArrow} alt="down arrow" style={{ width: '30px', height: '30px', margin: '30px auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
        <StageBlock title="Intermediate" skills={skill_roadmap?.intermediate || []} certifications={intermediateCerts} projects={intermediateProjects} />
        <img src={downArrow} alt="down arrow" style={{ width: '30px', height: '30px', margin: '30px auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
        <StageBlock title="Advanced" skills={skill_roadmap?.advanced || []} certifications={advancedCerts} projects={advancedProjects} />
      </div>

      <Button onClick={handleDownloadPDF} variant="contained" sx={{ marginTop: '30px', backgroundColor: '#444', color: 'white', position: 'relative', zIndex: 2 }}>
        Download as PDF
      </Button>
    </div>
  );
};

const StageBlock = ({ title, skills, certifications, projects }) => (
  <div className="stage-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
    <div className="stage-outer" style={{ backgroundColor: '#121212', padding: '60px', borderRadius: '20px', width: '85%', border: '1px solid #333' }}>
      <Typography variant="h4" style={{ color: 'white', marginBottom: '10px', fontFamily: 'monospace' }}>{title}</Typography>
      <Divider sx={{ backgroundColor: 'white', height: '3px', marginBottom: '25px' }} />

      <div className="pill-container" style={{ marginBottom: '20px' }}>
        {skills.map((skill, i) => (
          <div key={i} className="pill" style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#555',
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
              backgroundColor: tagColors[i % tagColors.length],
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
        padding: '30px 40px',
        marginBottom: '30px',
        color: '#FDFEFE',
        textAlign: 'left',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {certifications.map((cert, idx) => (
          <Typography key={idx} style={{ marginBottom: '10px', fontSize: '15px', fontFamily: 'monospace' }}>
            <strong>Certification #{idx + 1}:</strong> <Link href={cert.url} target="_blank" rel="noopener" underline="hover" sx={{ color: '#FDFEFE', fontWeight: 'bold' }}>{cert.name}</Link>
          </Typography>
        ))}
      </div>

      <div className="project-section" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {projects.map((proj, idx) => (
          <div key={idx} style={{
            borderRadius: '25px',
            background: '#333',
            padding: '25px',
            width: '220px',
            height: '160px',
            boxShadow: '3px 3px 10px rgba(0,0,0,0.4)',
            color: '#FDFEFE',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'monospace'
          }}>
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}><WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', marginRight: '6px' }} />{proj.title}</Typography>
              <Typography variant="body2" sx={{ fontSize: '13px', fontFamily: 'monospace' }}>{proj.description}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Roadmap;

// import React, { useEffect, useState, useRef } from 'react';
// import './Roadmap.css';
// import { Typography, Divider, Link, Button } from '@mui/material';
// import WorkIcon from '@mui/icons-material/Work';
// import downArrow from '/Users/james/insight/insight/src/components/assets/down-arrow.png';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const tagColors = ['#80cbc4', '#f48fb1', '#ffb74d', '#9575cd', '#4db6ac', '#e57373'];

// const Roadmap = () => {
//   const [recommendations, setRecommendations] = useState(null);
//   const [userInput, setUserInput] = useState(null);
//   const [pieces, setPieces] = useState([]);
//   const [hideIntro, setHideIntro] = useState(false);
//   const piecesRef = useRef([]);
//   const pdfRef = useRef();

//   const username = "JuicyJawmes"; // Replace this dynamically as needed (prop, context, etc.)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch roadmap recommendations
//         const recRes = await fetch('http://localhost:5002/api/getRecommendations');
//         const recData = await recRes.json();
//         setRecommendations(recData);

//         // Fetch user input from backend (user_inputs folder)
//         const inputRes = await fetch(`http://localhost:5002/api/user-data/${username}`);
//         const inputData = await inputRes.json();
//         console.log("✅ User Input Data:", inputData);
//         setUserInput(inputData);
//       } catch (error) {
//         console.error("❌ Error fetching roadmap or user input:", error);
//       }
//     };

//     fetchData();

//     // Floating particles background setup
//     const newPieces = [];
//     const numPieces = 75;
//     for (let i = 0; i < numPieces; i++) {
//       const x = Math.random() * window.innerWidth;
//       const y = Math.random() * window.innerHeight;
//       const size = Math.random() * 5 + 2;
//       const opacity = Math.random() * 0.3 + 0.2;
//       const animationDelay = Math.random() * 2;
//       newPieces.push({ id: i, x, y, originX: x, originY: y, size, opacity, animationDelay });
//     }
//     setPieces(newPieces);
//     piecesRef.current = newPieces;
//   }, [username]);

//   const handleMouseMove = (e) => {
//     const cursorX = e.clientX;
//     const cursorY = e.clientY;
//     const threshold = 150;

//     const updatedPieces = piecesRef.current.map((piece) => {
//       const distanceX = cursorX - piece.x;
//       const distanceY = cursorY - piece.y;
//       const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

//       if (distance < threshold) {
//         return {
//           ...piece,
//           x: piece.x - distanceX * 0.1,
//           y: piece.y - distanceY * 0.1,
//         };
//       }

//       const backDistanceX = piece.originX - piece.x;
//       const backDistanceY = piece.originY - piece.y;

//       return {
//         ...piece,
//         x: piece.x + backDistanceX * 0.05,
//         y: piece.y + backDistanceY * 0.05,
//       };
//     });

//     piecesRef.current = updatedPieces;
//     setPieces([...updatedPieces]);
//   };

//   const handleDownloadPDF = () => {
//     setHideIntro(true);

//     setTimeout(() => {
//       const input = pdfRef.current;
//       html2canvas(input, {
//         backgroundColor: null,
//         useCORS: true,
//         scale: 2,
//         scrollY: -window.scrollY,
//         windowWidth: document.documentElement.offsetWidth,
//         windowHeight: document.documentElement.scrollHeight,
//       }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save("career-roadmap.pdf");
//         setHideIntro(false);
//       });
//     }, 100);
//   };

//   if (!recommendations || !userInput) {
//     return <div>Loading roadmap...</div>;
//   }

//   const {
//     current_skills,
//     recommended_target_roles,
//     skill_roadmap,
//     certifications,
//     projects
//   } = recommendations;

//   const beginnerCerts = certifications?.beginner || [];
//   const intermediateCerts = certifications?.intermediate || [];
//   const advancedCerts = certifications?.advanced || [];

//   const beginnerProjects = projects?.beginner || [];
//   const intermediateProjects = projects?.intermediate || [];
//   const advancedProjects = projects?.advanced || [];

//   const {
//     targetRoles = [],
//     workPreferences = [],
//     industryInterests = []
//   } = userInput;

//   return (
//     <div className="roadmap-background" onMouseMove={handleMouseMove} style={{ 
//       background: 'linear-gradient(to top, #0d0d2b 1%, #1a1a1a)', 
//       minHeight: '100vh', 
//       padding: '30px', 
//       color: '#FDFEFE', 
//       textAlign: 'center', 
//       fontFamily: 'monospace',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       {pieces.map((piece) => (
//         <div key={piece.id} style={{
//           position: 'absolute',
//           left: piece.x,
//           top: piece.y,
//           width: piece.size,
//           height: piece.size,
//           borderRadius: '50%',
//           backgroundColor: `rgba(255, 255, 255, ${piece.opacity})`,
//           pointerEvents: 'none',
//           zIndex: 0
//         }} />
//       ))}

//       <div ref={pdfRef} style={{ position: 'relative', zIndex: 1 }}>
//         {!hideIntro && (
//           <>
//             <Typography variant="h3" sx={{ fontFamily: 'monospace' }} gutterBottom className="roadmap-title">
//               Your Career Roadmap
//             </Typography>
//             <Divider sx={{ backgroundColor: 'white', height: '3px', margin: '10px auto 25px', width: '60%' }} />

//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//               🎯 Target Roles:
//             </Typography>
//             <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '20px' }}>
//               {targetRoles.join(", ")}
//             </Typography>

//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//               🏢 Work Preferences:
//             </Typography>
//             <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '20px' }}>
//               {workPreferences.join(", ")}
//             </Typography>

//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//               🌍 Industry Interests:
//             </Typography>
//             <Typography variant="body1" sx={{ fontSize: '16px', marginBottom: '40px' }}>
//               {industryInterests.join(", ")}
//             </Typography>

//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
//               🛠️ Current Skills:
//             </Typography>
//             <div className="pill-container" style={{ marginBottom: '30px' }}>
//               {current_skills.map((skill, i) => (
//                 <div key={i} className="pill" style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   backgroundColor: '#444',
//                   color: '#FDFEFE',
//                   borderRadius: '30px',
//                   padding: '6px 15px',
//                   margin: '6px',
//                   fontSize: '14px'
//                 }}>
//                   <span style={{
//                     width: '10px',
//                     height: '10px',
//                     borderRadius: '50%',
//                     backgroundColor: tagColors[i % tagColors.length],
//                     display: 'inline-block',
//                     marginRight: '8px'
//                   }}></span>
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* === Skill Roadmap Sections === */}
//         <StageBlock title="Beginner" skills={skill_roadmap?.beginner || []} certifications={beginnerCerts} projects={beginnerProjects} />
//         <img src={downArrow} alt="down arrow" style={{ width: '30px', height: '30px', margin: '30px auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
//         <StageBlock title="Intermediate" skills={skill_roadmap?.intermediate || []} certifications={intermediateCerts} projects={intermediateProjects} />
//         <img src={downArrow} alt="down arrow" style={{ width: '30px', height: '30px', margin: '30px auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
//         <StageBlock title="Advanced" skills={skill_roadmap?.advanced || []} certifications={advancedCerts} projects={advancedProjects} />
//       </div>

//       <Button onClick={handleDownloadPDF} variant="contained" sx={{ marginTop: '30px', backgroundColor: '#444', color: 'white', position: 'relative', zIndex: 2 }}>
//         Download as PDF
//       </Button>
//     </div>
//   );
// };

// const StageBlock = ({ title, skills, certifications, projects }) => (
//   <div className="stage-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
//     <div className="stage-outer" style={{ backgroundColor: '#121212', padding: '60px', borderRadius: '20px', width: '85%', border: '1px solid #333' }}>
//       <Typography variant="h4" style={{ color: 'white', marginBottom: '10px', fontFamily: 'monospace' }}>{title}</Typography>
//       <Divider sx={{ backgroundColor: 'white', height: '3px', marginBottom: '25px' }} />

//       <div className="pill-container" style={{ marginBottom: '20px' }}>
//         {skills.map((skill, i) => (
//           <div key={i} className="pill" style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             backgroundColor: '#555',
//             color: '#FDFEFE',
//             borderRadius: '30px',
//             padding: '6px 15px',
//             margin: '6px',
//             fontSize: '14px'
//           }}>
//             <span style={{
//               width: '10px',
//               height: '10px',
//               borderRadius: '50%',
//               backgroundColor: tagColors[i % tagColors.length],
//               display: 'inline-block',
//               marginRight: '8px'
//             }}></span>
//             {skill}
//           </div>
//         ))}
//       </div>

//       <div className="cert-section" style={{
//         borderRadius: '25px',
//         background: '#222',
//         padding: '30px 40px',
//         marginBottom: '30px',
//         color: '#FDFEFE',
//         textAlign: 'left',
//         width: '60%',
//         marginLeft: 'auto',
//         marginRight: 'auto'
//       }}>
//         {certifications.map((cert, idx) => (
//           <Typography key={idx} style={{ marginBottom: '10px', fontSize: '15px', fontFamily: 'monospace' }}>
//             <strong>Certification #{idx + 1}:</strong> <Link href={cert.url} target="_blank" rel="noopener" underline="hover" sx={{ color: '#FDFEFE', fontWeight: 'bold' }}>{cert.name}</Link>
//           </Typography>
//         ))}
//       </div>

//       <div className="project-section" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
//         {projects.map((proj, idx) => (
//           <div key={idx} style={{
//             borderRadius: '25px',
//             background: '#333',
//             padding: '25px',
//             width: '220px',
//             height: '160px',
//             boxShadow: '3px 3px 10px rgba(0,0,0,0.4)',
//             color: '#FDFEFE',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             fontFamily: 'monospace'
//           }}>
//             <div>
//               <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                 <WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
//                 {proj.title}
//               </Typography>
//               <Typography variant="body2" sx={{ fontSize: '13px' }}>
//                 {proj.description}
//               </Typography>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default Roadmap;
