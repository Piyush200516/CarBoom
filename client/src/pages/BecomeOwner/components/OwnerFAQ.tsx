import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "fo1",
    question: "Is my vehicle safe with CarBoom renters?",
    answer: "Absolutely! We do thorough license verifications and identity checks on all renters. We also pre-authorize a safety deposit prior to checkout, and our onboard telematics track location and speed limits."
  },
  {
    id: "fo2",
    question: "How do I get paid, and what are the platform commissions?",
    answer: "Platform owners keep up to 85% of their total rental fees. CarBoom processes weekly earnings summaries, and payouts are transferred directly to your bank account every Wednesday."
  },
  {
    id: "fo3",
    question: "What happens if a renter gets into an accident or damages the vehicle?",
    answer: "CarBoom provides fully integrated damage protection and third-party liability insurance cover during the active trip period. The renter is responsible for damages up to the safety deposit cap, while platform insurance handles major repairs."
  },
  {
    id: "fo4",
    question: "Can I block specific dates to use my vehicle personally?",
    answer: "Yes! You maintain complete control over availability. Through the Owner Dashboard, you can block any hourly or daily range on the vehicle calendar when you need your ride for personal chores."
  }
];

export const OwnerFAQ: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-3xl mx-auto px-6 mb-24 text-center">
      <div className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Host Helpdesk</span>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider mt-0.5">
          Owner FAQs
        </h2>
        <p className="text-gray-400 text-xs font-semibold mt-2">
          Clear insights about listings, safety protocols, and commission settlements.
        </p>
      </div>

      <div className="space-y-3.5 text-left w-full">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`border rounded-[20px] overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? "border-yellow-400/50 bg-[#1e293b]/40 shadow-sm" 
                  : "border-white/5 bg-[#111827]/30 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between px-6 py-4.5 font-bold text-white text-left hover:text-yellow-400 transition cursor-pointer"
              >
                <span className="text-sm md:text-base pr-4">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-yellow-400" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-xs md:text-sm text-gray-400 font-semibold border-t border-white/5 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OwnerFAQ;
