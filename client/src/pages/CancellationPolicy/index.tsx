// src/pages/CancellationPolicy/index.tsx
import React, { useEffect } from "react";
import Hero from "../../components/cancellation/Hero";
import PolicyTimeline from "../../components/cancellation/PolicyTimeline";
import RefundCards from "../../components/cancellation/RefundCards";
import FAQ from "../../components/cancellation/FAQ";
import CTA from "../../components/cancellation/CTA";

export const CancellationPolicyPage: React.FC = () => {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Hero />
      <PolicyTimeline />
      <RefundCards />
      <FAQ />
      <CTA />
    </div>
  );
};

export default CancellationPolicyPage;
