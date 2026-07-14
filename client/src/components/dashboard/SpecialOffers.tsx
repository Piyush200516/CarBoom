import { motion } from "framer-motion";

const SpecialOffers = () => {
    return (
        <section className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Special Offers</h2>
            
            <div className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                
                <div className="relative z-10 max-w-md">
                    <span className="inline-block px-3 py-1 bg-black/20 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        Limited Time
                    </span>
                    <h3 className="text-3xl font-extrabold text-white mb-3">Get 20% Off Your First Ride</h3>
                    <p className="text-yellow-50 mb-6">
                        Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">WELCOME20</span> at checkout to claim your discount.
                    </p>
                    <button className="bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition shadow-lg w-fit">
                        Claim Offer
                    </button>
                </div>
                
                <motion.img 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400" 
                    alt="Offer Car" 
                    className="absolute right-0 bottom-0 w-[45%] object-cover object-left mask-image-linear hidden sm:block rounded-br-3xl"
                    style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)' }}
                />
            </div>
        </section>
    );
};

export default SpecialOffers;
