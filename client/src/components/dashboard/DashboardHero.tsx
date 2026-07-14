import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Car } from "lucide-react";
import { useAuth } from "../../store/AuthContext";

const DashboardHero = () => {
    const { user } = useAuth();

    return (
        <section className="relative rounded-[2rem] overflow-hidden min-h-[400px] flex items-center shadow-2xl mt-8">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=2000" 
                    alt="Dark luxury car" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-10 items-center justify-between">
                
                <div className="flex-1 text-left">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                    >
                        Welcome back, <span className="text-yellow-400">{user?.name?.split(' ')[0] || 'Piyush'}</span> 👋
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-gray-300 text-lg max-w-lg mb-8"
                    >
                        Find your perfect ride today. Discover premium cars, bikes, and scooters near your location.
                    </motion.p>
                </div>

                {/* Search Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full lg:w-[450px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                >
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 block">Pickup Location</label>
                            <div className="flex items-center bg-[#0b0f19]/50 border border-white/10 rounded-xl px-3 py-2.5">
                                <MapPin size={18} className="text-yellow-400 mr-2" />
                                <select className="bg-transparent text-white w-full outline-none appearance-none cursor-pointer">
                                    <option className="bg-[#111827]">Indore</option>
                                    <option className="bg-[#111827]">Bhopal</option>
                                    <option className="bg-[#111827]">Delhi</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 block">Pickup Date</label>
                                <div className="flex items-center bg-[#0b0f19]/50 border border-white/10 rounded-xl px-3 py-2.5">
                                    <Calendar size={18} className="text-gray-400 mr-2" />
                                    <input type="date" className="bg-transparent text-white w-full outline-none text-sm" />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 block">Return Date</label>
                                <div className="flex items-center bg-[#0b0f19]/50 border border-white/10 rounded-xl px-3 py-2.5">
                                    <Calendar size={18} className="text-gray-400 mr-2" />
                                    <input type="date" className="bg-transparent text-white w-full outline-none text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1 block">Vehicle Type</label>
                            <div className="flex items-center bg-[#0b0f19]/50 border border-white/10 rounded-xl px-3 py-2.5">
                                <Car size={18} className="text-gray-400 mr-2" />
                                <select className="bg-transparent text-white w-full outline-none appearance-none cursor-pointer">
                                    <option className="bg-[#111827]">Any Type</option>
                                    <option className="bg-[#111827]">SUV</option>
                                    <option className="bg-[#111827]">Sedan</option>
                                    <option className="bg-[#111827]">Luxury</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 transition duration-300 shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:shadow-[0_0_25px_rgba(255,193,7,0.6)]">
                            <Search size={18} />
                            Search Vehicles
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default DashboardHero;
