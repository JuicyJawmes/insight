import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const CareerForm = () => {
  const [step, setStep] = useState(1);

  const [github, setGithub] = useState(""); // Github username
  const [resume, setResume] = useState(null); // Resume file

  return (
    <>
      {step === 1 && (
        <StepOne
          github={github}
          onGithubChange={setGithub}
          resume={resume}
          onResumeChange={(e) => setResume(e.target.files[0])}
          onNext={() => setStep(2)} // Move to StepTwo on successful upload
        />
      )}

      {step === 2 && (
        <StepTwo
          githubUsername={github} // Pass username for payload (optional)
        />
      )}
    </>
  );
};

export default CareerForm;
