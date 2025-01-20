import { useCasesData } from "@/constant";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const UseCaseSection = () => {
  return (
    <section id="use-cases" className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Corporate Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {useCasesData.map((useCase, index) => (
            <div key={index} className="flex items-start">
              <FiChevronRight className="text-indigo-600 text-2xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {useCase.heading}
                </h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
