import React from "react";
import { featuresData } from "@/constant/index.js";
import Card from "../common/card/page";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20 ">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Pademi for Teams?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              heading={feature.heading}
              content={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
