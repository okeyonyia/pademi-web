import PrimaryButton from "@/components/common/primaryButton/page";
import React from "react";

interface ContainerProps {
  step?: number;
  heading?: string;
  description?: string;
}

const Container = ({
  step = 0,
  heading = "heading",
  description = "description",
}: ContainerProps) => {
  return (
    <div className="text-center transition-all ease-in-out duration-500">
      <h3 className="text-6xl text-indigo-600 font-semibold mb-2 text-start">
        {step}.
      </h3>
      <h3 className="text-4xl font-semibold mb-2 text-start w-[90%]">
        {heading}
      </h3>
      <p className="text-gray-600 text-start">{description}</p>

      <div className=" mt-20 ">
        <PrimaryButton
          title="Schedule a Demo"
          theme="dark"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Container;
