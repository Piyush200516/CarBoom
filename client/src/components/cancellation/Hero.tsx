// src/components/cancellation/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#111827] to-white dark:to-gray-950 text-white pt-32 pb-20 px-6">
      {/* Premium background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid layout */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md"
        >
          <ShieldCheck className="text-yellow-400 w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
            Trust & Transparency
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-heading"
        >
          Cancellation <span className="text-[#FACC15] text-glow">Policy</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Learn how cancellations, refunds and booking modifications work on CarBoom.
        </motion.p>

        {/* Horizontal separator bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="h-1 bg-[#FACC15] rounded-full mx-auto"
        />

        {/* Anchors for easy scroll */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center pt-6"
        >
          <a href="#timeline" className="text-xs font-bold bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2 rounded-full transition-all duration-300">
            Refund Timeline
          </a>
          <a href="#refund-process" className="text-xs font-bold bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2 rounded-full transition-all duration-300">
            Refund Process
          </a>
          <a href="#owner-policy" className="text-xs font-bold bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2 rounded-full transition-all duration-300">
            Owner Rules
          </a>
          <a href="#fees-rules" className="text-xs font-bold bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2 rounded-full transition-all duration-300">
            Fees & Fees Rules
          </a>
          <a href="#faqs" className="text-xs font-bold bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2 rounded-full transition-all duration-300">
            FAQs
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
