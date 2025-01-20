import Link from "next/link";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NavSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const getLinkClass = (link: string) =>
    activeLink === link
      ? "text-indigo-600 font-semibold"
      : "hover:text-indigo-600 transition-colors";

  const navLinks = [
    {
      url: "features",
      title: "Features",
    },
    {
      url: "how-it-works",
      title: "How It Works",
    },
    {
      url: "use-cases",
      title: "Use Cases",
    },
    {
      url: "pricing",
      title: "Pricing",
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl ">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Pademi
        </Link>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => {
            return (
              <a
                key={index}
                href={`#${link.url}`}
                className={getLinkClass(link.url)}
                onClick={() => handleLinkClick(link.url)}
              >
                {link.title}
              </a>
            );
          })}
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link, index) => {
            return (
              <div
                key={index}
                className={` p-4 rounded-lg ${
                  activeLink === link.url ? "bg-indigo-100" : "bg-white"
                }`}
                onClick={() => handleLinkClick(link.url)}
              >
                <a href={`#${link.url}`} className={getLinkClass(link.url)}>
                  {link.title}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default NavSection;
