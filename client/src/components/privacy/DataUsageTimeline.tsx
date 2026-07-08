// src/components/privacy/DataUsageTimeline.tsx
import React from "react";
import { motion } from "framer-motion";
import { UserCheck, ShieldAlert, Key, Zap, CheckCircle2 } from "lucide-react";

interface TimelineItemProps {
  step: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
  delay: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  step,
  icon,
  title,
  subtitle,
  bullets,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col md:flex-row md:items-start gap-8 md:gap-12 group pb-16 last:pb-0"
    >
      {/* Connector Line and Node for desktop */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800 group-last:hidden transform md:-translate-x-1/2" />
      
      {/* Node Bullet */}
      <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-gray-950 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 flex items-center justify-center transform -translate-x-1/2 z-10 transition-all duration-300 group-hover:bg-[#FACC15] group-hover:text-black group-hover:border-yellow-400/20 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]">
        {icon}
      </div>

      {/* Left side card (only for odd numbers in desk layout) */}
      <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right flex flex-col items-start md:items-end order-2 md:order-1 md:group-even:order-3 md:group-even:text-left md:group-even:pl-12 md:group-even:pr-0">
        <span className="text-[10px] font-black text-[#FACC15] uppercase tracking-widest mb-1.5 px-2 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/20">
          Stage {step}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FACC15] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-md">
          {subtitle}
        </p>
      </div>

      {/* Right side bullet points card */}
      <div className="w-full md:w-1/2 pl-12 md:pl-12 order-3 md:order-2 md:group-even:order-1 md:group-even:text-right md:group-even:pl-0 md:group-even:pr-12">
        <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 p-5 md:p-6 rounded-2xl shadow-sm hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300">
          <ul className="space-y-3">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300 text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export const DataUsageTimeline: React.FC = () => {
  return (
    <section id="usage" className="py-24 px-6 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative vertical background divider */}
      <div className="absolute top-0 bottom-0 left-12 md:left-1/2 w-[1px] bg-gradient-to-b from-gray-100 via-gray-200 dark:via-gray-800 to-gray-100 dark:to-gray-950 transform md:-translate-x-1/2 pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 text-xs font-black uppercase tracking-wider">
          Data Lifecycle
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          How We Use Data
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          We transform raw data parameters into a reliable vehicle experience. Each piece of information follows a highly regulated cycle of usage.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <TimelineItem
          step="01"
          icon={<UserCheck className="w-5 h-5" />}
          title="Identity Verification & Onboarding"
          subtitle="Verifying profiles to unlock CarBoom rentals safely"
          bullets={[
            "Processing your driver's credentials to confirm valid status.",
            "Screening for local vehicle insurance requirements automatically.",
            "Validating payment credentials to limit bad actors and credit defaults.",
          ]}
          delay={0.1}
        />

        <TimelineItem
          step="02"
          icon={<Key className="w-5 h-5" />}
          title="Booking matching & Rental Execution"
          subtitle="Facilitating peer-to-peer vehicle assignments"
          bullets={[
            "Providing your name and license validation confirmation to vehicle owners.",
            "Showing vehicle pickup locations on the interactive mapping interface.",
            "Facilitating anonymous messaging triggers inside the CarBoom application.",
          ]}
          delay={0.2}
        />

        <TimelineItem
          step="03"
          icon={<ShieldAlert className="w-5 h-5" />}
          title="Ride Safety, Insurance & Telematics"
          subtitle="Proactively protecting hosts, guests, and assets"
          bullets={[
            "Tracking vehicle location parameters in case of stolen reports or breakdowns.",
            "Sharing GPS logs with insurance carriers solely to resolve damage claims.",
            "Analyzing speed and harsh braking reports to enforce fair-use rules.",
          ]}
          delay={0.3}
        />

        <TimelineItem
          step="04"
          icon={<Zap className="w-5 h-5" />}
          title="AI Optimizations & Platform Updates"
          subtitle="Refining pricing algorithms and matching systems"
          bullets={[
            "Using historical booking details to feed dynamic rental price tools.",
            "Personalizing search feeds to showcase vehicles matching your query habits.",
            "Sending critical security warnings, push notifications, and invoice emails.",
          ]}
          delay={0.4}
        />
      </div>
    </section>
  );
};

export default DataUsageTimeline;
