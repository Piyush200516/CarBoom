// src/components/privacy/InformationWeCollect.tsx
import React from "react";
import { motion } from "framer-motion";
import { User, FileBadge, MapPin, CreditCard, Shield } from "lucide-react";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  sensitivity: "Low" | "Medium" | "High" | "Critical";
  items: { label: string; details: string }[];
  accentColor: string;
  glowColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  category,
  sensitivity,
  items,
  accentColor,
  glowColor,
}) => {
  const getSensitivityStyles = (lvl: string) => {
    switch (lvl) {
      case "Low":
        return { bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", width: "w-1/4", color: "bg-emerald-500" };
      case "Medium":
        return { bg: "bg-blue-500/10 text-blue-500 border-blue-500/20", width: "w-2/4", color: "bg-blue-500" };
      case "High":
        return { bg: "bg-amber-500/10 text-amber-500 border-amber-500/20", width: "w-3/4", color: "bg-amber-500" };
      case "Critical":
      default:
        return { bg: "bg-rose-500/10 text-rose-500 border-rose-500/20", width: "w-full", color: "bg-rose-500" };
    }
  };

  const senseStyle = getSensitivityStyles(sensitivity);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 md:p-8 backdrop-blur-xl shadow-xl dark:shadow-2xl/10 group`}
    >
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${glowColor}`} />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-white ${accentColor} transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[10px] font-black tracking-wider uppercase text-gray-400 dark:text-gray-500">
            {category}
          </span>
          <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${senseStyle.bg}`}>
            {sensitivity} Protection
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#FACC15] transition-colors duration-300">
        {title}
      </h3>

      {/* Structured Items */}
      <div className="space-y-3.5 mb-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-800/50 last:border-0"
          >
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 text-left sm:text-right">
              {item.details}
            </span>
          </div>
        ))}
      </div>

      {/* Protection Meter */}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/80">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#FACC15]" />
            Security Guard Status
          </span>
          <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">
            AES-256 Active
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 group-hover:brightness-110 ${senseStyle.width} ${senseStyle.color}`} />
        </div>
      </div>
    </motion.div>
  );
};

export const InformationWeCollect: React.FC = () => {
  return (
    <section id="collect" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 text-xs font-black uppercase tracking-wider">
          Data Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Information We Collect
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          We collect your information to build a seamless peer-to-peer car sharing ecosystem. Here is precisely what we acquire and how sensitive we treat it.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <InfoCard
          icon={<User className="w-6 h-6" />}
          title="Account & Identity Data"
          category="User Credentials"
          sensitivity="High"
          accentColor="group-hover:text-yellow-500 group-hover:border-yellow-500/20 group-hover:bg-yellow-500/5"
          glowColor="bg-yellow-500"
          items={[
            { label: "Full Legal Name", details: "For booking contracts & insurance validation" },
            { label: "Contact Details", details: "Verified email address & mobile telephone number" },
            { label: "Profile Picture", details: "Optional, used for renter-owner identity safety" },
            { label: "Authentication Details", details: "Hashed & salted passwords or OAuth tokens" },
          ]}
        />

        <InfoCard
          icon={<FileBadge className="w-6 h-6" />}
          title="Verification Documents"
          category="Trust & Safety"
          sensitivity="Critical"
          accentColor="group-hover:text-rose-500 group-hover:border-rose-500/20 group-hover:bg-rose-500/5"
          glowColor="bg-rose-500"
          items={[
            { label: "Driver's License", details: "Validated number, expiration date, photo copy" },
            { label: "Background Auditing", details: "Driving record history where legally required" },
            { label: "National Identifier", details: "Encrypted SSN/Tax ID (only if required by host state)" },
            { label: "Verification Status", details: "Real-time KYC confirmation token via partner API" },
          ]}
        />

        <InfoCard
          icon={<MapPin className="w-6 h-6" />}
          title="Location & Telematics"
          category="Realtime Tracking"
          sensitivity="High"
          accentColor="group-hover:text-blue-500 group-hover:border-blue-500/20 group-hover:bg-blue-500/5"
          glowColor="bg-blue-500"
          items={[
            { label: "GPS Coordinates", details: "Car coordinates captured during active rental periods" },
            { label: "Driving Telematics", details: "Vehicle speed logs, mileage logs, acceleration rates" },
            { label: "App Location Access", details: "Mobile location (if permitted) for finding nearby cars" },
            { label: "Trip Analytics", details: "Total duration, route milestones, and fuel/battery logs" },
          ]}
        />

        <InfoCard
          icon={<CreditCard className="w-6 h-6" />}
          title="Financial & Payments"
          category="Escrow Processing"
          sensitivity="Critical"
          accentColor="group-hover:text-emerald-500 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5"
          glowColor="bg-emerald-500"
          items={[
            { label: "Billing Credentials", details: "Encrypted billing zip code and verified identity tags" },
            { label: "Payment Tokens", details: "Secure payment gateway reference ID (Stripe standard)" },
            { label: "Payout Accounts", details: "Bank account routing/IBAN numbers for owner payout" },
            { label: "Transaction Logs", details: "Historical rental fees, damage claims, and refund ledgers" },
          ]}
        />
      </div>
    </section>
  );
};

export default InformationWeCollect;
