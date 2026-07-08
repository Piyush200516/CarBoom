// src/components/terms/LegalContact.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Gavel, Scale, Mail, Phone, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SUPPORT_PHONE, SUPPORT_PHONE_RAW, SUPPORT_EMAIL } from "../../constants/contact";

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
  bullets: string[];
}

export const LegalContact: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("liability");

  const legalSections: AccordionItem[] = [
    {
      id: "liability",
      icon: <Scale className="w-5 h-5" />,
      title: "Limitation of Liability",
      content: "CarBoom is a peer-to-peer marketplace connecting guests with independent vehicle owners. We do not own, manage, inspect, or lease the vehicles listed on our platform.",
      bullets: [
        "Facilitation Only: CarBoom's liability is strictly limited to platform operations, matching algorithms, and payment processing.",
        "Breakdown & Safety Exclusion: We carry zero liability for mechanical failures, engine breakdowns, or accidents resulting from poor vehicle upkeep by hosts.",
        "Damage Cap: In the event that CarBoom is found legally liable, our maximum aggregate liability is strictly capped at the total booking fee paid by the user for the trip in question.",
        "Consequential Damage Disclaimer: Under no circumstances shall CarBoom be liable for indirect, punitive, or consequential damages (such as lost profits or missed flights) arising from rental disputes.",
      ],
    },
    {
      id: "law",
      icon: <Gavel className="w-5 h-5" />,
      title: "Governing Law & Jurisdiction",
      content: "These Terms and any disputes or claims arising out of them are governed by and construed in accordance with local regulations.",
      bullets: [
        "National Laws: The Terms shall be governed and interpreted under the laws of the Republic of India.",
        "Exclusive Jurisdiction: All legal proceedings, disputes, or actions must be filed exclusively in the competent courts located in Bangalore, Karnataka.",
        "Severability: If any provision of these Terms is deemed illegal or unenforceable, that specific clause shall be severed, and the remaining terms will continue in full force and effect.",
      ],
    },
    {
      id: "arbitration",
      icon: <FileText className="w-5 h-5" />,
      title: "Arbitration & Resolution Center",
      content: "Before taking formal legal action, hosts and guests agree to submit any disputes to CarBoom's internal Resolution Center for mediated arbitration.",
      bullets: [
        "Mediation Period: Both parties must engage in good-faith mediation facilitated by CarBoom for a minimum of 15 business days.",
        "Evidence Submission: Users must submit all telemetry logs, chat histories, and handover photos within 48 hours of a dispute request.",
        "Final Binding Decisions: If an agreement is not reached, CarBoom's safety panel will issue an adjustment determination based on telemetry and photo records, which governs platform charges and deposit distribution.",
      ],
    },
  ];

  return (
    <section id="legal" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            08. Legal Safeguards
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Legal Boundaries <span className="text-[#FACC15] text-glow">& Contact</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
            Please read the detailed terms regarding platform liability, governing law, and how to reach out for active disputes or legal support.
          </p>
        </div>

        {/* Main Grid: Left Accordion, Right Contact Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Legal Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {legalSections.map((sec) => {
              const isOpen = openId === sec.id;
              return (
                <div
                  key={sec.id}
                  className={`border rounded-[20px] transition-all duration-300 ${
                    isOpen
                      ? "bg-white dark:bg-gray-950 border-yellow-400 shadow-md"
                      : "bg-white dark:bg-gray-950 border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : sec.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors duration-300 ${
                        isOpen ? "bg-yellow-400/10 text-yellow-500" : "bg-gray-50 dark:bg-gray-900 text-gray-400"
                      }`}>
                        {sec.icon}
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-snug">
                        {sec.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isOpen ? "bg-yellow-400/10 text-yellow-500" : "text-gray-400"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4 space-y-4 text-left">
                          <p>{sec.content}</p>
                          <ul className="space-y-2.5">
                            {sec.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                <ShieldCheck className="w-4.5 h-4.5 text-[#FACC15] shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Contact Details Column */}
          <div id="contact" className="lg:col-span-5 scroll-mt-20">
            <Card
              variant="default"
              className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/5 p-6 md:p-8 rounded-[24px] text-left shadow-sm space-y-6"
            >
              <div className="space-y-2">
                <Badge variant="outline" className="text-[8px] font-black uppercase text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
                  Resolution Desk
                </Badge>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  Reach Out to CarBoom
                </h3>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                  Have a question about these terms, or need to log an incident report? Our support desk works 24/7 for active reservations.
                </p>
              </div>

              <div className="h-[1px] bg-gray-100 dark:bg-white/5" />

              <div className="space-y-4">
                {/* Email Box */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0 border border-yellow-400/10">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</h4>
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="font-extrabold text-gray-900 dark:text-white text-sm hover:text-[#FACC15] transition mt-0.5 block">
                      {SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>

                {/* Helpline Box */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/10">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Helpline Support</h4>
                    <a href={`tel:${SUPPORT_PHONE_RAW}`} className="font-extrabold text-gray-900 dark:text-white text-sm hover:text-emerald-500 transition mt-0.5 block">
                      {SUPPORT_PHONE}
                    </a>
                  </div>
                </div>

                {/* Response SLA Box */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/10">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Response SLA</h4>
                    <p className="font-semibold text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      Legal disputes: 5 business days. Incidental ticket issues: 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 font-black uppercase tracking-wider text-xs py-3.5 px-4 bg-[#FACC15] hover:bg-yellow-500 text-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <span>Go to Support Desk</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalContact;
