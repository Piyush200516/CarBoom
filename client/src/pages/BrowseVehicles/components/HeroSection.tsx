import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

interface HeroSectionProps {
  onBrowseClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseClick }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0f1d] py-20 px-6">
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          initial={{ scale: 1.15, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        {/* Luxury Vignette Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,193,7,0.06),transparent_50%)]" />
      </div>

      {/* Floating Glowing Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob 1 */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-yellow-400/5 blur-[100px]"
        />
        {/* Blob 2 */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 30, -50, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[120px]"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span>Peer-to-Peer Mobility Redefined</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-[1.1] text-white max-w-4xl"
        >
          Find Your <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-white text-glow">
            Perfect Ride
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-300 text-base sm:text-lg md:text-xl font-medium mt-6 max-w-xl leading-relaxed"
        >
          Browse verified Cars, Bikes and Scooters available near you. Flat prices, certified peer hosts, and zero paperwork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            onClick={onBrowseClick}
            variant="primary"
            className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-widest rounded-[20px] shadow-yellow-glow-hover flex items-center justify-center gap-2 group"
          >
            Browse Now
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </Button>

          <Button
            onClick={() => navigate("/become-owner")}
            variant="outline"
            className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-widest rounded-[20px] hover:bg-white/5 flex items-center justify-center gap-2"
          >
            Become Owner
            <ArrowRight size={16} />
          </Button>
        </motion.div>

        {/* Small Trust Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4 border-t border-white/5 pt-8 w-full max-w-2xl"
        >
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-xl font-black text-white">100%</span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Verified Hosts</span>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-xl font-black text-white">20k+</span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Trips Completed</span>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-xl font-black text-white">4.9 ★</span>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Average Renter Rating</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
