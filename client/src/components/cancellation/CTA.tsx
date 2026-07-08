// src/components/cancellation/CTA.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Car, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export const CTA: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-950 text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Decorative background glow elements */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-yellow-400/10 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-yellow-500/10 rounded-full filter blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Still Need <span className="text-[#FACC15] text-glow">Help?</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
              If you have questions about an active refund dispute, exceptional extenuating circumstances, or need manual assistance with your booking, our team is available 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  className="w-full font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  Contact Support
                </Button>
              </Link>
              <Link to="/browse" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full font-extrabold uppercase tracking-wider text-xs text-white border-white/20 hover:border-yellow-400 flex items-center justify-center gap-2"
                >
                  <Car size={16} />
                  Browse Vehicles
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
