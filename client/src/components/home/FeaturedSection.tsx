import { useState } from "react";
import { Star, Heart, Fuel, Settings, Users, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Vehicle {
    id: string;
    name: string;
    type: "car" | "bike" | "scooter";
    rating: number;
    fuel: string;
    transmission: string;
    seats: number;
    priceDay: number;
    image: string;
}

const FeaturedSection = () => {
    const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

    const toggleWishlist = (id: string) => {
        setWishlist(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const vehicles: Vehicle[] = [
        {
            id: "1",
            name: "Hyundai Creta",
            type: "car",
            rating: 4.6,
            fuel: "Petrol",
            transmission: "Manual",
            seats: 5,
            priceDay: 699,
            image: "https://images.unsplash.com/photo-1620216503961-d70102641979?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "2",
            name: "Maruti Suzuki Swift",
            type: "car",
            rating: 4.7,
            fuel: "Petrol",
            transmission: "Manual",
            seats: 5,
            priceDay: 499,
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "3",
            name: "Royal Enfield Classic 350",
            type: "bike",
            rating: 4.9,
            fuel: "Petrol",
            transmission: "Manual",
            seats: 2,
            priceDay: 399,
            image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "4",
            name: "Honda Activa 6G",
            type: "scooter",
            rating: 4.6,
            fuel: "Petrol",
            transmission: "Automatic",
            seats: 2,
            priceDay: 249,
            image: "https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "5",
            name: "Mahindra Thar 4x4",
            type: "car",
            rating: 4.9,
            fuel: "Diesel",
            transmission: "Manual",
            seats: 4,
            priceDay: 1199,
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "6",
            name: "Ather 450X",
            type: "scooter",
            rating: 4.8,
            fuel: "Electric",
            transmission: "Automatic",
            seats: 2,
            priceDay: 199,
            image: "https://images.unsplash.com/photo-1606907547048-22d7b6f6ec6d?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "7",
            name: "Honda City",
            type: "car",
            rating: 4.7,
            fuel: "Petrol",
            transmission: "Automatic",
            seats: 5,
            priceDay: 899,
            image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=500"
        },
        {
            id: "8",
            name: "KTM RC 390",
            type: "bike",
            rating: 4.8,
            fuel: "Petrol",
            transmission: "Manual",
            seats: 2,
            priceDay: 599,
            image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=500"
        }
    ];

    return (
        <section id="featured-vehicles" className="py-24 bg-[#0b0f19] relative">
            {/* Ambient gold glow */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight font-heading">
                            Featured Vehicles
                        </h2>
                        <p className="text-sm text-gray-400 mt-1 font-light">
                            Handpicked top-rated options, fully sanitised and verified
                        </p>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition group cursor-pointer">
                        View all vehicles 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-200" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vehicles.map((v, idx) => {
                        const isFav = wishlist[v.id] || false;
                        return (
                            <motion.div
                                key={v.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="group relative bg-[#111827]/40 border border-white/5 hover:border-yellow-400/25 rounded-[24px] p-4 flex flex-col justify-between hover:bg-[#111827]/60 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                            >
                                {/* Media / Image container */}
                                <div className="relative h-44 rounded-[18px] overflow-hidden bg-gray-900/40 flex items-center justify-center py-4">
                                    {/* Rating badge */}
                                    <div className="absolute top-3 left-3 bg-[#111827]/80 backdrop-blur-md text-yellow-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-white/5 relative z-10 select-none">
                                        <Star size={12} className="fill-yellow-400" />
                                        <span>{v.rating}</span>
                                    </div>

                                    {/* Wishlist toggle */}
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(v.id);
                                        }}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#111827]/80 backdrop-blur-md flex items-center justify-center border border-white/5 text-gray-300 hover:text-red-500 hover:scale-105 transition duration-200 z-10 cursor-pointer"
                                    >
                                        <Heart size={15} className={`${isFav ? "fill-red-500 text-red-500" : ""}`} />
                                    </button>

                                    {/* Vehicle Image */}
                                    <img 
                                        src={v.image} 
                                        alt={v.name}
                                        className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
                                    />
                                </div>

                                {/* Spec Details */}
                                <div className="mt-4 flex flex-col gap-3">
                                    <h3 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-yellow-400 transition">
                                        {v.name}
                                    </h3>
                                    
                                    {/* Specs Badges */}
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Fuel size={14} className="text-gray-500" />
                                            <span>{v.fuel}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Settings size={14} className="text-gray-500" />
                                            <span>{v.transmission}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={14} className="text-gray-500" />
                                            <span>{v.seats} Seats</span>
                                        </div>
                                    </div>

                                    <hr className="border-white/5 my-1" />

                                    {/* Bottom pricing / actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Starts from</span>
                                            <div className="flex items-baseline gap-0.5">
                                                <span className="text-lg font-black text-white">₹{v.priceDay}</span>
                                                <span className="text-xs text-gray-400">/ day</span>
                                            </div>
                                        </div>
                                        
                                        <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 hover:shadow-yellow-glow-hover transition cursor-pointer">
                                            Book Now
                                            <ChevronRight size={14} />
                                        </button>
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

export default FeaturedSection;
