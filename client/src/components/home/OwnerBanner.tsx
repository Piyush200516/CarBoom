import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const OwnerBanner = () => {
    return (
        <section id="become-owner" className="py-12 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                    {/* Glowing Accent */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full filter blur-[80px] pointer-events-none" />

                    {/* Left Column (Content & Stats) */}
                    <div className="lg:col-span-7 flex flex-col gap-6 relative z-10">
                        <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest font-heading">
                            Earn with CarBoom
                        </span>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                            Become an <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Owner</span>
                        </h2>

                        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-lg">
                            List your vehicle and start earning today. Rent it out to verified users in your city. It's easy, secure and completely hassle-free!
                        </p>

                        <Link to="/become-owner">
                            <button className="w-fit bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-yellow-glow-hover transition cursor-pointer">
                                List Your Vehicle
                                <ArrowRight size={16} />
                            </button>
                        </Link>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-4">
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-3xl font-black text-white">10K+</span>
                                <span className="text-xs text-gray-400 mt-1">Active Owners</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-3xl font-black text-white">25K+</span>
                                <span className="text-xs text-gray-400 mt-1">Vehicles Listed</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-3xl font-black text-white">₹5Cr+</span>
                                <span className="text-xs text-gray-400 mt-1">Monthly Earnings</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Car Image) */}
                    <div className="lg:col-span-5 relative w-full h-[220px] md:h-[300px] flex items-center justify-center select-none mt-6 lg:mt-0">
                        <motion.img 
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" 
                            alt="Luxury Black Sedan"
                            className="w-full object-contain rounded-2xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                            style={{ filter: "drop-shadow(0 20px 20px rgba(0, 0, 0, 0.7))" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OwnerBanner;
