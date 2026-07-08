// src/components/help/FAQItem.tsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        type="button"
        className="w-full flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={question.replace(/\s+/g, "-")}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={question.replace(/\s+/g, "-")}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600 dark:text-gray-300"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
