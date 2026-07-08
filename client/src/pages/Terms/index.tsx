// src/pages/Terms/index.tsx
import React, { useEffect, useState } from "react";
import Hero from "../../components/terms/Hero";
import Eligibility from "../../components/terms/Eligibility";
import Responsibilities from "../../components/terms/Responsibilities";
import BookingRules from "../../components/terms/BookingRules";
import Financials from "../../components/terms/Financials";
import CancellationTimeline from "../../components/terms/CancellationTimeline";
import ProhibitedActivities from "../../components/terms/ProhibitedActivities";
import AccountSuspension from "../../components/terms/AccountSuspension";
import LegalContact from "../../components/terms/LegalContact";
import { SearchX, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../components/ui/Badge";

interface SectionConfig {
  id: string;
  name: string;
  keywords: string[];
  component: React.ReactNode;
}

export const TermsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections: SectionConfig[] = [
    {
      id: "eligibility",
      name: "Eligibility & Onboarding",
      keywords: ["age", "eligibility", "license", "kyc", "identity", "verification", "payment", "card", "requirement", "verify"],
      component: <Eligibility />,
    },
    {
      id: "responsibilities",
      name: "Responsibilities (Renter & Owner)",
      keywords: ["renter", "owner", "host", "guest", "responsibility", "inspections", "photos", "safe", "driving", "cleanliness", "fuel", "keys"],
      component: <Responsibilities />,
    },
    {
      id: "booking",
      name: "Booking & Extension Rules",
      keywords: ["booking", "extension", "duration", "hours", "lead time", "handover", "late return", "delay", "buffer"],
      component: <BookingRules />,
    },
    {
      id: "financials",
      name: "Payments, Deposits & Damages",
      keywords: ["payments", "fees", "deposit", "security deposit", "damage", "liability", "insurance", "taxes", "gst", "deductible", "loss of use"],
      component: <Financials />,
    },
    {
      id: "cancellation",
      name: "Cancellation & Refunds",
      keywords: ["cancellation", "cancel", "refund", "timeline", "forfeit", "compensation", "flexible"],
      component: <CancellationTimeline />,
    },
    {
      id: "prohibited",
      name: "Prohibited Activities & Penalties",
      keywords: ["prohibited", "activities", "speeding", "off-road", "taxi", "commercial", "smoking", "pet", "unauthorized driver", "telemetry", "tampering", "gps", "fine", "penalty"],
      component: <ProhibitedActivities />,
    },
    {
      id: "suspension",
      name: "Account Suspension Escalation",
      keywords: ["suspension", "ban", "escalation", "warning", "lock", "termination", "blacklist"],
      component: <AccountSuspension />,
    },
    {
      id: "legal",
      name: "Legal Liability & Governing Law",
      keywords: ["legal", "liability", "governing law", "jurisdiction", "court", "arbitration", "resolution", "dispute", "contact", "support", "email"],
      component: <LegalContact />,
    },
  ];

  // Filter sections by search query
  const query = searchQuery.trim().toLowerCase();
  const filteredSections = query
    ? sections.filter(
        (sec) =>
          sec.name.toLowerCase().includes(query) ||
          sec.keywords.some((kw) => kw.includes(query))
      )
    : sections;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Hero section with search state passing */}
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filter Info Banner */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-yellow-400/10 border-y border-yellow-400/20 py-4 px-6 relative z-20 text-center"
          >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#FACC15] animate-pulse" />
                <span>
                  Filtering terms by: <span className="text-[#FACC15] font-black underline">"{searchQuery}"</span>
                </span>
                <Badge variant="glass" className="text-[10px] font-black bg-yellow-400/15 text-[#FACC15] border-0">
                  {filteredSections.length} {filteredSections.length === 1 ? "Section" : "Sections"} Matches
                </Badge>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[10px] font-black uppercase tracking-wider text-yellow-600 dark:text-yellow-400 hover:underline cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Content */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredSections.length > 0 ? (
            filteredSections.map((sec) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                transition={{ duration: 0.3 }}
              >
                {sec.component}
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-32 px-6 text-center space-y-6 max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto border border-red-500/20">
                <SearchX size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  No Matching Terms Found
                </h3>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                  We couldn't find any guidelines or conditions matching your search for <span className="font-extrabold text-gray-800 dark:text-gray-200">"{searchQuery}"</span>.
                </p>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center justify-center font-black uppercase tracking-wider text-xs px-6 py-3 bg-[#FACC15] hover:bg-yellow-500 text-black rounded-xl shadow-sm transition cursor-pointer"
              >
                Clear Search & View All
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TermsPage;
