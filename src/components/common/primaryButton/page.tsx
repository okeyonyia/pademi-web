import React from "react";

const PrimaryButton = ({
  title = "Button",
  theme = "light",
}: {
  title?: string;
  theme?: "light" | "dark";
}) => {
  return (
    <button
      className={` px-8 py-3 rounded-full description font-semibold hover:bg-transparent transition-all  border-2 border-transparent  lg:flex ${
        theme === "light"
          ? "bg-white text-indigo-600 hover:text-white hover:border-white"
          : "bg-indigo-600 text-white hover:text-indigo-600 hover:border-indigo-600"
      }`}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
