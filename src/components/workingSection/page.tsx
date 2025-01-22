import { howItWorks } from "@/constant";
import PrimaryButton from "../common/primaryButton/page";
import { BiChevronRight } from "react-icons/bi";

export default function WorkProcess() {
  return (
    <section id="how-it-works" className="bg-gray-100">
      <div className="py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading">How It Works</h2>
          {/* <p className="text-gray-600 max-w-3xl mx-auto">
            Distinctively grow go forward manufactured products and optimal
            networks. Enthusiastically disseminate user-centric outsourcing
            through revolutionary
          </p> */}
        </div>

        <div className="relative space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-20 relative">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div className="relative mb-6 z-10">
                  <div className="w-24 h-24 bg-purple-700 rounded-lg flex justify-center items-center">
                    <p className="text-4xl">{step.icon}</p>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-purple-700 font-bold">
                      {step.number}
                    </span>
                  </div>
                </div>

                {index < howItWorks.length - 1 && (
                  <>
                    {index % 2 === 0 && (
                      <div className="hidden md:flex lg:hidden absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] items-center">
                        <div className="h-px flex-grow relative">
                          <div className="absolute w-full h-full flex justify-center">
                            <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
                          </div>
                        </div>
                        <BiChevronRight className="text-gray-300 w-12 h-12 -ml-5" />
                      </div>
                    )}

                    <div className="hidden lg:flex absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] items-center">
                      <div className="h-px flex-grow relative">
                        <div className="absolute w-full h-full flex justify-center">
                          <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
                        </div>
                      </div>

                      <BiChevronRight className="text-gray-300 w-12 h-12 -ml-5" />
                    </div>
                  </>
                )}

                <h3 className="subheading text-center">{step.title}</h3>
                <p className="subdescription text-gray-600 text-center">
                  {step.description}
                </p>

                {index < howItWorks.length - 1 && (
                  <div className="lg:hidden md:hidden w-px h-16 bg-gray-300 absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-90">
                      <div className="w-3 h-3 border-t-2 border-r-2 border-gray-300 transform rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="justify-center items-center flex">
            <PrimaryButton title="Schedule a Demo" theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
