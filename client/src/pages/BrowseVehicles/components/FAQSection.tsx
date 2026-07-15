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
    id: "faq-b1",
    question: "How are distance ranges calculated for peer vehicle locations?",
    answer: "We display real-time coordinates between your location search query and the owner's vehicle base address. The distances shown represent exact straight-line routes to facilitate prompt key handovers."
  },
  {
    id: "faq-b2",
    question: "What does the 'Instant Booking' badge mean?",
    answer: "Vehicles with the Instant Booking badge do not require manual pre-approval from the vehicle owner. Once your payment goes through, the vehicle is immediately secured for your selected dates, and the pickup details are unlocked."
  },
  {
    id: "faq-b3",
    question: "Are fuel charges included in the price?",
    answer: "No, fuel is not included in the rental price. Renters are expected to return the vehicle with the same fuel level as it had at pickup. If returned with less fuel, local refueling charges will be billed dynamically."
  },
  {
    id: "faq-b4",
    question: "Is there a security deposit required?",
    answer: "Yes, a minimal refundable security deposit of ₹1,000 - ₹5,000 (depending on the vehicle class) is authorized at checkout. This amount is automatically released back to your payment source within 24 hours of a safe vehicle return."
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mb-16 text-center">
      <div className="mb-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Common Queries</span>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider mt-0.5">Frequently Asked Questions</h2>
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

export default FAQSection;
