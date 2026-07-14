import { motion } from "framer-motion";
import { Car, Tag, CalendarCheck, Award } from "lucide-react";

const stats = [
    {
        title: "Available Cars",
        value: "2,450+",
        icon: <Car size={24} className="text-blue-400" />,
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20"
    },
    {
        title: "Today's Offers",
        value: "15",
        icon: <Tag size={24} className="text-yellow-400" />,
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/20"
    },
    {
        title: "Active Bookings",
        value: "2",
        icon: <CalendarCheck size={24} className="text-emerald-400" />,
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/20"
    },
    {
        title: "Reward Points",
        value: "1,250",
        icon: <Award size={24} className="text-purple-400" />,
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/20"
    }
];

const QuickStats = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`bg-[#111827] border ${stat.borderColor} rounded-2xl p-6 flex items-center gap-5 hover:-translate-y-1 transition duration-300 group shadow-lg`}
                >
                    <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        {stat.icon}
                    </div>
                    <div>
                        <h4 className="text-gray-400 text-sm font-semibold mb-1">{stat.title}</h4>
                        <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                    </div>
                </motion.div>
            ))}
        </section>
    );
};

export default QuickStats;
