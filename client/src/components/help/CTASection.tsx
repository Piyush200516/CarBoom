// src/components/help/CTASection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Illustration */}
        <motion.div
          className="flex-1 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Car className="w-64 h-64 text-yellow-300 opacity-30" />
        </motion.div>
        {/* Text + Buttons */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6 text-lg">Our support team is always ready to assist you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Email Support
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg">
                Browse Vehicles
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
