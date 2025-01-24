import React from "react";
import NavSection from "../navSection/page";
import FooterSection from "../footerSection/page";

const DefaultLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 relative">
      <NavSection />

      {children}

      <FooterSection />
    </div>
  );
};

export default DefaultLayout;
