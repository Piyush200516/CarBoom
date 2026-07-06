// src/pages/BecomeOwner/index.tsx
import * as React from "react";
import { Coins, Verified, ShieldCheck, Percent, UserPlus, FileCheck2, CarFront, CalendarCheck, Landmark, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FAQAccordion } from "../../components/common/FAQAccordion";

export const BecomeOwner = () => {
  const benefits = [
    {
      title: "Higher Earnings",
      description: "Keep up to 85% of the rental fee. Earn regular passive income from your idle cars, bikes, or scooters.",
      icon: Coins,
    },
    {
      title: "100% Verified Users",
      description: "We verify every renter's driver's license, government ID, and contact details before booking.",
      icon: Verified,
    },
    {
      title: "Insurance Support",
      description: "Damage protection and roadside assistance are active during every trip. Keep your vehicle safe.",
      icon: ShieldCheck,
    },
    {
      title: "Flexible Pricing",
      description: "Set your own hourly/daily rates, customize calendars, and block dates whenever you need your ride.",
      icon: Percent,
    },
  ];

  const steps = [
    {
      title: "Create Account",
      description: "Register as a CarBoom owner. It takes less than 2 minutes.",
      icon: UserPlus,
    },
    {
      title: "Verify Documents",
      description: "Upload your RC, Insurance, and PUC for quick verification.",
      icon: FileCheck2,
    },
    {
      title: "Add Vehicle Details",
      description: "Upload high-quality photos, set pricing, and mark availability.",
      icon: CarFront,
    },
    {
      title: "Receive Bookings",
      description: "Approve bookings, coordinate pickups, and handover keys.",
      icon: CalendarCheck,
    },
    {
      title: "Earn Money",
      description: "Earnings are credited directly to your bank account weekly.",
      icon: Landmark,
    },
  ];

  const faqItems = [
    {
      id: "fo1",
      question: "Is my vehicle safe with CarBoom?",
      answer: "Yes! We run background and license verification on all renters. Furthermore, CarBoom provides full insurance backup and damage protection for the entire rental duration.",
    },
    {
      id: "fo2",
      question: "How do I get paid?",
      answer: "Your earnings are calculated based on your customized hourly/daily rates. We transfer funds directly to your linked bank account every Wednesday.",
    },
    {
      id: "fo3",
      question: "What vehicle documents are required?",
      answer: "You will need to upload your Registration Certificate (RC), Active Vehicle Insurance, and Pollution Under Control (PUC) certificate during the vehicle addition process.",
    },
    {
      id: "fo4",
      question: "Can I use my vehicle while it is listed?",
      answer: "Absolutely! You have full control. Simply open your Owner Dashboard and block out the dates you need to use your vehicle.",
    },
  ];

  const successStories = [
    {
      name: "Ramesh Kumar",
      city: "Indore",
      vehicle: "Thar 4x4 & Activa 6G",
      earnings: "₹35,000/mo",
      avatar: "https://i.pravatar.cc/150?img=11",
      quote: "My SUV used to sit idle in the garage during weekdays. Now it covers its own EMI and helps me invest in other side projects. CarBoom has been a lifesaver!",
    },
    {
      name: "Siddhi Patel",
      city: "Surat",
      vehicle: "Ola S1 Pro & Hunter 350",
      earnings: "₹18,000/mo",
      avatar: "https://i.pravatar.cc/150?img=44",
      quote: "Listing my e-scooter and bike was super simple. The team handles all verifications. Weekly payouts are fast and the support is top-notch.",
    },
  ];

  const [activeStory, setActiveStory] = React.useState(0);

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative bg-gray-950 text-white rounded-[32px] overflow-hidden p-8 md:p-16 border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center gap-12">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full filter blur-3xl" />

          {/* Text Left */}
          <div className="flex-1 text-left space-y-6 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              List &amp; Earn Passive Income
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Earn Money From Your <span className="text-yellow-400">Vehicle</span>
            </h1>
            <p className="text-gray-400 font-semibold text-sm md:text-base leading-relaxed">
              Join thousands of owners in Tier-2 and Tier-3 cities in India. Turn your idle car, motorcycle, or scooter into a high-earning business.
            </p>
            <div className="pt-2">
              <Link to="/signup">
                <Button variant="primary" className="font-extrabold uppercase tracking-wider text-xs">
                  List Your Vehicle
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image/Graphic (dashboard simulation) */}
          <div className="flex-1 w-full max-w-md relative z-10">
            <Card variant="dark" className="border border-white/10 bg-gray-900/60 backdrop-blur-md text-left p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weekly Earnings</h4>
                  <div className="text-3xl font-black text-white mt-1">₹12,450</div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                  +18% vs last week
                </span>
              </div>

              {/* Mini chart visual */}
              <div className="h-16 flex items-end gap-3 mb-6">
                <div className="w-full bg-white/10 rounded-t-lg h-2/5" />
                <div className="w-full bg-white/10 rounded-t-lg h-3/5" />
                <div className="w-full bg-white/10 rounded-t-lg h-4/5" />
                <div className="w-full bg-yellow-400 rounded-t-lg h-full" />
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 text-center">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Trips</div>
                  <div className="font-extrabold text-white text-base mt-0.5">14</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Hours Active</div>
                  <div className="font-extrabold text-white text-base mt-0.5">86 hrs</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Rating</div>
                  <div className="font-extrabold text-yellow-400 text-base mt-0.5 flex items-center justify-center gap-0.5">
                    4.9 <Star size={12} fill="currentColor" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
            Why Partner With Us
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Owner Benefits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="bg-white border border-gray-100 p-6 rounded-[20px] text-left hover:border-yellow-400 transition-all h-full">
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

      {/* Timeline How It Works */}
      <section className="bg-white py-20 border-y border-gray-100 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
              Simple Listing Steps
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Getting Started in 5 Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card key={idx} className="bg-gray-50 border-gray-100/80 rounded-[20px] p-6 text-center h-full flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-extrabold mb-4 shadow-sm">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wide">
                    {idx + 1}. {s.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                    {s.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Testimonial Carousel */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
            Real Stories
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Success Stories</h2>
        </div>

        <Card className="bg-white border border-gray-100 rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-sm text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full filter blur-xl" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={successStories[activeStory].avatar}
                  alt={successStories[activeStory].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{successStories[activeStory].name}</h4>
                  <div className="text-xs font-bold text-gray-400 uppercase">
                    Owner from {successStories[activeStory].city} • Lists {successStories[activeStory].vehicle}
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-600 text-sm md:text-base font-semibold italic leading-relaxed">
                "{successStories[activeStory].quote}"
              </blockquote>

              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="text-sm font-black text-gray-900 uppercase">
                  Monthly Earnings: <span className="text-yellow-600">{successStories[activeStory].earnings}</span>
                </div>
                
                {/* Dots controller */}
                <div className="flex gap-2">
                  {successStories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStory(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeStory === i ? "w-6 bg-yellow-400" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900">Owner FAQ</h2>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            Frequently asked questions about listing and earning on CarBoom.
          </p>
        </div>

        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
};

export default BecomeOwner;
