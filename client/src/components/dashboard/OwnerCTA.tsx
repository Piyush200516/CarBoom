import { motion } from "framer-motion";

const OwnerCTA = () => {
    return (
        <section className="my-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gradient-to-r from-gray-900 to-[#1e293b] rounded-[2rem] p-10 md:p-14 overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="relative z-10 md:max-w-xl text-center md:text-left mb-8 md:mb-0">
                    <span className="inline-block px-4 py-1.5 bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-yellow-400/20">
                        Become a Host
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                        Earn Money by Renting Your Vehicle
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                        Join thousands of verified owners on CarBoom. List your car, bike, or scooter and start earning up to ₹50,000 per month. We provide full insurance coverage.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button className="bg-yellow-400 text-black font-bold py-3.5 px-8 rounded-xl hover:bg-yellow-300 transition shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:shadow-[0_0_25px_rgba(255,193,7,0.6)]">
                            List Your Vehicle
                        </button>
                        <button className="bg-white/10 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/20 transition border border-white/10">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="relative z-10 w-full md:w-1/3 flex justify-center">
                    <img 
                        src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600" 
                        alt="Owner Car" 
                        className="w-full max-w-[300px] h-[300px] object-cover rounded-full border-4 border-[#1e293b] shadow-2xl"
                    />
                    
                    {/* Floating badge */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold">₹</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Earned</p>
                            <p className="text-lg font-black text-gray-900">₹42,500</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default OwnerCTA;
