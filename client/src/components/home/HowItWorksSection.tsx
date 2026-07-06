import { Search, Calendar, CreditCard, Smile } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
    const steps = [
        {
            num: "01",
            title: "Search Vehicle",
            desc: "Search for cars, bikes or scooters near you.",
            icon: Search
        },
        {
            num: "02",
            title: "Choose Dates",
            desc: "Select pickup and return dates that suit you.",
            icon: Calendar
        },
        {
            num: "03",
            title: "Book & Pay",
            desc: "Book your vehicle securely and make payment.",
            icon: CreditCard
        },
        {
            num: "04",
            title: "Ride & Enjoy",
            desc: "Enjoy your ride and reach your destination.",
            icon: Smile
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
                        How CarBoom Works?
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 font-light">
                        Rent your favorite vehicle in 4 simple and quick steps
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Connecting dashed line for Desktop */}
                    <div className="hidden lg:block absolute top-12 left-1/8 right-1/8 h-0.5 border-t-2 border-dashed border-gray-200 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                                    className="flex flex-col items-center text-center group cursor-pointer"
                                >
                                    {/* Icon Badge */}
                                    <div className="relative mb-6">
                                        {/* Outer glowing ring under hover */}
                                        <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-20 group-hover:scale-125 transition duration-300 -z-10" />
                                        
                                        <div className="w-20 h-20 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg group-hover:shadow-yellow-glow transition duration-300">
                                            <Icon size={28} />
                                        </div>

                                        {/* Step Counter Label */}
                                        <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-yellow-400 border border-yellow-400/20 text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
                                            {step.num}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light px-4">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
