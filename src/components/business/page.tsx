"use client";

import React from "react";
import HeroSection from "./heroSection/page";
import FeaturesSection from "./featuresSection/page";
import DownloadAppSection from "./downloadAppSection/page";
import UseCaseSection from "./useCaseSection/page";
import FinalCtaSection from "../finalCtaSection/page";
import DiscountSection from "./discountSection/page";
import TrustedCompanySection from "./trustedCompanySection/page";
import WorkingSection from "./workingSection/page";
import DefaultLayout from "../layout/page";
import sendEmail from "@/utils/contact";

const BusinessPage = () => {
  return (
    <DefaultLayout>
      <>
        <HeroSection
          heading="Elevate Your Team Bonding with Pademi"
          description="Plan company outings, one-on-one chats, and department mixers—no more messy group chats or endless email threads."
          bgImgUrl="assets/images/heroBG1.webp"
          imageUrl="assets/images/hero.webp"
          buttonText="Book a Demo"
        />

        <FeaturesSection />

        <WorkingSection />

        {/* <AppSlider /> */}

        <DownloadAppSection />

        <UseCaseSection />

        <FinalCtaSection
          heading="Ready to Supercharge Team Spirit?"
          description="Let Pademi handle your next team event—so you can focus on building stronger, happier employees."
          buttonText="Contact Us"
          buttonHandler={sendEmail}
        />

        <DiscountSection />

        {/* <PricingSection /> */}

        {/* <TrustedCompanySection /> */}

        {/* <ContactSection /> */}
      </>
    </DefaultLayout>
  );
};

export default BusinessPage;
