import React from "react";
import { motion } from "framer-motion";
import { Card } from "../../../components/ui/Card";

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  { value: "1,200+", label: "Vehicles Listed", description: "Cars, scooters, and cruisers active" },
  { value: "850+", label: "Verified Owners", description: "Earning passive cash weekly" },
  { value: "₹45,000", label: "Monthly Earnings", description: "Average top owner income" },
  { value: "24,000+", label: "Bookings Completed", description: "Safe rides logged on platform" },
  { value: "18+", label: "Cities covered", description: "Expanding across India monthly" },
  { value: "4.92 ★", label: "Average Rating", description: "Top class satisfaction scores" }
];

export const StatsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-24 -mt-10 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="h-full"
          >
            <Card
              variant="glass"
              className="bg-[#111827]/40 border border-white/5 p-5 rounded-[20px] text-center hover:border-yellow-400/20 hover:bg-[#111827]/60 transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <p className="text-xl md:text-2xl lg:text-3xl font-black text-yellow-400 tracking-tight leading-tight">
                  {stat.value}
                </p>
                <h4 className="text-[10px] font-extrabold text-white uppercase tracking-widest mt-2">
                  {stat.label}
                </h4>
              </div>
              <p className="text-[9px] text-gray-500 font-semibold mt-1">
                {stat.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
