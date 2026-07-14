// src/components/terms/Financials.tsx
import React from "react";
import { IndianRupee, ShieldAlert, CreditCard, CheckCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface FinancialSection {
  title: string;
  badge: string;
  badgeVariant: "primary" | "success" | "warning" | "danger" | "secondary" | "glass" | "outline";
  icon: React.ReactNode;
  intro: string;
  points: { label: string; desc: string }[];
}

export const Financials: React.FC = () => {
  const financialData: FinancialSection[] = [
    {
      title: "Payments & Fees",
      badge: "Secure Gateways",
      badgeVariant: "success",
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      intro: "All monetary transactions on CarBoom are encrypted and processed through PCI-DSS compliant gateways.",
      points: [
        {
          label: "Immediate Debit",
          desc: "Full booking amount is charged immediately upon trip confirmation by the owner.",
        },
        {
          label: "Pricing Breakdown",
          desc: "Quotes comprise the owner's vehicle base rate, CarBoom platform services fee, and applicable GST/taxes.",
        },
        {
          label: "Tolls & Traffic Fines",
          desc: "FASTag toll logs and traffic violation receipts received during the rental are billed directly to the renter.",
        },
      ],
    },
    {
      title: "Security Deposit",
      badge: "Refundable",
      badgeVariant: "primary",
      icon: <IndianRupee className="w-5 h-5 text-yellow-500" />,
      intro: "A pre-authorization hold is placed on your card prior to trip departure to cover minor incidental fees.",
      points: [
        {
          label: "Release Window",
          desc: "Blocks are released automatically within 24 to 48 hours of a damage-free vehicle checkout confirmation.",
        },
        {
          label: "Incidental Deductions",
          desc: "Outstanding tolls, minor fuel shortfalls, or late returns will be deducted directly from this deposit.",
        },
        {
          label: "Bank Timeline",
          desc: "While released instantly by CarBoom, credit card holds may take 3 to 7 business days to clear on bank statements.",
        },
      ],
    },
    {
      title: "Damage & Liability Policy",
      badge: "Liability Protection",
      badgeVariant: "warning",
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      intro: "CarBoom provides comprehensive insurance. Your maximum accidental liability is capped under strict rules.",
      points: [
        {
          label: "₹10,000 Liability Cap",
          desc: "If all terms are met, your maximum out-of-pocket cost for accidental damage is capped at ₹10,000.",
        },
        {
          label: "Violation Exclusion",
          desc: "Accident protection is voided 100% if damage occurs while speeding, off-roading, or driving impaired.",
        },
        {
          label: "Loss of Use Fee",
          desc: "Renters may be charged for a host's lost revenue during repair days (capped at 7 days of base booking rate).",
        },
      ],
    },
  ];

  return (
    <section id="financials" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            04. Financial Framework
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Payments, Deposits <span className="text-[#FACC15] text-glow">& Damages</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            Transparent pricing and protected deposits. Learn how payments are processed, when deposits are released, and how we handle damage claims.
          </p>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {financialData.map((section, idx) => (
            <Card
              key={idx}
              variant="default"
              className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between hover:border-yellow-400/30 transition-all text-left shadow-sm"
            >
              <div className="space-y-6">
                {/* Title block */}
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    {section.icon}
                  </div>
                  <Badge variant={section.badgeVariant} className="text-[9px] font-black tracking-wider">
                    {section.badge}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 leading-relaxed">
                    {section.intro}
                  </p>
                </div>

                <div className="h-[1.5px] bg-gradient-to-r from-gray-100 via-gray-50 dark:from-white/5 dark:via-white/0 to-transparent" />

                {/* Bullet details */}
                <div className="space-y-5">
                  {section.points.map((pt, pIdx) => (
                    <div key={pIdx} className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#FACC15]" />
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                          {pt.label}
                        </h4>
                      </div>
                      <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-relaxed pl-6">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Financials;
