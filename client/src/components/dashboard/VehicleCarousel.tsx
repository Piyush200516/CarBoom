import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import VehicleCard from "../../components/common/VehicleCard";
import { Vehicle } from "../../data/mockData";

interface VehicleCarouselProps {
    title: string;
    vehicles: Vehicle[];
}

const VehicleCarousel = ({ title, vehicles }: VehicleCarouselProps) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                <button className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition">
                    View All <ArrowRight size={16} />
                </button>
            </div>
            
            {/* We could use a real carousel library, but a scrollable flex container is often better for this UX on modern devices */}
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {vehicles.map((vehicle, index) => (
                    <motion.div 
                        key={vehicle.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-start"
                    >
                        <VehicleCard vehicle={vehicle} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default VehicleCarousel;
