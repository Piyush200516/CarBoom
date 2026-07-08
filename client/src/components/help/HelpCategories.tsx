// src/components/help/HelpCategories.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CreditCard,
  UserRound,
  Car,
  UserCog,
  ShieldCheck,
} from "lucide-react";

interface Category {
  title: string;
  description: string;
  Icon: React.ElementType;
}

const categories: Category[] = [
  {
    title: "Booking Issues",
    description: "Help with reservation errors, schedule changes, and cancellations.",
    Icon: CalendarCheck,
  },
  {
    title: "Payments & Refunds",
    description: "Secure payment processing, invoicing and refund policies.",
    Icon: CreditCard,
  },
  {
    title: "Vehicle Owners",
    description: "Listing, pricing, and managing your fleet.",
    Icon: UserRound,
  },
  {
    title: "Renting Vehicles",
    description: "Finding, booking and using vehicles efficiently.",
    Icon: Car,
  },
  {
    title: "Account & Login",
    description: "Account creation, recovery and security settings.",
    Icon: UserCog,
  },
  {
    title: "Safety & Security",
    description: "Insurance, verification and emergency support.",
    Icon: ShieldCheck,
  },
];

export const HelpCategories: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Quick Help Categories
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.article
              key={cat.title}
              className="flex flex-col items-center p-6 text-center glassmorphism-light rounded-xl shadow-lg hover:shadow-yellow-glow-hover transition-shadow"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <cat.Icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cat.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
