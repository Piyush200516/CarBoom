import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { RatingStars } from "../../../components/common/RatingStars";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Nair",
    role: "Renter",
    avatar: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    comment: "I rented the Royal Enfield Meteor for a weekend trip to Coorg. The booking was seamless, and the bike was in absolute showroom condition. Highly recommend CarBoom for Tier-2 cities!",
    location: "Mysore, Karnataka"
  },
  {
    id: "t2",
    name: "Rajesh Khandelwal",
    role: "Owner",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    comment: "Listing my Thar on CarBoom has helped me cover my monthly EMI and even make a profit. The verification process for renters is robust, so I never worry about vehicle safety.",
    location: "Jaipur, Rajasthan"
  },
  {
    id: "t3",
    name: "Ananya Deshmukh",
    role: "Renter",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    comment: "Excellent service! Rented an Ola S1 Pro for a few hours to run errands around town. Much cheaper than booking auto-rickshaws or cabs, and I got to drive at my own pace.",
    location: "Nashik, Maharashtra"
  }
];

export const CustomerReviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mb-16 text-center">
      <div className="mb-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Renter Feedback</span>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider mt-0.5">What Our Customers Say</h2>
      </div>

      <Card
        variant="glass"
        className="relative overflow-hidden border border-white/5 p-8 md:p-12 shadow-2xl bg-gradient-to-br from-[#111827]/40 to-[#0f172a]/60 backdrop-blur-md min-h-[260px] flex flex-col justify-between text-left"
      >
        <Quote className="absolute top-6 right-8 text-white/5 w-24 h-24 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Stars & Comment */}
            <div className="space-y-4">
              <RatingStars rating={TESTIMONIALS[activeIndex].rating} size={15} />
              <blockquote className="text-gray-300 text-sm md:text-base font-semibold leading-relaxed italic">
                "{TESTIMONIALS[activeIndex].comment}"
              </blockquote>
            </div>

            {/* Profile Row */}
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[activeIndex].avatar}
                  alt={TESTIMONIALS[activeIndex].name}
                  className="w-11 h-11 rounded-full object-cover border border-yellow-400/50 shadow-sm"
                />
                <div>
                  <h4 className="font-extrabold text-white text-xs md:text-sm leading-tight">
                    {TESTIMONIALS[activeIndex].name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
                    {TESTIMONIALS[activeIndex].role} • {TESTIMONIALS[activeIndex].location}
                  </p>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 text-gray-400 transition cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 text-gray-400 transition cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </section>
  );
};

export default CustomerReviews;
