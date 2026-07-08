// src/pages/Safety/index.tsx
import React from "react";
import { SafetyHero } from "../../components/safety/SafetyHero";
import { SafetyFeatures } from "../../components/safety/SafetyFeatures";
import { SafetyTips } from "../../components/safety/SafetyTips";
import { EmergencySupport } from "../../components/safety/EmergencySupport";
import { SafetyFAQ } from "../../components/safety/SafetyFAQ";
import { CTASection } from "../../components/safety/CTASection";

export const SafetyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <SafetyHero />
      <SafetyFeatures />
      <SafetyTips />
      <EmergencySupport />
      <SafetyFAQ />
      <CTASection />
    </div>
  );
};

export default SafetyPage;
