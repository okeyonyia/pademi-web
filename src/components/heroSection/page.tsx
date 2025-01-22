"use client";

import React from "react";
import PrimaryButton from "../common/primaryButton/page";
import LazyImg from "../common/lazyImage/page";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className=" min-h-[100svh] w-full bg-cover bg-center bg-no-repeat relative flex flex-1 lg:items-start"
      style={{
        backgroundImage: `url(assets/images/heroBG1.webp)`,
        width: "100%",
        height: "100%",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-800/60 via-indigo-600/70 to-indigo-400/70 z-10"></div>

      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-20 flex flex-1 flex-col lg:flex-row justify-center items-center space-y-16">
        <div className="relative z-20 text-center text-white flex-1">
          <h1 className="heading lg:text-start">
            Elevate Your Team Bonding with Pademi
          </h1>
          <p className="description mx-auto lg:text-start">
            Plan company outings, one-on-one chats, and department mixers—no
            more messy group chats or endless email threads.
          </p>

          <PrimaryButton title="Book a Demo" />
        </div>

        <div className="flex-1 z-40 flex justify-center items-center ">
          <LazyImg
            src={"assets/images/hero.webp"}
            alt="hero image"
            title="hero image"
            placeholder={"/"}
            className="rounded-3xl shadow-2xl h-[400px] md:h-[500px] lg:h-[600px] object-contain"
          />
        </div>
      </div>

      <div className=" z-30 absolute bottom-0 w-full">
        <Image
          src={"assets/images/heroBottomWave.svg"}
          alt="wave image"
          style={{ objectFit: "cover" }}
          className="w-full"
          width={500}
          height={300}
        />
      </div>
    </section>
  );
};

export default HeroSection;
