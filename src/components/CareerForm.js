import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const CareerForm = () => {
  const [step, setStep] = useState(1);

  const [resume, setResume] = useState(null);
  const [github, setGithub] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [workPrefs, setWorkPrefs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("github", github);
    formData.append("jobs", JSON.stringify(selectedJobs.map(j => j.value)));
    formData.append("industries", JSON.stringify(selectedIndustries.map(i => i.value)));
    formData.append("workPrefs", JSON.stringify(workPrefs.map(w => w.value)));

    console.log("Submitting form:", {
      resume,
      github,
      selectedJobs,
      selectedIndustries,
      workPrefs
    });

    // TODO: POST formData to backend
  };

  return (
    <>
      {step === 1 && (
        <StepOne
          resume={resume}
          github={github}
          onResumeChange={(e) => setResume(e.target.files[0])}
          onGithubChange={setGithub}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepTwo
          selectedJobs={selectedJobs}
          selectedIndustries={selectedIndustries}
          workPrefs={workPrefs}
          setSelectedJobs={setSelectedJobs}
          setSelectedIndustries={setSelectedIndustries}
          setWorkPrefs={setWorkPrefs}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default CareerForm;

