
// import React, { useState } from 'react';
// import StepOne from './components/StepOne';

// const App = () => {
//   const [step, setStep] = useState(1);
//   const [github, setGithub] = useState('');
//   const [resume, setResume] = useState(null);

//   const handleNext = () => {
//     console.log('Next step triggered!');
//     setStep(2);
//   };

//   return (
//     <div className="App">
//       {step === 1 && (
//         <StepOne
//           github={github}
//           onGithubChange={setGithub}                        // ✅ this is the function!
//           resume={resume}
//           onResumeChange={(e) => setResume(e.target.files[0])}
//           onNext={handleNext}
//         />
//       )}

//       {step === 2 && (
//         <div style={{ color: 'white' }}>Welcome to Step 2!</div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import Roadmap from './components/Roadmap'; // ✅ Uncommented because we are using it

const App = () => {
  const history = useHistory(); // ✅ Required for navigation
  const [github, setGithub] = useState('');
  const [resume, setResume] = useState(null);

  // Handles next transition after StepOne
  const handleNext = () => {
    console.log('✅ StepOne completed. Moving to StepTwo...');
    history.push('/step-two');
  };

  return (
    <div className="App">
      <Switch>
        {/* === Step One === */}
        <Route exact path="/">
          <StepOne
            github={github}
            onGithubChange={setGithub}
            resume={resume}
            onResumeChange={(e) => setResume(e.target.files[0])}
            onNext={handleNext} // ✅ Triggers route to step-two
          />
        </Route>

        {/* === Step Two === */}
        <Route path="/step-two">
          <StepTwo githubUsername={github} />
        </Route>

        {/* === Roadmap === */}
        <Route path="/roadmap">
          <Roadmap githubUsername={github} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
