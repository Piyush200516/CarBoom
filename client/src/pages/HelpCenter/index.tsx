// src/pages/HelpCenter/index.tsx

import React from "react";

import { HelpHero } from "../../components/help/HelpHero";
import { HelpCategories } from "../../components/help/HelpCategories";
import { FAQSection } from "../../components/help/FAQSection";
import { SupportChannels } from "../../components/help/SupportChannels";
import { ContactForm } from "../../components/help/ContactForm";
import { SafetyTrust } from "../../components/help/SafetyTrust";
import { Resources } from "../../components/help/Resources";
import { CTASection } from "../../components/help/CTASection";

const HelpCenterPage: React.FC = () => {
  return (
    <>
      <HelpHero />
      <HelpCategories />
      <FAQSection />
      <SupportChannels />
      <ContactForm />
      <SafetyTrust />
      <Resources />
      <CTASection />
    </>
  );
};

export default HelpCenterPage;
