import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const HeroBanner = () => {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden rounded-[32px] mb-12 shadow-2xl">
      {/* Background Image with animated zoom */}
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2966&auto=format&fit=crop')] bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-4xl z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find Your Perfect <span className="text-yellow-400">Drive</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore the finest selection of premium vehicles. Whether for a luxury weekend getaway or a quick city ride, we've got you covered.
        </motion.p>
      </div>
    </div>
  );
};
