// src/components/terms/AccountSuspension.tsx
import React from "react";
import { motion } from "framer-motion";
import { UserX, ShieldAlert, AlertOctagon, HelpCircle, XCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface SuspensionStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  color: string;
  description: string;
  actions: string[];
}

export const AccountSuspension: React.FC = () => {
  const steps: SuspensionStep[] = [
    {
      step: "01",
      icon: <ShieldAlert className="w-6 h-6 text-amber-500" />,
      title: "Written Warning & Review",
      badge: "Standard Review",
      color: "border-amber-400/20 hover:border-amber-400/40",
      description: "Triggered by minor violations, such as isolated late return feedback or poor interior hygiene reports.",
      actions: [
        "A warning notification is dispatched detailing the issue.",
        "User profile receives a security note visible to support operators.",
        "User must acknowledge the compliance review via the app to keep booking.",
      ],
    },
    {
      step: "02",
      icon: <AlertOctagon className="w-6 h-6 text-orange-500" />,
      title: "Temporary Profile Lock",
      badge: "7 to 30 Days Suspension",
      color: "border-orange-500/20 hover:border-orange-500/40",
      description: "Triggered by unpaid toll bills, multiple telemetry speeding warnings, or verified host cancellation disputes.",
      actions: [
        "Account is locked: cannot search, request, or host vehicles.",
        "All active future bookings are automatically canceled with 100% refund to guests.",
        "Profile undergoes manual compliance investigation by the Trust & Safety team.",
      ],
    },
    {
      step: "03",
      icon: <UserX className="w-6 h-6 text-red-500" />,
      title: "Permanent Platform Ban",
      badge: "Lifetime Termination",
      color: "border-red-500/20 hover:border-red-500/40",
      description: "Triggered by extreme violations, including DUI arrests, illegal street racing, key cloning, or document fraud.",
      actions: [
        "Immediate permanent termination of CarBoom account with zero restoration right.",
        "Details are logged on the shared P2P Car Rental Blacklist Database.",
        "Pending security deposits are held until legal investigations and repairs complete.",
      ],
    },
  ];

  return (
    <section id="suspension" className="py-20 px-6 bg-white dark:bg-gray-950 scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            07. Platform Discipline
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Account <span className="text-[#FACC15] text-glow">Suspension Steps</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            We work hard to maintain a respectful community. Under these guidelines, violating our rental safety protocols results in a structured escalation path.
          </p>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-gray-100 dark:bg-gray-800 -translate-y-1/2 z-0 hidden md:block" />

          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative z-10"
            >
              <Card
                variant="flat"
                className={`bg-white dark:bg-gray-950 border ${item.color} p-6 md:p-8 rounded-[24px] shadow-sm flex flex-col justify-between h-full text-left transition-all duration-300`}
              >
                <div className="space-y-6">
                  {/* Step label & Icon */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-300 dark:text-gray-700 tracking-wider">
                      STAGE {item.step}
                    </span>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="space-y-2">
                    <div className="inline-flex">
                      <Badge variant="outline" className="text-[8px] font-black tracking-wider">
                        {item.badge}
                      </Badge>
                    </div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="h-[1px] bg-gray-100 dark:bg-white/5" />

                  {/* Action list */}
                  <ul className="space-y-2.5">
                    {item.actions.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountSuspension;
