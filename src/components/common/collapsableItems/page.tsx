"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import LazyImg from "../lazyImage/page";

interface ActivityItem {
  heading: string;
  description: string;
  subActivities: {
    title: string;
    description: string;
    image: string;
  }[];
}

interface CollapsibleProps {
  items: ActivityItem[];
}

const Collapsible = ({ items }: CollapsibleProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleItem(index)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.heading}
            </h3>
            {activeIndex === index ? (
              <FiChevronUp className="text-indigo-600 text-xl" />
            ) : (
              <FiChevronDown className="text-gray-600 text-xl" />
            )}
          </button>
          <div>
            {activeIndex === index && (
              <div>
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.subActivities.map((subActivity, subIndex) => (
                      <div
                        key={subIndex}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <LazyImg
                            src={"/assets/images/BusinessBG.webp"}
                            alt={subActivity.title}
                            placeholder={subActivity.title}
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {subActivity.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {subActivity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collapsible;
