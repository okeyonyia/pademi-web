import Image from "next/image";
import { useState } from "react";
import App01 from "@/assets/images/App01.png";
import App02 from "@/assets/images/App02.png";
import App03 from "@/assets/images/App03.png";
import App04 from "@/assets/images/App04.png";
import App05 from "@/assets/images/App05.png";
import App06 from "@/assets/images/App06.png";

const slides = [
  {
    title: "Course Management",
    image: App01,
    description: "Manage your learning journey with our intuitive interface",
  },
  {
    title: "Activity Tracking",
    image: App02,
    description: "Track your progress and stay motivated",
  },
  {
    title: "Social Learning",
    image: App03,
    description: "Connect with other learners and share experiences",
  },
  {
    title: "Course Management",
    image: App04,
    description: "Manage your learning journey with our intuitive interface",
  },
  {
    title: "Activity Tracking",
    image: App05,
    description: "Track your progress and stay motivated",
  },
  {
    title: "Social Learning",
    image: App06,
    description: "Connect with other learners and share experiences",
  },
];

export default function AppSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: any) => {
    const scrollLeft = event.target.scrollLeft;
    const elementWidth = 300 + 16;
    const index = Math.round(scrollLeft / elementWidth);
    setCurrentSlide(index - 1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Show Our Apps Screenshots</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
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
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[300px] h-[600px] bg-white rounded-[2.5rem] overflow-hidden mx-4 snap-center transform transition-transform duration-500 ${
                  currentSlide != index ? "scale-95" : "scale-100"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-transparent border-8 border-black rounded-[2.5rem] shadow-xl pointer-events-none"></div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20"></div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, index) => (
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
