import { useEffect, useState } from "react";
import { formatRecommendation } from "../utils/factory";

const AiReportAnalyse = ({ isWaiting, recommendation }) => {
  const [status, setStatus] = useState("Thanks for submitting the report");
  const [step, setStep] = useState(0);
  const [aiSafety, setAiSafety] = useState(false);

  const openSafety = () => {
    setAiSafety(true);
  };

  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(() => {
        if (!isWaiting) {
          clearTimeout(timer);
          setStatus(
            "Your report has been received, please checkout safety recommendations below while we broadcast the alert. Thanks and stay safe"
          );
          console.log({ recommendation });
          return;
        }
        if (step === 0) {
          setStatus("Getting your location");
        } else if (step === 1) {
          setStatus("Analyzing the image to confirm disaster type");
        } else if (step === 2) {
          setStatus("Analyzing your report. Please wait for a moment...");

          setTimeout(() => {}, 1000); // Close the modal after 1 second
        }
        setStep(step + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, isWaiting, recommendation]);

  return (
    <div className="relative">
      <div className={aiSafety ? "hidden": "grid"}>
      <h1 className={`text-xl text-center w-[85%] font-semibold font-serif`}>
        {status}
      </h1>
      <div className={` flex items-end justify-center`}>
        <img
          src="/Group.png"
          alt="WaverX"
          className={` mt-8 h-48 ${isWaiting && "animate-rotate-smooth"}`}
        />
      </div>
      <button className="bg-[#008080] rounded-md md:w-[15%] h-12 w-[50%] px-2 relative md:left-12 mt-4 left-4  text-white" onClick={openSafety}>
        Safety first
      </button>
      </div>
      {aiSafety && (
        <div
        className="text-left max-h-[90%] w-[90%] overflow-y-auto"
         
        >
          {recommendation && (
            <div
              dangerouslySetInnerHTML={{
                __html: formatRecommendation(recommendation),
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};
export default AiReportAnalyse;
