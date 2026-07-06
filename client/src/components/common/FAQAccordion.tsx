// src/components/common/FAQAccordion.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className }) => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-3.5 text-left w-full", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "border rounded-[20px] overflow-hidden transition-all duration-300",
              isOpen ? "border-yellow-400 bg-yellow-400/5 shadow-sm" : "border-gray-100 bg-white"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between px-6 py-4.5 font-bold text-gray-900 text-left hover:text-yellow-600 transition cursor-pointer"
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                className={cn("text-gray-400 transition-transform duration-300", isOpen ? "rotate-180 text-yellow-500" : "")}
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
                  <div className="px-6 pb-5 text-sm text-gray-600 font-medium border-t border-yellow-400/10 pt-3">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
