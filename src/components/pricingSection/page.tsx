import React from "react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Dedicated Support & Flexible Pricing
        </h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Our team helps you get started, from onboarding to event best
          practices. Choose a plan based on your company size, with bulk
          discounts and advanced features.
        </p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Contact Sales for Pricing
        </button>
      </div>
    </section>
  );
};

export default PricingSection;
