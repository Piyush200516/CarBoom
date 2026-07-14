// src/components/terms/BookingRules.tsx
import React from "react";
import { Clock, CalendarRange, RefreshCw, KeyRound } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface RuleItem {
  icon: React.ReactNode;
  title: string;
  badge: string;
  details: string[];
}

export const BookingRules: React.FC = () => {
  const rules: RuleItem[] = [
    {
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      title: "Duration Limits",
      badge: "4 Hours - 30 Days",
      details: [
        "Minimum booking block is 4 consecutive hours per trip.",
        "Maximum initial booking period is capped at 30 days.",
        "Long-term rentals (15+ days) enjoy custom platform discounts.",
      ],
    },
    {
      icon: <CalendarRange className="w-5 h-5 text-yellow-500" />,
      title: "Lead Time Rules",
      badge: "2-Hour Buffer",
      details: [
        "Reservations must be placed at least 2 hours before scheduled start.",
        "Instant book options allow pickup within 45 minutes for verified cars.",
        "Owner must confirm non-instant bookings within 1.5 hours of request.",
      ],
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-yellow-500" />,
      title: "Trip Extension Protocol",
      badge: "3-Hour Notice",
      details: [
        "Extensions must be submitted in-app at least 3 hours before trip ends.",
        "Approval depends entirely on vehicle availability and host consent.",
        "Unauthorized late returns are penalized at ₹500/hour plus standard rates.",
      ],
    },
    {
      icon: <KeyRound className="w-5 h-5 text-yellow-500" />,
      title: "Handover Mechanics",
      badge: "App Confirmed",
      details: [
        "Both parties must be physically present at handover (unless keyless).",
        "Record and match current odometer & fuel levels in the handover module.",
        "Both users must click 'Confirm Handover' in-app to start insurance coverage.",
      ],
    },
  ];

  return (
    <section id="booking" className="py-20 px-6 bg-white dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            03. Rules of Engagement
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Booking <span className="text-[#FACC15] text-glow">& Extension Rules</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            From the minute you request a vehicle to the final key handover, these structural rules keep bookings running smoothly on schedule.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, idx) => (
            <Card
              key={idx}
              variant="flat"
              hoverEffect
              className="bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-6 rounded-[24px] text-left hover:border-yellow-400/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-white/5 text-[#FACC15] shadow-sm">
                    {rule.icon}
                  </div>
                  <Badge variant="glass" className="text-[9px] font-black tracking-wider text-yellow-600 dark:text-yellow-400 bg-yellow-400/10 border-yellow-400/20">
                    {rule.badge}
                  </Badge>
                </div>

                <h3 className="text-base font-extrabold text-gray-900 dark:text-white group-hover:text-[#FACC15]">
                  {rule.title}
                </h3>

                <div className="h-[1px] bg-gray-100 dark:bg-white/5" />

                <ul className="space-y-3 pt-1">
                  {rule.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingRules;
