import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NavSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsSidebarOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, []);

  const navLinks = [
    { url: "features", title: "Features" },
    { url: "how-it-works", title: "How It Works" },
    { url: "use-cases", title: "Use Cases" },
    { url: "pricing", title: "Pricing" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
        <a href="/" className="text-2xl font-bold text-indigo-600">
          Pademi
        </a>

        <div className="hidden lg:flex space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.url}`}
              className={`transition-all duration-500 ease-in-out ${
                activeLink === link.url
                  ? "text-indigo-600 font-medium"
                  : "hover:text-indigo-500"
              }`}
              onClick={() => handleLinkClick(link.url)}
            >
              {link.title}
            </a>
          ))}
        </div>

        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="h-full flex flex-col overflow-y-auto bg-gradient-to-br from-indigo-100 via-white to-purple-200">
          <div className="flex justify-between items-center p-4 border-b">
            <a href="/" className="text-2xl font-bold text-indigo-600">
              Pademi
            </a>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-grow">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={`#${link.url}`}
                className={`block p-4 transition-all duration-300 ${
                  activeLink === link.url
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "hover:bg-indigo-50"
                }`}
                onClick={() => handleLinkClick(link.url)}
              >
                {link.title}
              </a>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="w-full h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                Pademi App
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
};

export default NavSection;
