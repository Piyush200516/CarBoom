import React from "react";

// Import local page components
import OwnerHero from "./components/OwnerHero";
import StatsSection from "./components/StatsSection";
import HowItWorksTimeline from "./components/HowItWorksTimeline";
import BenefitsGrid from "./components/BenefitsGrid";
import DashboardPreview from "./components/DashboardPreview";
import IncomeCalculator from "./components/IncomeCalculator";
import SuccessStories from "./components/SuccessStories";
import OwnerFAQ from "./components/OwnerFAQ";
import OwnerCTA from "./components/OwnerCTA";

export const BecomeOwner: React.FC = () => {
  const scrollToTimeline = () => {
    const el = document.getElementById("onboarding-flow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen pb-16 selection:bg-yellow-400 selection:text-black font-sans">
      
      {/* Hero section */}
      <OwnerHero onLearnMoreClick={scrollToTimeline} />

      {/* Numerical statistics counter */}
      <StatsSection />

      {/* Onboarding Steps Timeline */}
      <HowItWorksTimeline />

      {/* Advantages / Benefits grid */}
      <BenefitsGrid />

      {/* Interactive dashboard visual preview */}
      <DashboardPreview />

      {/* Interactive calculator tool */}
      <IncomeCalculator />

      {/* Success story reviews */}
      <SuccessStories />

      {/* Host Accordion FAQs */}
      <OwnerFAQ />

      {/* Call to action bottom panel */}
      <OwnerCTA />

    </div>
  );
};

export default BecomeOwner;
