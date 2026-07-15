import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Landmark } from "lucide-react";
import { Card } from "../../../components/ui/Card";

interface StoryItem {
  name: string;
  city: string;
  vehicle: string;
  earnings: string;
  avatar: string;
  quote: string;
  rating: number;
}

const STORIES: StoryItem[] = [
  {
    name: "Ramesh Kumar",
    city: "Indore",
    vehicle: "Mahindra Thar 4x4",
    earnings: "₹38,500/mo",
    avatar: "https://i.pravatar.cc/150?img=11",
    quote: "My SUV sat in the garage during office hours. Listing it on CarBoom was smooth. The verification process is thorough, and the passive income now covers my SUV's monthly EMI.",
    rating: 5
  },
  {
    name: "Siddhi Patel",
    city: "Pune",
    vehicle: "Ather 450X Apex",
    earnings: "₹14,200/mo",
    avatar: "https://i.pravatar.cc/150?img=44",
    quote: "As a student, listing my electric scooter was the best decision. I set my own calendar blockouts for exam weeks, and get weekly payments directly to my bank account. Excellent support!",
    rating: 5
  },
  {
    name: "Abhishek Sharma",
    city: "Bangalore",
    vehicle: "BMW G 310 RR",
    earnings: "₹24,000/mo",
    avatar: "https://i.pravatar.cc/150?img=68",
    quote: "Renting my sports bike out initially felt risky. But CarBoom's safety deposit caps and GPS-linked insurance coverage put me completely at ease. I'm adding a second bike next month!",
    rating: 5
  }
];

export const SuccessStories: React.FC = () => {
  const [activeStory, setActiveStory] = React.useState(0);

  return (
    <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
      <div className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Host Testimonials</span>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-1 font-heading text-white">
          Success Stories
        </h2>
        <p className="text-gray-400 text-xs font-semibold mt-2">
          Read what local owners say about vehicle safety, earnings margin, and platform controls.
        </p>
      </div>

      <Card
        variant="glass"
        className="bg-[#111827]/45 border border-white/10 rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-2xl text-left"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full filter blur-xl pointer-events-none" />
        <Quote className="absolute top-6 right-8 text-white/5 w-24 h-24 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Review Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src={STORIES[activeStory].avatar}
                alt={STORIES[activeStory].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 shadow"
              />
              <div>
                <h4 className="font-extrabold text-white text-base leading-tight">
                  {STORIES[activeStory].name}
                </h4>
                <div className="text-[10px] font-bold text-gray-500 uppercase mt-1 tracking-wider">
                  {STORIES[activeStory].city} • Lists {STORIES[activeStory].vehicle}
                </div>
              </div>
            </div>

            {/* Quote comment */}
            <blockquote className="text-gray-300 text-xs md:text-sm font-semibold italic leading-relaxed">
              "{STORIES[activeStory].quote}"
            </blockquote>

            {/* Bottom Income highlight and selectors */}
            <div className="flex justify-between items-center pt-5 border-t border-white/5">
              <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Landmark size={13} className="text-yellow-400" /> 
                <span>Earnings:</span> 
                <span className="text-yellow-400 font-black">{STORIES[activeStory].earnings}</span>
              </div>
              
              {/* Dots selector */}
              <div className="flex gap-2">
                {STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStory(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeStory === i ? "w-6 bg-yellow-400" : "bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label={`Show story ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </section>
  );
};

export default SuccessStories;
