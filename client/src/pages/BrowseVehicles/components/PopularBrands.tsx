import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

const BRANDS = [
  "BMW", "Audi", "Mercedes", "Hyundai", "Mahindra", 
  "Toyota", "Honda", "Tata", "Kia", "Royal Enfield", "KTM", "Yamaha"
];

interface PopularBrandsProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  vehicleCounts: Record<string, number>;
}

export const PopularBrands: React.FC<PopularBrandsProps> = ({
  selectedBrand,
  onSelectBrand,
  vehicleCounts
}) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Manufacturer</span>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-0.5">Popular Brands</h2>
        </div>
        
        {selectedBrand !== "All" && (
          <button
            onClick={() => onSelectBrand("All")}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
          >
            <RefreshCcw size={12} /> Clear Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {/* "All" button */}
        <button
          onClick={() => onSelectBrand("All")}
          className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
            selectedBrand === "All"
              ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/20"
              : "bg-white/[0.02] text-gray-300 border-white/5 hover:border-white/20 hover:text-white"
          }`}
        >
          <span>All Brands</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
            selectedBrand === "All" ? "bg-black/10 text-black font-extrabold" : "bg-white/10 text-gray-400"
          }`}>
            {vehicleCounts["All"] || 0}
          </span>
        </button>

        {/* Brand buttons */}
        {BRANDS.map((brand, idx) => {
          const isActive = selectedBrand === brand;
          const count = vehicleCounts[brand] || 0;

          return (
            <motion.button
              key={brand}
              onClick={() => onSelectBrand(brand)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/20"
                  : "bg-white/[0.02] text-gray-300 border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              <span>{brand}</span>
              {count > 0 && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-black/10 text-black font-extrabold" : "bg-white/10 text-gray-400"
                }`}>
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default PopularBrands;
