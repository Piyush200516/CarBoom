// src/components/help/Resources.tsx

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, UserPlus, FileText, ShieldCheck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface Resource {
  title: string;
  Icon: React.ElementType;
  to: string; // internal route
}

const resources: Resource[] = [
  { title: "How It Works", Icon: BookOpen, to: "/how-it-works" },
  { title: "Become an Owner", Icon: UserPlus, to: "/become-owner" },
  { title: "Terms & Conditions", Icon: FileText, to: "/terms" },
  { title: "Privacy Policy", Icon: ShieldCheck, to: "/privacy" },
  { title: "Contact Us", Icon: Phone, to: "/contact" },
];

export const Resources: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Resources
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => (
            <motion.article
              key={res.title}
              className="flex flex-col items-center p-6 text-center glassmorphism-light rounded-xl shadow-lg hover:shadow-yellow-glow-hover transition-shadow"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <res.Icon className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                {res.title}
              </h3>
              <Link to={res.to} className="text-sm text-yellow-600 hover:underline">
                Learn More
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
