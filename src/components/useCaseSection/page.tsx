"use client";

import { useCasesData } from "@/constant/data";
import React from "react";
import Collapsible from "../common/collapsableItems/page";

const UseCaseSection = () => {
  return (
    <section id="use-cases" className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <h2 className="heading">Corporate Use Cases</h2>
        <Collapsible items={useCasesData} />
      </div>
    </section>
  );
};

export default UseCaseSection;
