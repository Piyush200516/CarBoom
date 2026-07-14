import { motion } from "framer-motion";
import { Car, Zap, Shield, Sparkles, Bike, Map, Star, Infinity as InfinityIcon } from "lucide-react";

const categories = [
    { name: "SUV", icon: <Car size={24} />, count: "120+ Cars" },
    { name: "Sedan", icon: <Car size={24} />, count: "350+ Cars" },
    { name: "Luxury", icon: <Sparkles size={24} />, count: "80+ Cars" },
    { name: "Electric", icon: <Zap size={24} />, count: "150+ EVs" },
    { name: "Sports", icon: <Star size={24} />, count: "40+ Cars" },
    { name: "Bike", icon: <Bike size={24} />, count: "400+ Bikes" },
    { name: "Scooter", icon: <Map size={24} />, count: "600+ Scooters" },
    { name: "Long Term", icon: <InfinityIcon size={24} />, count: "200+ Options" },
];

const PopularCategories = () => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Popular Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map((cat, index) => (
                    <motion.button
                        key={cat.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-[#111827] border border-white/5 hover:border-yellow-400/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition group hover:bg-white/5"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-yellow-400 group-hover:bg-yellow-400/10 transition">
                            {cat.icon}
                        </div>
                        <div className="text-center">
                            <h4 className="text-sm font-semibold text-white">{cat.name}</h4>
                            <p className="text-[10px] text-gray-500 font-medium mt-0.5">{cat.count}</p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;
