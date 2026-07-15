import React from "react";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

interface OwnerHeroProps {
  onLearnMoreClick: () => void;
}

export const OwnerHero: React.FC<OwnerHeroProps> = ({ onLearnMoreClick }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0f1d] py-20 px-6">
      {/* Background graphics */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          initial={{ scale: 1.1, opacity: 0.15 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.05),transparent_50%)]" />
      </div>

      {/* Floating illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            y: [0, -25, 25, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-[10%] w-72 h-72 rounded-[40px] border border-white/5 bg-gradient-to-tr from-yellow-400/5 to-amber-500/5 backdrop-blur-2xl blur-[1px] hidden lg:block"
        >
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] rounded-[40px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <span className="text-[10px] font-black tracking-widest text-yellow-400 uppercase">Estimated Share</span>
            <span className="text-4xl font-black text-white mt-1">85%</span>
            <span className="text-[9px] text-gray-500 font-bold uppercase mt-2">Owner Payout Margin</span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
        <div className="flex-1 space-y-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider"
          >
            <DollarSign size={13} />
            <span>Earn up to ₹45,000 / month passive income</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading leading-[1.1] text-white"
          >
            Turn Your Vehicle <br />
            Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300 text-glow">Passive Income</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed"
          >
            List your vehicle and start earning every month. Control your own rental pricing coordinates, manage calendar blocks, and receive automated payouts with comprehensive insurance safety nets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={() => navigate("/signup")}
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-widest rounded-[20px] shadow-yellow-glow-hover flex items-center justify-center gap-2"
            >
              Register Vehicle <ArrowUpRight size={15} />
            </Button>
            <Button
              onClick={onLearnMoreClick}
              variant="outline"
              className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-widest rounded-[20px] hover:bg-white/5 flex items-center justify-center gap-2"
            >
              Learn More <ArrowDown size={15} />
            </Button>
          </motion.div>
        </div>

        <div className="flex-1 lg:max-w-lg hidden lg:block" />
      </div>
    </div>
  );
};

export default OwnerHero;
