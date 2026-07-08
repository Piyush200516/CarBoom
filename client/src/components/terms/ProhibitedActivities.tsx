// src/components/terms/ProhibitedActivities.tsx
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Gauge, Mountain, Briefcase, Cigarette, Users, Cpu } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface ProhibitedItem {
  icon: React.ReactNode;
  title: string;
  penalty: string;
  penaltyColor: string;
  description: string;
  details: string[];
}

export const ProhibitedActivities: React.FC = () => {
  const prohibitions: ProhibitedItem[] = [
    {
      icon: <Gauge className="w-5 h-5" />,
      title: "Speeding & Harsh Driving",
      penalty: "₹2,500 Fine",
      penaltyColor: "bg-red-500/10 text-red-500 border-red-500/25",
      description: "CarBoom telemetry tracks speed variables to secure assets and public safety.",
      details: [
        "Continuous speed exceeding 100 km/h triggers automated system alerts.",
        "3 speed alerts in a single trip incur a ₹2,500 safety penalty.",
        "Insurance cover is voided during active extreme speeding violations.",
      ],
    },
    {
      icon: <Mountain className="w-5 h-5" />,
      title: "Off-Roading & Tracks",
      penalty: "₹5,000 Fine",
      penaltyColor: "bg-red-500/10 text-red-500 border-red-500/25",
      description: "Vehicles are intended for public paved roads and marked highways only.",
      details: [
        "Driving on unpaved dirt trails, beaches, sand dunes, or race courses is strictly banned.",
        "Underbody damage sustained during off-roading is billed 100% to the renter.",
        "Carries an immediate fine plus towing/recovery charges.",
      ],
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Commercial & Taxi Use",
      penalty: "Booking Forfeited",
      penaltyColor: "bg-amber-500/10 text-amber-500 border-amber-500/25",
      description: "Vehicles may not be used for commercial operations or passenger hire.",
      details: [
        "Subleasing or using the car for ride-sharing apps (e.g. Ola, Uber) is illegal.",
        "Hauling heavy commercial freight or towing other vehicles is prohibited.",
        "Violators will be banned and hold total personal liability for third-party mishaps.",
      ],
    },
    {
      icon: <Cigarette className="w-5 h-5" />,
      title: "Smoking & Pet Policies",
      penalty: "₹2,500 Detailing Fee",
      penaltyColor: "bg-amber-500/10 text-amber-500 border-amber-500/25",
      description: "Maintain a pristine, odor-free environment for subsequent guests.",
      details: [
        "Smoking, vaping, or consuming tobacco inside the cabin is strictly forbidden.",
        "Bringing pets into non-pet-friendly cars carries a deep-cleaning fine.",
        "Stains or burns on fabric seats will incur direct replacement costs.",
      ],
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Unauthorized Driver Handover",
      penalty: "₹10,000 Fine",
      penaltyColor: "bg-red-500/10 text-red-500 border-red-500/25",
      description: "Only verified drivers registered on the booking may steer the vehicle.",
      details: [
        "Handing keys to unregistered friends/family voids 100% of insurance coverage.",
        "To add a driver, submit their verification docs in-app prior to trip start.",
        "Violators face a fine and permanent termination of platform privileges.",
      ],
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Telemetry & Key Tampering",
      penalty: "Legal Action",
      penaltyColor: "bg-red-500/10 text-red-500 border-red-500/25",
      description: "Platform hardware trackers secure the vehicle's location and safety.",
      details: [
        "Unplugging, bypassing, or disabling OBD trackers or GPS systems is a felony.",
        "Cloning smart keys or tampering with car locks will trigger police alerts.",
        "Results in immediate criminal reporting, booking termination, and bans.",
      ],
    },
  ];

  return (
    <section id="prohibited" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="danger" className="text-[10px] font-black tracking-widest text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20">
            06. Zero Tolerance
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Prohibited <span className="text-red-500 text-glow">Activities</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            Safety and mutual trust are non-negotiable. Engaging in the following activities voids all insurance protection and results in heavy financial penalties.
          </p>
        </div>

        {/* Prohibitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prohibitions.map((item, idx) => (
            <Card
              key={idx}
              variant="default"
              className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between hover:border-red-500/30 transition-all text-left shadow-sm group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-red-500/5 dark:bg-red-500/10 rounded-2xl border border-red-500/10 text-red-500 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <Badge variant="outline" className={`text-[9px] font-black tracking-wider ${item.penaltyColor}`}>
                    {item.penalty}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="h-[1px] bg-gray-100 dark:bg-white/5" />

                <ul className="space-y-2.5 pt-1">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
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

export default ProhibitedActivities;
