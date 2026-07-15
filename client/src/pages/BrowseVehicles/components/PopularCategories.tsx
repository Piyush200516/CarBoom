import React from "react";
import { motion } from "framer-motion";
import { 
  Car, Shield, Zap, Sparkles, 
  Bike, Compass, RefreshCcw 
} from "lucide-react";

interface CategoryOption {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: "SUV", name: "SUV", icon: Compass, description: "Bold & adventure ready" },
  { id: "Sedan", name: "Sedan", icon: Car, description: "Sleek & comfortable" },
  { id: "Luxury", name: "Luxury", icon: Shield, description: "Elite premium classes" },
  { id: "EV", name: "Electric", icon: Zap, description: "Sustainable eco drives" },
  { id: "Sports", name: "Sports", icon: Sparkles, description: "High speed adrenaline" },
  { id: "Bike", name: "Bike", icon: Bike, description: "Cruiser motorcycles" },
  { id: "Scooter", name: "Scooter", icon: Bike, description: "Agile city commuters" },
  { id: "Convertible", name: "Convertible", icon: Car, description: "Open air cruising" }
];

interface PopularCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Class Selection</span>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-0.5">Popular Categories</h2>
        </div>
        
        {selectedCategory !== "all" && (
          <button
            onClick={() => onSelectCategory("all")}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
          >
            <RefreshCcw size={12} /> Clear Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={`p-4 rounded-[20px] border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                isActive
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/25"
                  : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <div className={`p-2.5 rounded-full mb-3 ${isActive ? "bg-black/10" : "bg-white/5"}`}>
                <Icon size={18} className={isActive ? "text-black" : "text-yellow-400"} />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider">{cat.name}</span>
              <span className={`text-[8px] mt-1 font-semibold block ${isActive ? "text-black/70" : "text-gray-500"}`}>
                {cat.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategories;
