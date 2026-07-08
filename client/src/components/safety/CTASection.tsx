// src/components/safety/CTASection.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#111827] text-white overflow-hidden relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <Card variant="dark" className="bg-white/5 border border-white/10 backdrop-blur-md p-10 md:p-16 rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center space-y-8">
            {/* Glowing Icon */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400"
            >
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </motion.div>

            {/* Texts */}
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Your Safety is Our <br />
                <span className="text-yellow-400 text-glow">Number One Priority</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold leading-relaxed">
                Experience hassle-free peer-to-peer vehicle rentals in your town. Get fully verified 
                and unlock premium listings today.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm pt-2">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto font-extrabold uppercase tracking-wider text-xs px-8 py-3.5 flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={14} />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto font-extrabold uppercase tracking-wider text-xs px-8 py-3.5 border-white/10 text-white hover:border-yellow-400 hover:text-yellow-400">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
