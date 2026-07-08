// src/components/safety/SafetyFAQ.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { safetyFAQs } from "../../data/safety";
import { Card } from "../ui/Card";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQAccordionItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="border-b border-gray-200/80 py-5 text-left">
      <button
        type="button"
        className="w-full flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg py-1 px-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-sm sm:text-base font-extrabold text-gray-900 pr-4">{question}</h3>
        <div className="shrink-0 text-gray-500">
          {isOpen ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-3 px-2 text-xs sm:text-sm font-semibold text-gray-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export const SafetyFAQ: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-4 py-2 rounded-full">
            Help & Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Safety & Protection FAQ
          </h2>
          <p className="text-gray-500 font-semibold text-xs sm:text-sm">
            Find answers to commonly asked questions regarding verification, roadside support, and coverage details.
          </p>
        </div>

        {/* FAQ Accordion container */}
        <Card variant="glass-light" className="p-6 md:p-10 border border-white/85 shadow-lg rounded-[28px]">
          <div className="divide-y divide-gray-100">
            {safetyFAQs.map((faq, idx) => (
              <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </Card>

      </div>
    </section>
  );
};

export default SafetyFAQ;
