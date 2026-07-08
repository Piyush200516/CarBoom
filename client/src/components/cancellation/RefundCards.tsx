// src/components/cancellation/RefundCards.tsx
import React from "react";
import { motion } from "framer-motion";
import { 
  XCircle, FileCheck, CreditCard, CheckCircle2, 
  UserX, ShieldAlert, Award, CalendarX, 
  Hourglass, Ban 
} from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export const RefundCards: React.FC = () => {
  // Refund Process Steps
  const steps = [
    {
      step: "01",
      title: "Booking Cancelled",
      description: "Cancel the ride through your dashboard. Instantly see your refund amount based on our timeline.",
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      step: "02",
      title: "Refund Approved",
      description: "Our system automatically logs the cancellation time and approves the refund immediately.",
      icon: FileCheck,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      step: "03",
      title: "Payment Processed",
      description: "Payment is processed via Stripe. Transaction records are sent to your registered email.",
      icon: CreditCard,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      step: "04",
      title: "Amount Credited",
      description: "Funds appear in your original payment method within 5-7 business days. Security deposit is instant.",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  // Owner Cancellation Rules
  const ownerRules = [
    {
      title: "Financial Penalties",
      description: "Hosts are charged ₹500 if cancelled between 24-48 hours prior, and ₹1000 if cancelled within 24 hours of trip start.",
      icon: ShieldAlert,
      tag: "Calendar Block",
      accent: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Renter Compensation",
      description: "The renter gets a 100% immediate refund plus a ₹500 discount coupon code to book another car immediately.",
      icon: Award,
      tag: "Renter Protection",
      accent: "text-[#FACC15] dark:text-[#FACC15]",
      bg: "bg-yellow-400/10",
    },
    {
      title: "Calendar Restriction",
      description: "Cancelled days are automatically blocked on the owner's vehicle calendar. They cannot take another booking for those slots.",
      icon: CalendarX,
      tag: "Automatic Action",
      accent: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Search Ranking Penalty",
      description: "Cancellations lower the host's overall reliability rating, reducing their visibility in user search results.",
      icon: UserX,
      tag: "Host Penalty",
      accent: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <div className="space-y-24 max-w-7xl mx-auto px-6">
      
      {/* 3. Refund Process Section */}
      <section id="refund-process" className="scroll-mt-20">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
              Workflows
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Our Refund <span className="text-[#FACC15] text-glow">Process</span>
            </h2>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Your refund goes through a simple, fully automated four-step verification process to ensure prompt settlement.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <motion.div key={idx} variants={cardVariants} className="relative group h-full">
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+45px)] right-[calc(-50%+45px)] h-0.5 bg-gradient-to-r from-gray-200 to-transparent dark:from-white/10 dark:to-transparent group-hover:from-yellow-400 transition-all duration-500" />
                  )}
                  <Card variant="flat" className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[24px] p-6 hover:border-yellow-400/50 hover:bg-white dark:hover:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between text-left">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className={`w-10 h-10 rounded-xl ${st.bg} ${st.color} flex items-center justify-center`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-2xl font-black text-gray-200 dark:text-gray-800 tracking-tight group-hover:text-yellow-400 transition-colors">
                          {st.step}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {st.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Owner Cancellation Rules Section */}
      <section id="owner-policy" className="scroll-mt-20">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
              Host Terms
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Owner Cancellation <span className="text-[#FACC15] text-glow">Rules</span>
            </h2>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              We protect both renter and owner interests. To ensure reliability, hosts who cancel are subject to direct penalty guidelines.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {ownerRules.map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <motion.div key={idx} variants={cardVariants} className="h-full">
                  <Card variant="default" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[24px] p-6 hover:shadow-xl hover:border-yellow-400/30 transition-all duration-300 h-full flex flex-col justify-between text-left group">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl ${rule.bg} ${rule.accent} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                          <Icon size={20} />
                        </div>
                        <Badge variant="secondary" className="text-[8px] font-black tracking-wider uppercase">
                          {rule.tag}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                          {rule.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. Late Return Policy & 6. No Show Policy Section */}
      <section id="fees-rules" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Late Return Policy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
                <Hourglass size={18} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Late Return Policy
              </h3>
            </div>
            
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
              Timely returns ensure the next guest is not inconvenienced. Late handovers disrupt vehicle tracking and schedules.
            </p>

            <div className="space-y-4">
              <Card variant="flat" className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[20px] p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FACC15] rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Late Charges</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                      Double the hourly rate for every late hour. We suggest request extensions at least 2 hours prior to slot closing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FACC15] rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Late Return Fee</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                      A flat fee of ₹250 applies in addition to hourly charges to support administrative and support overheads.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FACC15] rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Extension Guideline</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                      If you require more time, check slot availability in the app. Extensions are subject to vehicle availability and host approval.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* No Show Policy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                <Ban size={18} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                No Show Policy
              </h3>
            </div>
            
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
              Showing up on time respects everyone’s schedules. Handovers must start inside the designated grace windows.
            </p>

            <div className="space-y-4">
              <Card variant="flat" className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[20px] p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Renter No-Show (2-Hour Grace)</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                      If the renter fails to arrive within 2 hours of scheduled startup time, it's logged as a renter no-show. Booking is cancelled with 0% refund.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Host No-Show (1-Hour Grace)</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                      If the owner/host fails to hand over the keys within 1 hour, it is logged as a host no-show. Renter gets 100% refund + ₹500 compensation coupon.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Documentation Failures</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                      Failure to show valid physical driver's license at key handover results in immediate booking cancellation under renter no-show terms.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default RefundCards;
