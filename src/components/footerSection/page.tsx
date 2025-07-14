"use client";

import Link from "next/link";
import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa";

const FooterSection = () => {
  const links = [
    { href: "/legal", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
    { href: "#", label: "Contact Us" },
  ];

  const socialIcons = [
    {
      href: "https://instagram.com/pademi.events",
      icon: <FaInstagram className="w-6 h-6" />,
      label: "Instagram",
    },
    {
      href: "https://x.com/@PademiEvents", // Twitter/X
      icon: <FaTwitter className="w-6 h-6" />,
      label: "Twitter/X",
    },
    // {
    //   href: "https://linkedin.com/in/pademi.events",
    //   icon: <FaLinkedin className="w-6 h-6" />,
    //   label: "LinkedIn",
    // },
    {
      href: "https://tiktok.com/@pademi.events",
      icon: <FaTiktok className="w-6 h-6" />,
      label: "TikTok",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <p className="text-sm">&copy; 2025 Pademi. All rights reserved.</p>
            <div className="flex space-x-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-indigo-500 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex space-x-6 mt-6 md:mt-0">
            {socialIcons.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="text-gray-300 hover:text-indigo-500 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
