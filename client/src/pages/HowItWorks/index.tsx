// src/pages/HowItWorks/index.tsx
import { Search, ShieldCheck, MapPin, CalendarRange, CreditCard, MessageSquare, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Search Vehicle",
      description: "Browse nearby cars, bikes, scooters, and cycles. Use custom filters to match your needs and budget.",
      icon: Search,
      color: "from-yellow-400 to-amber-500",
    },
    {
      number: "02",
      title: "Book Online",
      description: "Select rental dates (from 1 hour to 1 week), upload documents, and make secure payment instantly.",
      icon: CalendarRange,
      color: "from-emerald-400 to-teal-500",
    },
    {
      number: "03",
      title: "Ride",
      description: "Meet the owner at the pickup spot or opt for home delivery. Key handover is secure and digital.",
      icon: MapPin,
      color: "from-blue-400 to-indigo-500",
    },
    {
      number: "04",
      title: "Return Vehicle",
      description: "Drop the vehicle back at the designated location with a full tank (or return fuel state). Simple and hassle-free.",
      icon: ShieldCheck,
      color: "from-purple-400 to-pink-500",
    },
  ];

  const benefits = [
    {
      title: "Verified Owners",
      description: "Every listing is double-checked by our team. Vehicles are fully inspected, registered, and insured.",
      icon: ShieldCheck,
    },
    {
      title: "Secure Payments",
      description: "Payments are processed securely via Stripe. Transparent pricing with zero hidden convenience fees.",
      icon: CreditCard,
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock roadside assistance and chat support to keep you safe and moving.",
      icon: MessageSquare,
    },
    {
      title: "Flexible Rentals",
      description: "Book for just 1 hour, 1 day, or an entire week. Scale your rental period dynamically.",
      icon: CalendarClock,
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-full">
            Process Breakdown
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-6 tracking-tight">
            How <span className="text-yellow-500">CarBoom</span> Works
          </h1>
          <p className="text-gray-500 font-semibold mt-4 text-base md:text-lg">
            Rent vehicles directly from verified owners in your city. It's fast, affordable, and fully secure.
          </p>
        </motion.div>
      </section>

      {/* Steps Timeline Section */}
      <section className="bg-gray-50 py-20 border-y border-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Step Connector Line (only for desktop) */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-14 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-0.5 bg-gradient-to-r from-gray-200 to-transparent group-hover:from-yellow-400 transition-colors duration-500" />
                  )}

                  <Card className="bg-white border border-gray-100 rounded-[24px] p-8 text-center hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center">
                    {/* Circle Icon */}
                    <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-600 mb-6 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                    {/* Number */}
                    <div className="text-[10px] font-black uppercase text-yellow-500 tracking-wider mb-2">
                      Step {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">
            Our Advantages
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Why Choose CarBoom</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="bg-white border border-gray-100 p-6 rounded-[20px] text-left hover:border-yellow-400/50 transition-colors h-full">
                  <div className="w-10 h-10 rounded-[14px] bg-yellow-400/10 flex items-center justify-center text-yellow-600 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                    {b.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-950 text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Decorative gradients */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-yellow-400/10 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-400/10 rounded-full filter blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Ready to Hit the <span className="text-yellow-400">Road?</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
              Find the perfect ride in your town. Compare prices, vehicle models, and ratings easily. Or list your idle vehicle and start earning passive income today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link to="/browse">
                <Button variant="primary" className="font-extrabold uppercase tracking-wider text-xs">
                  Browse Vehicles
                </Button>
              </Link>
              <Link to="/become-owner">
                <Button variant="outline" className="font-extrabold uppercase tracking-wider text-xs text-white border-white/20 hover:border-yellow-400">
                  Become an Owner
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HowItWorks;
