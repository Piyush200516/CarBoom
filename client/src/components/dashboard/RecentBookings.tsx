import { motion } from "framer-motion";

const recentBookings = [
    {
        id: "BK-0982",
        vehicle: "Audi A6",
        date: "Jul 10, 2026",
        status: "Completed",
        amount: "₹4,500",
        image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=150"
    },
    {
        id: "BK-0951",
        vehicle: "Jeep Compass",
        date: "Jul 05, 2026",
        status: "Completed",
        amount: "₹7,600",
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=150"
    },
    {
        id: "BK-0912",
        vehicle: "Hyundai Creta",
        date: "Jun 28, 2026",
        status: "Cancelled",
        amount: "₹0",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=150"
    },
    {
        id: "BK-0899",
        vehicle: "BMW G 310 RR",
        date: "Jun 15, 2026",
        status: "Completed",
        amount: "₹1,200",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150"
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
};

const RecentBookings = () => {
    return (
        <section className="mb-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Recent Bookings</h2>
                <button className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition">View All History</button>
            </div>
            
            <div className="bg-[#111827] border border-white/5 rounded-3xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5 text-xs uppercase tracking-wider text-gray-400">
                                <th className="py-4 px-6 font-semibold">Vehicle</th>
                                <th className="py-4 px-6 font-semibold">Booking ID</th>
                                <th className="py-4 px-6 font-semibold">Date</th>
                                <th className="py-4 px-6 font-semibold">Amount</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentBookings.map((booking, index) => (
                                <motion.tr 
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="hover:bg-white/[0.02] transition"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={booking.image} alt={booking.vehicle} className="w-12 h-10 object-cover rounded-lg border border-white/10" />
                                            <span className="font-bold text-white">{booking.vehicle}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-400 font-medium">{booking.id}</td>
                                    <td className="py-4 px-6 text-sm text-gray-300 font-medium">{booking.date}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-white">{booking.amount}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-sm font-semibold text-gray-400 hover:text-white transition">Details</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default RecentBookings;
