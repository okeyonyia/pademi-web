import React from "react";
import Image from "next/image";
import { BsAndroid, BsApple } from "react-icons/bs";
import { SiTarget } from "react-icons/si";
import { FaUserSlash } from "react-icons/fa";
import AppScreenshot from "@/assets/images/AppScreenshot.jpg";
import { FiDownload, FiUsers } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const DownloadAppSection = () => {
  return (
    <section className="py-24  bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="absolute top-0 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="lg:w-1/2 mb-12 lg:mb-0 z-10">
            <h2 className="heading text-gray-800">
              Elevate Your Experience with Our App
            </h2>
            <p className="description text-gray-600 leading-relaxed">
              Unlock a world of exclusive discounts and seamless bookings right
              from your pocket. Our app brings the power of Pademi to your
              fingertips, making every outing an adventure in savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105 shadow-lg">
                <BsApple className="w-6 h-6 mr-2" />
                <span>Download for iOS</span>
              </button>
              <button className="flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg">
                <BsAndroid className="w-6 h-6 mr-2" />
                <span>Download for Android</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between md:justify-normal text-gray-600">
              <div className="flex items-center space-x-2 p-2 ">
                <AiFillStar className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">4.9</span>
                <span className="text-sm">/ 5 rating</span>
              </div>
              <div className="flex items-center space-x-2 p-2">
                <FiDownload className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">1M+</span>
                <span className="text-sm">downloads</span>
              </div>
              <div className="flex items-center space-x-2 p-2">
                <FiUsers className="w-5 h-5 text-green-500" />
                <span className="font-semibold">100K+</span>
                <span className="text-sm">active users</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative z-10">
            <div className="relative w-72 h-[560px] md:w-80 md:h-[600px]">
              <Image
                src={AppScreenshot}
                alt="Pademi App Screenshot"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 transform -rotate-6 animate-float">
                <SiTarget className="w-6 h-6 text-yellow-500" />
                <p className="text-sm font-semibold mt-1">Best Deals!</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 transform rotate-6 animate-float animation-delay-2000">
                <FaUserSlash className="w-6 h-6 text-blue-500" />
                <p className="text-sm font-semibold mt-1">Group Discounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
