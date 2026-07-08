// src/components/help/SafetyTrust.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  Clock,
  Shield,
  ShieldCheck,
  Tag,
} from "lucide-react";

interface TrustItem {
  title: string;
  Icon: React.ElementType;
}

const items: TrustItem[] = [
  { title: "Verified Owners", Icon: CheckCircle },
  { title: "Secure Payments", Icon: CreditCard },
  { title: "24×7 Support", Icon: Clock },
  { title: "Insurance Assistance", Icon: Shield },
  { title: "Customer Protection", Icon: ShieldCheck },
  { title: "Transparent Pricing", Icon: Tag },
];

export const SafetyTrust: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Safety & Trust
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              className="flex flex-col items-center p-6 text-center glassmorphism-light rounded-xl shadow-lg hover:shadow-yellow-glow-hover transition-shadow"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <item.Icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
