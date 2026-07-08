// src/components/terms/Responsibilities.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, User, Landmark, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface ResponsibilityDetail {
  title: string;
  desc: string;
  points: string[];
}

export const Responsibilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"renter" | "owner">("renter");

  const renterResponsibilities: ResponsibilityDetail[] = [
    {
      title: "Pre-Trip Inspection & Photos",
      desc: "It is the renter's duty to report and photograph pre-existing damages before leaving the pickup location.",
      points: [
        "Take 8 clear photos covering all angles of the car (front, back, sides, tires, interior).",
        "Upload these photos via the CarBoom App BEFORE starting the ignition.",
        "Unreported scratches/dents identified after the trip will be presumed to have occurred during your rental.",
      ],
    },
    {
      title: "Safe Operation & Compliance",
      desc: "Renter must operate the vehicle strictly under legal safety rules.",
      points: [
        "Comply with local state speed limits (CarBoom monitors speeding above 100 km/h).",
        "Seat belts must be worn by all occupants at all times.",
        "Never operate the vehicle under the influence of alcohol, drugs, or sleep-depriving medications.",
      ],
    },
    {
      title: "Fuel & Cleanliness",
      desc: "The vehicle must be returned in the same physical state as received.",
      points: [
        "Return the vehicle with a fuel level matching the start-trip reading (refuel cost + ₹300 convenience fee applies otherwise).",
        "Ensure the vehicle is clean, free of litter, and contains no strong odors (smoking carries a ₹2,500 sanitation fee).",
        "No pets are allowed unless the vehicle is explicitly marked as Pet-Friendly.",
      ],
    },
    {
      title: "Key Custody & Lockup",
      desc: "Renter is fully liable for physical key and locking mechanisms.",
      points: [
        "Never leave the key inside an unattended vehicle.",
        "Do not clone, modify, or hand over keys to unauthorized third parties.",
        "Lost keys carry a replacement fee of ₹5,000 to ₹15,000 depending on vehicle make.",
      ],
    },
  ];

  const ownerResponsibilities: ResponsibilityDetail[] = [
    {
      title: "Vehicle Roadworthiness & Safety",
      desc: "Owners must maintain vehicle mechanical safety standards.",
      points: [
        "Provide a vehicle with functioning brakes, airbags, tire treads above 2mm, and all headlights working.",
        "Keep valid original documents in the glove box (RC, Active Comprehensive P2P Insurance, PUC certificate).",
        "Schedule regular maintenance checks and verify the engine warning light is OFF.",
      ],
    },
    {
      title: "Honest & Accurate Listing Details",
      desc: "Listing specifications must precisely match reality.",
      points: [
        "Upload actual, high-quality images of the vehicle rather than stock photography.",
        "Clearly document any existing minor cosmetic defects in the vehicle profile.",
        "Keep the availability calendar fully up to date to prevent overlapping booking cancellations.",
      ],
    },
    {
      title: "Handover Prep & Sanitation",
      desc: "Owners must provide a clean and prepared vehicle.",
      points: [
        "Vacuum interiors and disinfect high-touch surfaces (steering wheel, gear shift, door handles) before handover.",
        "Provide a minimum of 20% fuel (or equivalent electric charge) in the tank at pickup.",
        "Remove all personal belongings from the cabin and glove compartments.",
      ],
    },
    {
      title: "Identity Verification & Coordination",
      desc: "Ensure handover is completed with the authorized driver.",
      points: [
        "Verify that the driver picking up the car matches the verified name on the CarBoom booking receipt.",
        "Cross-check the physical driver's license at key exchange.",
        "Never handover keys if the renter appears impaired or lacks matching credentials.",
      ],
    },
  ];

  const activeResponsibilities = activeTab === "renter" ? renterResponsibilities : ownerResponsibilities;

  return (
    <section id="responsibilities" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            02. Two Sides of P2P
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            User <span className="text-[#FACC15] text-glow">& Owner Roles</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            P2P car sharing thrives on mutual respect. Find out exactly what is expected from you whether you're behind the wheel or listing your asset.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="flex bg-white dark:bg-gray-950 p-1.5 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
            <button
              onClick={() => setActiveTab("renter")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "renter"
                  ? "bg-[#FACC15] text-black shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              Renter (Guest)
            </button>
            <button
              onClick={() => setActiveTab("owner")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "owner"
                  ? "bg-[#FACC15] text-black shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Landmark className="w-4 h-4" />
              Owner (Host)
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="relative">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {activeResponsibilities.map((resp, idx) => (
              <Card
                key={idx}
                variant="default"
                className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/5 p-6 md:p-8 flex flex-col justify-between hover:border-yellow-400/25 transition-all text-left shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/10">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                      {resp.title}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                    {resp.desc}
                  </p>

                  <div className="h-[1.5px] bg-gradient-to-r from-gray-100 via-gray-50 dark:from-white/5 dark:via-white/0 to-transparent" />

                  <ul className="space-y-3 pt-1">
                    {resp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Warning Callout */}
        <div className="p-5 md:p-6 bg-amber-500/10 border border-amber-500/20 rounded-[20px] max-w-4xl mx-auto flex gap-4 items-start text-left">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase text-amber-800 dark:text-amber-400 tracking-wider">Note on Insurance Claims</h4>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300/90 leading-relaxed">
              Failure to execute pre-trip inspections (Renters) or verify documents and vehicle safety parameters (Owners) voids insurance coverage. In case of an incident, the party failing to follow these guidelines will carry full civil and financial liability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Responsibilities;
