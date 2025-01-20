import { offersData } from "@/constant";
import React from "react";

const DiscountSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Exclusive Pademi Discounts
        </h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Make the most of every outing or corporate event with our
          partnerships. Enjoy lower prices on everything—guaranteeing that every
          hangout you plan is both memorable and cost-effective.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {offersData.map((benefit, index) => (
            <div key={index} className="bg-white bg-opacity-20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{benefit.heading}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
