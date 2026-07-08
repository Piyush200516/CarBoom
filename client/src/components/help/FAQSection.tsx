// src/components/help/FAQSection.tsx

import React from "react";
import { FAQItem } from "./FAQItem";
import { helpFAQ } from "../../data/helpFAQ";
import { motion } from "framer-motion";

export const FAQSection: React.FC = () => {
  return (
    <section id="faqs" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Popular FAQs
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {helpFAQ.map((item, idx) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <FAQItem question={item.question} answer={item.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
