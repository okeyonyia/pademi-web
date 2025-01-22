"use client";

import React from "react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-7xl">
        <h2 className="heading">Dedicated Support & Flexible Pricing</h2>
        <p className="description max-w-3xl mx-auto">
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
