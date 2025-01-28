"use client";

import { activityItems } from "@/constant/data";
import React from "react";
import Collapsible from "../../common/collapsableItems/page";

const UseCaseSection = () => {
  return (
    <section id="use-cases" className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <h2 className="heading">Activity Ideas</h2>
        <p className="description">
          Explore our curated list of team-building activities to boost morale,
          improve collaboration, and create lasting memories with your
          colleagues.
        </p>
        <Collapsible items={activityItems} />
      </div>
    </section>
  );
};

export default UseCaseSection;
