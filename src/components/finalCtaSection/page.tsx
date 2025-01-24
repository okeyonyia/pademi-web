"use client";

import React from "react";

export interface FinalCtaSectionProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonHandler: () => void;
}

const FinalCtaSection = ({
  heading,
  description,
  buttonText,
  buttonHandler,
}: FinalCtaSectionProps) => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-7xl">
        <h2 className="heading">{heading}</h2>
        <p className="description max-w-3xl mx-auto">{description}</p>
        <button
          onClick={buttonHandler}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default FinalCtaSection;
