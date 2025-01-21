import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Pademi. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
