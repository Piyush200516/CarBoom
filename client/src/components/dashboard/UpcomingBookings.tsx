import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

const bookings = [
    {
        id: "BK-1029",
        vehicle: "Tesla Model Y",
        date: "Tomorrow",
        time: "10:00 AM",
        location: "Indore Airport (IDR)",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: "BK-1035",
        vehicle: "Royal Enfield Meteor",
        date: "Jul 18, 2026",
        time: "08:00 AM",
        location: "City Center, Bhopal",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=200"
    }
];

const UpcomingBookings = () => {
    return (
        <section className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Upcoming Trips</h2>
                <button className="text-sm font-semibold text-gray-400 hover:text-white transition">See All</button>
            </div>
            
            <div className="flex-1 bg-[#111827] rounded-3xl p-6 border border-white/5 flex flex-col gap-5 shadow-lg">
                {bookings.map((booking, index) => (
                    <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-400/30 transition group cursor-pointer"
                    >
                        <img 
                            src={booking.image} 
                            alt={booking.vehicle} 
                            className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm truncate group-hover:text-yellow-400 transition">{booking.vehicle}</h4>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400 font-medium">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {booking.time}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500 truncate">
                                <MapPin size={12} /> {booking.location}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-yellow-400 transition" />
                        </div>
                    </motion.div>
                ))}

                <button className="mt-auto w-full py-3 rounded-xl border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 text-sm font-semibold transition">
                    + Book Another Ride
                </button>
            </div>
        </section>
    );
};

export default UpcomingBookings;
