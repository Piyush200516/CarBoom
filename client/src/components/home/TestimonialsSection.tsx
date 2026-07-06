import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
    name: string;
    role: string;
    avatar: string;
    review: string;
    rating: number;
}

const TestimonialsSection = () => {
    const testimonials: Testimonial[] = [
        {
            name: "Rohit Sharma",
            role: "Verified Renter",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
            review: "Amazing experience! The car was clean, well-maintained and the booking process was super easy.",
            rating: 5
        },
        {
            name: "Priya Mehta",
            role: "Verified Renter",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
            review: "Best platform to rent bikes! Affordable prices and great service by owners.",
            rating: 5
        },
        {
            name: "Ankit Verma",
            role: "Vehicle Owner",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
            review: "Listed my car on CarBoom and now earning good income every month.",
            rating: 5
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-[#f9fafb] relative overflow-hidden">
            {/* Ambient subtle details */}
            <div className="absolute top-10 left-10 text-gray-200 pointer-events-none opacity-50">
                <MessageSquare size={160} className="stroke-[0.5]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-16">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight font-heading">
                            What Our Users Say
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 font-light">
                            Read reviews from verified renters and vehicle owners in our community
                        </p>
                    </div>
                    <button className="text-sm font-bold text-gray-900 hover:text-yellow-600 transition cursor-pointer">
                        View all reviews ➔
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between"
                        >
                            {/* Quotes icon */}
                            <div className="absolute top-6 right-8 text-yellow-400/20 font-serif text-7xl select-none leading-none">
                                ”
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* Stars */}
                                <div className="flex items-center gap-1">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="text-sm text-gray-600 leading-relaxed font-light italic">
                                    "{t.review}"
                                </p>
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-50">
                                <img 
                                    src={t.avatar} 
                                    alt={t.name} 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400/30"
                                />
                                <div className="flex flex-col">
                                    <h4 className="text-sm font-bold text-gray-950">{t.name}</h4>
                                    <span className="text-[11px] font-semibold text-gray-400">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TestimonialsSection;
