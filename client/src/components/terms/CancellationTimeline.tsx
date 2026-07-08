// src/components/terms/CancellationTimeline.tsx
import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CalendarRange, CalendarX, ShieldCheck, HelpCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface TimelineNode {
  timeframe: string;
  refundPercent: string;
  refundColor: string;
  icon: React.ReactNode;
  title: string;
  details: string[];
}

export const CancellationTimeline: React.FC = () => {
  const timelineNodes: TimelineNode[] = [
    {
      timeframe: "Before 24 Hours",
      refundPercent: "100% Refund",
      refundColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      icon: <CalendarCheck className="w-5 h-5 text-emerald-500" />,
      title: "Flexible Window Cancellation",
      details: [
        "Full booking fee returned directly to your payment source.",
        "Zero cancellation charges apply.",
        "Security deposit released immediately.",
      ],
    },
    {
      timeframe: "12 to 24 Hours",
      refundPercent: "50% Refund",
      refundColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      icon: <CalendarRange className="w-5 h-5 text-amber-500" />,
      title: "Late Notice Cancellation",
      details: [
        "50% of the booking base rate is withheld as owner compensation.",
        "CarBoom platform fees are non-refundable in this window.",
        "100% of the security deposit is refunded.",
      ],
    },
    {
      timeframe: "Under 12 Hours",
      refundPercent: "No Refund",
      refundColor: "text-red-500 bg-red-500/10 border-red-500/20",
      icon: <CalendarX className="w-5 h-5 text-red-500" />,
      title: "Last Minute Cancellation",
      details: [
        "100% of the booking fee is forfeited to cover owner reservation loss.",
        "100% of the security deposit is released back to the renter.",
        "Repeated under-12h cancellations may lead to profile review.",
      ],
    },
  ];

  return (
    <section id="cancellation" className="py-20 px-6 bg-white dark:bg-gray-950 scroll-mt-20 relative overflow-hidden">
      {/* Background timeline connecting line (desktop only) */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-100 dark:bg-gray-800 transform -translate-x-1/2 pointer-events-none hidden md:block mt-48 mb-24" />

      <div className="max-w-5xl mx-auto space-y-16 relative">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            05. Cancellation Framework
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Cancellation <span className="text-[#FACC15] text-glow">& Refunds</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            Plans change, we get it. Our structured cancellation timeline outlines exactly how much of your booking fee is refunded depending on when you cancel.
          </p>
        </div>

        {/* Vertical Timeline Nodes */}
        <div className="space-y-12 md:space-y-0 md:pt-10">
          {timelineNodes.map((node, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0 group md:pb-24 last:pb-0"
              >
                {/* Node Dot for desktop */}
                <div className="absolute left-1/2 top-1/2 w-10 h-10 rounded-full border-4 border-white dark:border-gray-950 bg-gray-50 dark:bg-gray-900 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 group-hover:bg-[#FACC15] group-hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] hidden md:flex">
                  {node.icon}
                </div>

                {/* Left Block */}
                <div className={`w-full md:w-1/2 md:pr-12 flex flex-col items-start ${
                  isEven ? "md:text-right md:items-end order-2 md:order-1" : "md:order-3 md:text-left md:items-start md:pl-12"
                }`}>
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5">
                    {node.timeframe}
                  </span>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border mb-3 ${node.refundColor}`}>
                    {node.refundPercent}
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-[#FACC15] transition-colors">
                    {node.title}
                  </h3>
                </div>

                {/* Desktop Spacers */}
                <div className="w-0 md:w-0 order-2" />

                {/* Right Block (Details card) */}
                <div className={`w-full md:w-1/2 flex ${
                  isEven ? "order-3 md:pl-12 justify-start" : "order-1 md:pr-12 justify-end"
                }`}>
                  <Card className="w-full max-w-md bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-5 md:p-6 rounded-[20px] text-left hover:border-yellow-400/20 transition-all shadow-sm">
                    <ul className="space-y-2.5">
                      {node.details.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CancellationTimeline;
