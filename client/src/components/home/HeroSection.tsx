// src/components/home/HeroSection.tsx
import { ShieldCheck, CreditCard, Headphones, BadgePercent, ArrowRight, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchBar } from "../common/SearchBar";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-[#0b0f19] pt-28 pb-16 flex items-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,193,7,0.12),transparent_50%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-no-repeat bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" 
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1600')" }} />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left Side Info */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 flex flex-col gap-6 text-left"
                >
                    <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/25 px-4 py-1.5 rounded-full w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        <span className="text-[10px] md:text-xs font-bold text-yellow-400 uppercase tracking-widest font-heading">
                            #1 Vehicle Rental Platform in India
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
                        Rent Cars, Bikes & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Scooters Near You</span>
                    </h1>

                    <p className="text-gray-300 text-base md:text-lg max-w-xl font-light leading-relaxed">
                        Discover the best vehicles for rent at affordable prices from trusted owners in your city. Ride instantly in just a few taps.
                    </p>

                    {/* Airbnb/Tesla-inspired Search Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                    >
                        <SearchBar />
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <Link to="/browse">
                            <button className="bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-yellow-glow-hover transition cursor-pointer">
                                Rent Now
                                <ArrowRight size={16} />
                            </button>
                        </Link>
                        <Link to="/become-owner">
                            <button className="border border-white/20 hover:border-yellow-400 bg-white/5 backdrop-blur-sm text-white hover:text-yellow-400 px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 transition cursor-pointer">
                                <Key size={16} />
                                Become an Owner
                            </button>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                <ShieldCheck size={16} />
                            </div>
                            <span className="text-xs font-semibold text-gray-300">Verified Owners</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                <CreditCard size={16} />
                            </div>
                            <span className="text-xs font-semibold text-gray-300">Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                <Headphones size={16} />
                            </div>
                            <span className="text-xs font-semibold text-gray-300">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                <BadgePercent size={16} />
                            </div>
                            <span className="text-xs font-semibold text-gray-300">Best Prices</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side Graphics */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.85, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="lg:col-span-5 relative h-[350px] md:h-[450px] flex items-center justify-center select-none"
                >
                    {/* Glowing Accent behind vehicles */}
                    <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-yellow-400/25 rounded-full filter blur-[80px] -z-10 animate-pulse" />

                    {/* Modern City Background Layer */}
                    <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-40">
                        <svg className="w-full h-4/5 text-gray-800" fill="currentColor" viewBox="0 0 500 200">
                            <path d="M0 200h500v-50h-40v-40h-20v40h-50v-60h-30v60h-40v-20h-15v20h-80v-80h-25v80h-60v-40h-20v40h-60v-60h-25v60H0Z" />
                        </svg>
                    </div>

                    {/* Vehicles Stack */}
                    <div className="relative w-full h-full">
                        {/* Scooter (Back Right) */}
                        <motion.img 
                            initial={{ x: 80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=400" 
                            alt="Premium Scooter"
                            className="absolute top-20 right-4 w-40 md:w-56 object-contain rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm bg-black/20"
                        />

                        {/* Motorcycle (Back Left) */}
                        <motion.img 
                            initial={{ x: -80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=500" 
                            alt="Premium Bike"
                            className="absolute top-24 left-4 w-44 md:w-64 object-contain rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm bg-black/20"
                        />

                        {/* Yellow Sports Car (Front Center) */}
                        <motion.img 
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=700" 
                            alt="Premium Yellow Car"
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 md:w-96 object-contain rounded-2xl shadow-2xl border border-white/15"
                            style={{ filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.6))" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
