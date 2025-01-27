"use client";

import React from "react";
import DefaultLayout from "../layout/page";
import HeroSection from "../business/heroSection/page";
import FinalCtaSection from "../finalCtaSection/page";
import sendEmail from "@/utils/contact";
import TestimonialSlider from "../testimonials/page";
import FeaturesSection from "./featuresSection/page";
import HowItWorks from "./workingSection/page";
import AppSlider from "./appSlider/page";
import AboutFoundersSection from "./aboutFounders/page";

const HomePage = () => {
  return (
    <DefaultLayout>
      <>
        <HeroSection
          heading="Where experiences bring us together—no endless texting, just real connections."
          description="Discover events, plan 1-on-1 hangouts, let friends match you with someone new—and even link your IG so they can invite you right from your bio."
          bgImgUrl="assets/images/BusinessBG.webp"
          imageUrl="assets/images/hero.webp"
          buttonText="Join the Waitlist on Pademi"
        />

        <FeaturesSection />

        <HowItWorks />

        <AppSlider />

        <AboutFoundersSection />

        <TestimonialSlider />

        <FinalCtaSection
          heading="Ready to trade endless texting for real-life meetups?"
          description="Join our waitlist at Pademi.event to get first access—where friends can match you, events are at your fingertips, and your social media bio link ensures you're always in the loop."
          buttonText="Join the Waitlist on Pademi"
          buttonHandler={sendEmail}
        />
      </>
    </DefaultLayout>
  );
};

export default HomePage;
