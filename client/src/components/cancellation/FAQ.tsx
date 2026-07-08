// src/components/cancellation/FAQ.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "../ui/Badge";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking directly from the 'My Bookings' tab in your profile dashboard. Simply find your active reservation, click 'Cancel Ride', review the refund summary based on our timeline, and confirm. The refund will be calculated automatically based on how far in advance you cancel.",
    },
    {
      id: 2,
      question: "How long does it take for a refund to reflect in my bank account?",
      answer: "Refunds are processed automatically and initiated immediately upon cancellation. Depending on your bank or credit card issuer, the funds will reflect in your account within 5 to 7 business days. Security deposits are released instantly from our end.",
    },
    {
      id: 3,
      question: "What if the owner does not show up at pickup time?",
      answer: "If the vehicle owner/host fails to deliver the vehicle within 1 hour of the scheduled trip start time, it is marked as a Host No-Show. The renter receives a full 100% refund immediately, plus a ₹500 compensation coupon code to book another car.",
    },
    {
      id: 4,
      question: "Can I modify my booking dates instead of canceling?",
      answer: "Yes, you can request to reschedule your trip up to 12 hours before it starts. All rescheduling is subject to vehicle availability and host approval. Rescheduling is free of charge for the first modification, while subsequent updates may incur a convenience fee of ₹150.",
    },
    {
      id: 5,
      question: "Are security deposits subject to cancellation penalties?",
      answer: "No, security deposits are always 100% refundable. Even if you cancel last-minute and forfeit a portion of your booking fee under the cancellation policy, your security deposit will always be released back to you in full.",
    },
    {
      id: 6,
      question: "What happens if the vehicle breaks down during my trip?",
      answer: "If the vehicle experiences a mechanical breakdown during your trip, contact CarBoom Support and Roadside Assistance immediately. We will coordinate support or a replacement, and you will receive a prorated refund for the unused hours of your rental.",
    },
  ];

  return (
    <section id="faqs" className="py-24 bg-white dark:bg-gray-950 px-6 scroll-mt-20 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FACC15] border-[#FACC15]/20 bg-yellow-400/5">
            Common Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-[#FACC15] text-glow">Questions</span>
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Got questions about cancellations, processing times, or security deposits? We've compiled quick answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-[20px] transition-all duration-300 ${
                  isOpen 
                    ? "bg-white dark:bg-gray-900 border-yellow-400 shadow-md" 
                    : "bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-yellow-500" : "text-gray-400"
                    }`} />
                    <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {faq.question}
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
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
