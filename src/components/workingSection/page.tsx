import React, { useState } from "react";
import { howItWorksData } from "@/constant";
import Container from "./container/page";

interface ActiveStepType {
  step: number;
  heading: string;
  description: string;
}

const WorkingSection = () => {
  const [activeStep, setActiveStep] = useState<ActiveStepType>();

  const handleActiveStep = (stepData: ActiveStepType) => {
    setActiveStep(stepData);
  };

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-center items-center mb-12 mx-auto ">
          {howItWorksData.map((step, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer transition-all active:scale-95 select-none inline-block border-b-2 ${
                activeStep?.step === index + 1
                  ? " border-indigo-600"
                  : " border-gray-600 hover:border-gray-400"
              }`}
              onClick={() =>
                handleActiveStep({
                  step: index + 1,
                  heading: step.heading,
                  description: step.description,
                })
              }
            >
              <h3
                className={`text-base font-semibold mb-2 text-center ${
                  activeStep?.step === index + 1
                    ? "text-indigo-600 transition-all"
                    : ""
                }`}
              >
                {step.heading}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Container
            step={activeStep?.step}
            heading={activeStep?.heading}
            description={activeStep?.description}
          />
        </div>
      </div>
    </section>
  );
};

export default WorkingSection;
