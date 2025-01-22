import { useCasesData } from "@/constant";
import React from "react";
import Collapsible from "../common/collapsableItems/page";

const UseCaseSection = () => {
  return (
    <section id="use-cases" className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <h2 className="heading">Corporate Use Cases</h2>
        {/* <div className="grid md:grid-cols-2 gap-8">
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
        </div> */}

        <Collapsible items={useCasesData} />
      </div>
    </section>
  );
};

export default UseCaseSection;
