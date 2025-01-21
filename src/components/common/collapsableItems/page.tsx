import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface CollapsibleItem {
  heading: string;
  description: string;
}

interface CollapsibleProps {
  items: CollapsibleItem[];
}

const Collapsible = ({ items }: CollapsibleProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-300 ">
          <div
            className="flex justify-between items-center cursor-pointer py-4"
            onClick={() => toggleItem(index)}
          >
            <h3
              className={`text-lg font-semibold ${
                activeIndex === index ? "text-indigo-600" : "text-gray-800"
              }`}
            >
              {item.heading}
            </h3>
            {activeIndex === index ? (
              <FiChevronUp className="text-indigo-600 text-xl" />
            ) : (
              <FiChevronDown className="text-gray-600 text-xl" />
            )}
          </div>
          <p
            className={`text-gray-600 overflow-hidden transition-all duration-500 ease-in-out ${
              activeIndex === index ? "max-h-screen mt-2" : "max-h-0"
            }`}
            style={{
              height: activeIndex === index ? "auto" : "0",
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Collapsible;
