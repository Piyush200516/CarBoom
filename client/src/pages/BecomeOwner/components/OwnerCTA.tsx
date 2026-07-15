import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const OwnerCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-5xl mx-auto px-6 mb-16">
      <Card
        variant="glass"
        className="bg-gradient-to-r from-yellow-400/10 via-[#0f172a] to-blue-500/10 border border-white/10 rounded-[28px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-full filter blur-[55px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-heading text-white leading-tight">
            Ready to Start Earning?
          </h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto font-medium leading-relaxed">
            Register your vehicle in under 3 minutes, set pricing coordinates, and collect earnings automatically.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              onClick={() => navigate("/signup")}
              variant="primary"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl shadow-yellow-glow-hover flex items-center justify-center gap-1.5"
            >
              Register Vehicle <ArrowUpRight size={13} />
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest rounded-xl hover:bg-white/5 flex items-center justify-center gap-1.5"
            >
              Contact Support <HelpCircle size={13} />
            </Button>
          </div>
        </motion.div>
      </Card>
    </section>
  );
};

export default OwnerCTA;
