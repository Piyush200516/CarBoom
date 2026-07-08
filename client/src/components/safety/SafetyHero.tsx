// src/components/safety/SafetyHero.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const SafetyHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#111827] text-white py-20 px-6">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* Floating Shield Icon with Animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="inline-flex items-center justify-center p-5 rounded-3xl bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md shadow-2xl mb-2"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ShieldCheck className="text-yellow-400 w-16 h-16" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20"
          >
            Trust & Protection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none"
          >
            Safety First, <br className="hidden sm:inline" />
            <span className="text-glow text-yellow-400">Every Single Ride</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
        >
          At CarBoom, safety isn’t a feature—it’s our foundation. We use state-of-the-art 
          verification systems, premium insurance partners, and 24/7 assistance to make 
          sure every journey is secure, transparent, and worry-free.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Link to="/browse">
            <Button variant="primary" className="font-extrabold uppercase tracking-wider text-xs px-8 py-3.5 shadow-lg">
              Explore Vehicles
            </Button>
          </Link>
          <a href="#emergency">
            <Button variant="outline" className="font-extrabold uppercase tracking-wider text-xs px-8 py-3.5 flex items-center gap-2">
              Emergency Help
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetyHero;
