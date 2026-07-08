// src/components/privacy/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Lock } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#111827] to-white dark:to-gray-950 text-white pt-32 pb-20 px-6">
      {/* Background decorations */}
      <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-15%] w-[550px] h-[550px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md"
        >
          <Lock className="text-[#FACC15] w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FACC15]">
            GDPR & CCPA COMPLIANT
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-heading"
        >
          Privacy <span className="text-[#FACC15] text-glow">& Data</span> Protection
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
        >
          At CarBoom, trust is our primary acceleration vector. We design every feature with security in mind, giving you full control over your personal data.
        </motion.p>

        {/* Last Updated badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
        >
          <Calendar className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>Last Updated: July 8, 2026</span>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="h-1 bg-[#FACC15] rounded-full mx-auto"
        />

        {/* Fast Anchors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap gap-2.5 justify-center pt-6"
        >
          {[
            { id: "collect", label: "Information We Collect" },
            { id: "usage", label: "How We Use Data" },
            { id: "cookies", label: "Cookies & Rights" },
            { id: "sharing", label: "Security & Partners" },
            { id: "retention", label: "Retention & Age" },
            { id: "contact", label: "Contact & Request Form" }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-bold bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2.5 rounded-full transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
