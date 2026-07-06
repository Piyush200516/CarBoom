import { Car, Bike, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CategoriesSection = () => {
    const categories = [
        {
            title: "Cars",
            desc: "Explore Cars",
            icon: Car,
            image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400",
            link: "#cars"
        },
        {
            title: "Bikes",
            desc: "Explore Bikes",
            icon: Bike, // Will render custom motorcycle if needed, Bike is clean
            image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400",
            link: "#bikes"
        },
        {
            title: "Scooters",
            desc: "Explore Scooters",
            icon: Bike, // using Bike as base with styling, Vespa styling
            image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=400",
            link: "#scooters"
        },
        {
            title: "Cycles",
            desc: "Explore Cycles",
            icon: Bike,
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400",
            link: "#cycles"
        }
    ];

    return (
        <section id="categories" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight font-heading">
                            Popular Categories
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 font-light">
                            Find the perfect vehicle to suit your journey type
                        </p>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-yellow-500 transition group cursor-pointer">
                        View all 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-200" />
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative bg-[#f9fafb] border border-gray-100 hover:border-yellow-400/30 hover:bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                            >
                                {/* Top info row */}
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-yellow-400/20 text-yellow-600 flex items-center justify-center font-bold">
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 group-hover:text-yellow-500 transition">
                                        0{idx + 1}
                                    </span>
                                </div>

                                {/* Vehicle Image with subtle shadow/gradient */}
                                <div className="my-6 relative h-36 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent rounded-full filter blur-xl scale-75 group-hover:bg-yellow-400/10 transition duration-300" />
                                    <img 
                                        src={cat.image} 
                                        alt={cat.title}
                                        className="h-full object-contain transform group-hover:scale-110 group-hover:-rotate-3 transition duration-500 relative z-10"
                                    />
                                </div>

                                {/* Title & Action Link */}
                                <div className="relative z-10 mt-auto">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition">
                                        {cat.title}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-gray-500 group-hover:text-yellow-500 transition">
                                        <span>{cat.desc}</span>
                                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
