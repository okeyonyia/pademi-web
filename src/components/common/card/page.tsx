import React from "react";
import { FiCheck } from "react-icons/fi";

interface cardProps {
  heading: string;
  content: string;
}

const Card = ({ heading, content }: cardProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all ease-in-out duration-500 hover:scale-105 min-h-60 justify-center items-center cursor-pointer">
      <FiCheck className="text-indigo-600 text-2xl my-8" />
      <h3 className="text-xl font-semibold mb-2 text-center">{heading}</h3>
      <p className="text-gray-600 text-center">{content}</p>
    </div>
  );
};

export default Card;
