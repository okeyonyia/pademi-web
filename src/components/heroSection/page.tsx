import React from "react";
import heroBG from "@/assets/images/heroBG.jpg";
import heroBottomWave from "@/assets/images/heroBottomWave.svg";
import Image from "next/image";
import PrimaryButton from "../common/primaryButton/page";

const HeroSection = () => {
  return (
    <section
      className=" min-h-[100svh] w-full bg-cover bg-center bg-no-repeat relative lg:flex lg:justify-center lg:items-center"
      style={{
        backgroundImage: `url(${heroBG.src})`,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-800/60 via-indigo-600/70 to-indigo-400/70 z-10"></div>

      <div className="mx-auto px-4 max-w-7xl py-20 lg:flex justify-center items-center">
        <div className="relative z-20 text-center text-white flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 lg:text-start">
            Elevate Your Team Bonding with Pademi
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto lg:text-start">
            Plan company outings, one-on-one chats, and department mixers—no
            more messy group chats or endless email threads.
          </p>

          <PrimaryButton title="Book a Demo" />
        </div>

        {/* TODO:- Hero Image Section Remaining */}
        <div className=" hidden lg:flex flex-1"></div>
      </div>

      <div className=" z-40 absolute bottom-0">
        <Image src={heroBottomWave} alt="wave image"></Image>
      </div>
    </section>
  );
};

export default HeroSection;
