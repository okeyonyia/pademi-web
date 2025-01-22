"use client";

import LazyImg from "@/components/common/lazyImage/page";
import { appSlidesData } from "@/constant/data";
import { useState } from "react";

export default function AppSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = (event.target as HTMLDivElement).scrollLeft;
    const elementWidth = 300 + 16;
    const index = Math.round(scrollLeft / elementWidth);
    setCurrentSlide(index - 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      <div className="text-center mb-12">
        <h2 className="heading">Show Our Apps Screenshots</h2>
        <p className="description text-gray-600 mx-auto">
          Credibly synthesize multimedia-based networks vis-a-vis top-line
          growth strategies. Continually leverage existing worldwide interfaces.
        </p>
      </div>

      <div className="relative">
        <div
          className="relative overflow-x-scroll flex flex-nowrap snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
        >
          <div className="flex flex-nowrap pl-[50vw] pr-[50vw] ">
            {appSlidesData.map((slide, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[300px] h-[600px] bg-white rounded-[2.5rem] overflow-hidden mx-4 snap-center transform transition-transform duration-500 ${
                  currentSlide != index ? "scale-95" : "scale-100"
                }`}
              >
                <LazyImg
                  src={slide.image}
                  alt={slide.title}
                  className="w-[300px] h-[600px] object-cover"
                  placeholder={slide.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-transparent border-8 border-black rounded-[2.5rem] shadow-xl pointer-events-none"></div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20"></div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {appSlidesData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-purple-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
