// src/components/help/HelpHero.tsx

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

export const HelpHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 py-20 md:py-32">
      {/* Floating illustration placeholder using lucide icon */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      >
        <Search className="w-64 h-64 text-yellow-300 opacity-20" />
      </motion.div>

      <div className="relative container mx-auto px-4 md:px-8 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Help Center
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We\'re here to help you with bookings, listings, payments and everything in between.
        </motion.p>

        {/* Search box */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search your question..."
              className="w-full rounded-full border border-gray-300 bg-white py-3 pl-5 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Contact Support
            </Button>
          </Link>
          <Link to="#faqs">
            <Button variant="outline" size="lg">
              Browse FAQs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
