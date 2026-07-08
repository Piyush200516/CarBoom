// src/components/terms/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { Scale, Calendar, Search } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery }) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset for sticky navigation
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#F8FAFC] dark:to-gray-950 text-white pt-32 pb-20 px-6">
      {/* Glow decorations */}
      <div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-15%] w-[550px] h-[550px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md"
        >
          <Scale className="text-[#FACC15] w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FACC15]">
            Terms & Rules of the Road
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-heading"
        >
          Terms <span className="text-[#FACC15] text-glow">& Conditions</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold"
        >
          Welcome to CarBoom. These Terms form a binding agreement between you and our peer-to-peer vehicle rental network. Let's make every journey safe, transparent, and smooth.
        </motion.p>

        {/* Date stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
        >
          <Calendar className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>Last Updated: July 8, 2026</span>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="h-1 bg-[#FACC15] rounded-full mx-auto"
        />

        {/* Search Input Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="max-w-md mx-auto relative pt-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search policies (e.g. deposit, cancellation, age)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-[#FACC15] text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#FACC15]"
            />
          </div>
        </motion.div>

        {/* Navigation Anchors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-wrap gap-2.5 justify-center pt-8"
        >
          {[
            { id: "eligibility", label: "Eligibility" },
            { id: "responsibilities", label: "Responsibilities" },
            { id: "booking", label: "Booking Rules" },
            { id: "financials", label: "Payments & Deposit" },
            { id: "cancellation", label: "Cancellation" },
            { id: "prohibited", label: "Prohibited Acts" },
            { id: "suspension", label: "Suspension" },
            { id: "legal", label: "Liability & Law" },
            { id: "contact", label: "Contact Us" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleAnchorClick(e, item.id)}
              className="text-[11px] font-black tracking-wider uppercase bg-white/5 hover:bg-[#FACC15] hover:text-black border border-white/10 hover:border-transparent text-gray-300 px-4 py-2.5 rounded-full transition-all duration-300"
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
