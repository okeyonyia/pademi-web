"use client";

import React from "react";
import NavSection from "../navSection/page";
import HeroSection from "../heroSection/page";
import FeaturesSection from "../featuresSection/page";
import AppSlider from "../appSlider/page";
import DownloadAppSection from "../downloadAppSection/page";
import UseCaseSection from "../useCaseSection/page";
import FinalCtaSection from "../finalCtaSection/page";
import DiscountSection from "../discountSection/page";
import PricingSection from "../pricingSection/page";
import TrustedCompanySection from "../trustedCompanySection/page";
import ContactSection from "../contactSection/page";
import FooterSection from "../footerSection/page";
import WorkingSection from "../workingSection/page";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 relative">
      <NavSection />

      <HeroSection />

      <FeaturesSection />

      <WorkingSection />

      <AppSlider />

      <DownloadAppSection />

      <UseCaseSection />

      <FinalCtaSection />

      <DiscountSection />

      <PricingSection />

      <TrustedCompanySection />

      <ContactSection />

      <FooterSection />
    </div>
  );
};

export default HomePage;
