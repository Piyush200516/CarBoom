import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
    question: string;
    answer: string;
}

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "How do I book a vehicle on CarBoom?",
            answer: "Booking a vehicle is simple! Enter your location, choose your pickup and return dates, browse the list of available vehicles, and select the one that fits your needs. Complete the secure online payment to confirm your booking. The owner will get in touch to coordinate the handoff."
        },
        {
            question: "What documents are required to rent a vehicle?",
            answer: "To rent any vehicle on CarBoom, you must upload a valid Driving License (DL) matching the vehicle class (e.g., LMV for cars, MCWG for bikes). Additionally, you need to provide a government-issued photo ID like Aadhaar or Passport."
        },
        {
            question: "Is insurance included in the rental price?",
            answer: "Yes, all rentals booked through CarBoom are protected by standard comprehensive third-party insurance coverage. Additionally, we offer optional bumper-to-bumper collision damage waiver (CDW) plans at check-out for added peace of mind."
        },
        {
            question: "What happens in case of an accident or breakdown?",
            answer: "CarBoom provides 24/7 Roadside Assistance. In the rare event of a breakdown or accident, simply contact our support helpline via the app. We will coordinate towing, roadside repairs, or a replacement vehicle if available, and help document any insurance claims."
        },
        {
            question: "How do I list my vehicle and start earning?",
            answer: "Click on 'Become an Owner' or 'List Your Vehicle'. Fill out the vehicle details, upload high-quality photos, set your rental price, and submit your registration documents for verification. Once approved (usually within 24 hours), your listing goes live and you can start accepting bookings!"
        }
    ];

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-white relative">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 font-light">
                        Quick answers to help you navigate your rental journey with ease
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = activeIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className={`border rounded-[20px] transition-all duration-300 overflow-hidden cursor-pointer ${
                                    isOpen 
                                        ? "border-yellow-400/50 bg-[#fffbeb] shadow-md" 
                                        : "border-gray-100 bg-[#f9fafb] hover:bg-white hover:border-gray-200 shadow-sm"
                                }`}
                                onClick={() => toggleFaq(idx)}
                            >
                                {/* Question Header */}
                                <div className="flex items-center justify-between p-6 select-none">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className={`shrink-0 ${isOpen ? "text-yellow-600" : "text-gray-400"}`} size={20} />
                                        <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isOpen ? "bg-yellow-400 text-black rotate-180" : "bg-gray-100 text-gray-400"
                                    }`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </div>

                                {/* Answer Dropdown */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed font-light border-t border-yellow-400/10">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FaqSection;
