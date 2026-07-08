// src/components/safety/SafetyTips.tsx
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, User, Key } from "lucide-react";
import { Card } from "../ui/Card";
import { renterTips, ownerTips } from "../../data/safety";

export const SafetyTips: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-4 py-2 rounded-full">
            Best Practices
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Safety Tips for our Community
          </h2>
          <p className="text-gray-500 font-semibold text-xs sm:text-sm">
            Whether you are picking up your rental or listing your primary vehicle, 
            adhering to these guidelines ensures a safe experience for everyone.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Renters Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-yellow-400 text-black rounded-2xl shadow-sm">
                <User size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">For Renters</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Before & during your rental</p>
              </div>
            </div>

            <Card variant="glass-light" className="p-8 border border-white/80 shadow-md rounded-[24px]">
              <ul className="space-y-5">
                {renterTips.map((tip, idx) => (
                  <motion.li
                    key={idx}
                    className="flex gap-4 items-start text-xs sm:text-sm font-semibold text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <div className="mt-0.5 text-yellow-500 shrink-0">
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <span className="leading-relaxed">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Owners Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gray-900 text-yellow-400 rounded-2xl shadow-sm border border-white/5">
                <Key size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">For Owners</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Listing & handover checks</p>
              </div>
            </div>

            <Card variant="glass-light" className="p-8 border border-white/80 shadow-md rounded-[24px]">
              <ul className="space-y-5">
                {ownerTips.map((tip, idx) => (
                  <motion.li
                    key={idx}
                    className="flex gap-4 items-start text-xs sm:text-sm font-semibold text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <div className="mt-0.5 text-yellow-500 shrink-0">
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <span className="leading-relaxed">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SafetyTips;
