"use client";

import HeroSection from "@/components/heroSection/page";
import FeaturesSection from "@/components/featuresSection/page";
import WorkingSection from "@/components/workingSection/page";
import UseCaseSection from "@/components/useCaseSection/page";
import DiscountSection from "@/components/discountSection/page";
import PricingSection from "@/components/pricingSection/page";
import FinalCtaSection from "@/components/finalCtaSection/page";
import FooterSection from "@/components/footerSection/page";
import NavSection from "@/components/navSection/page";
import DownloadAppSection from "@/components/downloadAppSection/page";

export default function PademiForTeams() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 relative">
      <NavSection />

      <HeroSection />

      <FeaturesSection />

      <WorkingSection />

      <UseCaseSection />

      <DiscountSection />

      <DownloadAppSection />

      <PricingSection />

      <FinalCtaSection />

      <FooterSection />
    </div>
  );
}
