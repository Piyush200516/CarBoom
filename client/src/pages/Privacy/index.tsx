// src/pages/Privacy/index.tsx
import React, { useEffect } from "react";
import Hero from "../../components/privacy/Hero";
import InformationWeCollect from "../../components/privacy/InformationWeCollect";
import DataUsageTimeline from "../../components/privacy/DataUsageTimeline";
import CookiesAndRights from "../../components/privacy/CookiesAndRights";
import SecurityAndSharing from "../../components/privacy/SecurityAndSharing";
import RetentionAndChildren from "../../components/privacy/RetentionAndChildren";
import PrivacyContact from "../../components/privacy/PrivacyContact";

export const PrivacyPage: React.FC = () => {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Hero />
      <InformationWeCollect />
      <DataUsageTimeline />
      <CookiesAndRights />
      <SecurityAndSharing />
      <RetentionAndChildren />
      <PrivacyContact />
    </div>
  );
};

export default PrivacyPage;
