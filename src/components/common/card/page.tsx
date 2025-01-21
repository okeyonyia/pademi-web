import React from "react";

interface cardProps {
  heading: string;
  content: string;
  Icon: React.ElementType;
  iconColor?: string;
}

const Card = ({ heading, content, Icon, iconColor }: cardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-2 transition-all ease-in-out duration-500 min-h-60 justify-center items-center cursor-pointer relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: iconColor }}
      />

      <div className="flex justify-center items-center mb-12">
        <Icon className={`text-7xl`} style={{ color: iconColor }} />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-center">{heading}</h3>
      <p className="text-gray-600 text-center">{content}</p>
    </div>
  );
};

export default Card;
