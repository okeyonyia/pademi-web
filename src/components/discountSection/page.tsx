"use client";

import React from "react";
import { benefitsData } from "@/constant/data";
import { BiCheckCircle } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const DiscountSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden relative">
      {/* Background Image :- Looks Cool Man, Dont remove it */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJWMTZoMnYxOHptNCAwaDJWMTZoLTJ2MTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-100" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-7xl relative z-10">
        <h2 className="heading bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Exclusive Pademi Discounts
        </h2>
        <p className="description max-w-3xl mx-auto text-gray-200 leading-relaxed">
          Make the most of every outing or corporate event. Thanks to our
          partnerships with local venues and service providers, you&apos;ll
          enjoy lower prices on everything—guaranteeing that every hangout you
          plan is both memorable and cost-effective.
        </p>
        <h3 className="subheading text-gray-100">
          Better Rates, Bigger Impact
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out overflow-hidden"
            >
              <div className="p-6">
                <h4 className="flex items-center justify-center text-xl font-semibold mb-4">
                  <BiCheckCircle className="mr-2 text-green-400" />
                  {benefit.title}
                </h4>
                <p className="subdescription" style={{ color: "#e5e7eb" }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <h3 className="subheading text-gray-100">
            Ready to Book &amp; Save?
          </h3>
          <p
            className="subdescription text-gray-200 max-w-2xl mx-auto"
            style={{ color: "#e5e7eb" }}
          >
            Join the Waitlist or Schedule a Demo to see how Pademi can transform
            your next meetup or team offsite—at a fraction of the usual cost.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="group bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center">
              Join Waitlist
              <BsArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 transition-all duration-300 px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center">
              Schedule Demo
              <BsArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
