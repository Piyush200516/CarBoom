// src/components/terms/Eligibility.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, FileSpreadsheet, CreditCard } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface EligibilityItem {
  icon: React.ReactNode;
  title: string;
  badge: string;
  badgeVariant: "primary" | "success" | "warning" | "danger" | "secondary" | "glass" | "outline";
  description: string;
  bullets: string[];
}

export const Eligibility: React.FC = () => {
  const requirements: EligibilityItem[] = [
    {
      icon: <UserCheck className="w-6 h-6 text-yellow-500" />,
      title: "Minimum Age Requirement",
      badge: "Age 21+",
      badgeVariant: "primary",
      description: "Users must satisfy age criteria to register, book, or host a vehicle.",
      bullets: [
        "Must be at least 21 years of age at the time of account creation.",
        "Under 25 renters may incur a youthful driver fee on high-performance cars.",
        "Hosts must be 21+ and hold valid legal ownership documents.",
      ],
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-500" />,
      title: "Valid Driver's License",
      badge: "Permanent Class",
      badgeVariant: "success",
      description: "A clean, valid permanent license is mandatory. Learners' licenses are not accepted.",
      bullets: [
        "A minimum of 1 year of active driving history is required.",
        "Must have zero major active traffic violations on record.",
        "International driving permits (IDPs) are accepted with original passports.",
      ],
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: "KYC & Identity Verification",
      badge: "Real-time Verification",
      badgeVariant: "glass",
      description: "We enforce strict identity matching to protect our peer-to-peer network.",
      bullets: [
        "Government document matching (Aadhaar, Passport, or PAN card).",
        "Biometric live-selfie matching to verify original document holder.",
        "Profile background screening performed within 2-4 hours of sign-up.",
      ],
    },
    {
      icon: <CreditCard className="w-6 h-6 text-purple-500" />,
      title: "Financial Credentials",
      badge: "Identity Match",
      badgeVariant: "warning",
      description: "A valid payment option matching your verification profile is required.",
      bullets: [
        "Linked credit/debit card must display the verified user's legal name.",
        "Prepaid debit cards or virtual single-use cards are not allowed.",
        "Must support standard e-mandate pre-authorizations for deposits.",
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="eligibility" className="py-20 px-6 bg-white dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            01. Access Gate
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Eligibility <span className="text-[#FACC15] text-glow">& Onboarding</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            Before hitting the starter button, make sure you meet the baseline requirements to join the CarBoom peer-to-peer marketplace.
          </p>
        </div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {requirements.map((req, idx) => (
            <Card
              key={idx}
              variant="flat"
              hoverEffect
              className="bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between hover:border-yellow-400/30 dark:hover:border-yellow-400/20 group"
            >
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {req.icon}
                  </div>
                  <Badge variant={req.badgeVariant} className="text-[9px] font-black">
                    {req.badge}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#FACC15] transition-colors">
                    {req.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                    {req.description}
                  </p>
                </div>

                <div className="h-[1px] bg-gray-100 dark:bg-white/5" />

                <ul className="space-y-2.5 pt-1">
                  {req.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Eligibility;
