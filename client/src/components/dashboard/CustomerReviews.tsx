import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        id: "1",
        name: "Priya Nair",
        role: "Renter",
        avatar: "https://i.pravatar.cc/150?img=49",
        rating: 5,
        comment: "I rented the Royal Enfield Meteor for a weekend trip to Coorg. The booking was seamless, and the bike was in absolute showroom condition. Highly recommend CarBoom!",
        vehicle: "Royal Enfield Meteor 350"
    },
    {
        id: "2",
        name: "Rajesh Khandelwal",
        role: "Owner",
        avatar: "https://i.pravatar.cc/150?img=68",
        rating: 5,
        comment: "Listing my Thar on CarBoom has helped me cover my monthly EMI and even make a profit. The verification process for renters is robust.",
        vehicle: "Thar Earth Edition 4x4"
    },
    {
        id: "3",
        name: "Ananya Deshmukh",
        role: "Renter",
        avatar: "https://i.pravatar.cc/150?img=45",
        rating: 4,
        comment: "Excellent service! Rented an Ola S1 Pro for a few hours to run errands around town. Much cheaper than booking auto-rickshaws or cabs.",
        vehicle: "Ola S1 Pro Gen 2"
    }
];

const CustomerReviews = () => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-6">What Our Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300 shadow-lg group hover:bg-white/5"
                    >
                        <div>
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-600 text-gray-600"} 
                                    />
                                ))}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{review.comment}"</p>
                        </div>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full border border-white/10" />
                            <div>
                                <h4 className="text-white text-sm font-bold">{review.name}</h4>
                                <p className="text-xs text-gray-500 font-medium">{review.role} • {review.vehicle}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CustomerReviews;
