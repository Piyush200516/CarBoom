// src/components/cancellation/PolicyTimeline.tsx
import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertTriangle, AlertOctagon, Ban } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface TimelineTier {
  timeframe: string;
  refundPercentage: number;
  status: string;
  badgeVariant: "success" | "warning" | "danger";
  description: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  details: string[];
}

export const PolicyTimeline: React.FC = () => {
  const tiers: TimelineTier[] = [
    {
      timeframe: "More than 48 Hours",
      refundPercentage: 100,
      status: "Full Refund",
      badgeVariant: "success",
      description: "Cancel your trip at least 2 days prior to start time for a complete, hassle-free refund.",
      icon: CheckCircle2,
      colorClass: "emerald",
      details: [
        "100% refund of the booking amount",
        "No cancellation fee or administrative charge",
        "Includes refund of all addon service fees",
        "Security deposits fully released immediately",
      ],
    },
    {
      timeframe: "24 to 48 Hours",
      refundPercentage: 75,
      status: "Partial Refund",
      badgeVariant: "warning",
      description: "Cancel between 1 and 2 days before the trip. A small retention fee helps support owners.",
      icon: AlertTriangle,
      colorClass: "amber",
      details: [
        "75% refund of the total booking fee",
        "25% retained as host compensation",
        "Security deposits released 100% immediately",
        "Eligible for immediate reschedule request",
      ],
    },
    {
      timeframe: "12 to 24 Hours",
      refundPercentage: 50,
      status: "Half Refund",
      badgeVariant: "warning",
      description: "Last-minute plans changed? Get back half your booking amount to cover the unexpected.",
      icon: AlertOctagon,
      colorClass: "orange",
      details: [
        "50% refund of the total booking fee",
        "50% retained for block-booking protection",
        "Security deposits released 100% immediately",
        "Extension requests take priority over cancellations",
      ],
    },
    {
      timeframe: "Less than 12 Hours",
      refundPercentage: 0,
      status: "No Refund",
      badgeVariant: "danger",
      description: "Cancellations made within 12 hours of trip start time or no-shows are non-refundable.",
      icon: Ban,
      colorClass: "red",
      details: [
        "0% refund of the booking fee",
        "Host is compensated 100% of their share",
        "Security deposit is still fully refunded (100%)",
        "Contact support for critical medical or vehicle break-down exemptions",
      ],
    },
  ];

  // Helper mapping to avoid dynamic class warning in Tailwind
  const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      glow: "hover:shadow-emerald-500/5",
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/40",
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      glow: "hover:shadow-amber-500/5",
    },
    orange: {
      border: "border-orange-500/20 hover:border-orange-500/40",
      bg: "bg-orange-500/10",
      text: "text-orange-600 dark:text-orange-400",
      glow: "hover:shadow-orange-500/5",
    },
    red: {
      border: "border-red-500/20 hover:border-red-500/40",
      bg: "bg-red-500/10",
      text: "text-red-600 dark:text-red-400",
      glow: "hover:shadow-red-500/5",
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  return (
    <section id="timeline" className="py-24 bg-white dark:bg-gray-950 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            Timeline Breakdown
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Renter Refund <span className="text-[#FACC15] text-glow">Timeline</span>
          </h2>
          <p className="text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400">
            How much refund you get depends on how far in advance you cancel. Choose your timing carefully to maximize your refund.
          </p>
        </div>

        {/* Timeline Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            const colors = colorMap[tier.colorClass] || colorMap.emerald;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="h-full relative group"
              >
                {/* Horizontal flow line for desktops */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[68px] left-[calc(50%+45px)] right-[calc(-50%+45px)] h-0.5 bg-gradient-to-r from-gray-200 to-transparent dark:from-white/10 dark:to-transparent group-hover:from-yellow-400 transition-all duration-500" />
                )}

                <Card
                  variant="default"
                  className={`bg-gray-50/50 dark:bg-white/5 border ${colors.border} rounded-[28px] p-6 flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300 ${colors.glow}`}
                >
                  <div className="space-y-6">
                    {/* Timeframe & Percentage Row */}
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center shrink-0`}>
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <div className="text-right">
                        <span className={`text-3xl font-black ${colors.text}`}>
                          {tier.refundPercentage}%
                        </span>
                        <span className="block text-[8px] font-black uppercase text-gray-400 tracking-wider">
                          Refund
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2">
                        <Badge variant={tier.badgeVariant} className="text-[8px] font-black">
                          {tier.status}
                        </Badge>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <Clock size={10} /> {tier.timeframe}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    {/* Bullet details */}
                    <ul className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-white/5">
                      {tier.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="flex items-start gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-300 text-left">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-current ${colors.text}`} />
                          <span className="leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PolicyTimeline;
