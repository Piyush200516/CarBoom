// src/pages/BecomeOwner/index.tsx
import * as React from "react";
import { 
  Coins, Verified, ShieldCheck, UserPlus, FileCheck2, 
  CalendarCheck, Landmark, Star, DollarSign, 
  ShieldCheck as VerifiedBadge, Users, ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { FAQAccordion } from "../../components/common/FAQAccordion";
import { useToast } from "../../components/ui/Toast";

export const BecomeOwner = () => {
  const { toast } = useToast();

  // Statistics
  const stats = [
    { label: "Vehicles Listed", value: "1,200+", description: "Cars, scooters, and cruisers active" },
    { label: "Active Owners", value: "850+", description: "Earning passive cash weekly" },
    { label: "Monthly Earnings", value: "₹45,000", description: "Average top owner income" },
    { label: "Cities Covered", value: "18+", description: "Expanding across India monthly" }
  ];

  // Benefits
  const benefits = [
    {
      title: "Comprehensive Insurance",
      description: "Damage protection and continuous roadside support are active throughout every customer rental period.",
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-teal-500/5",
      border: "hover:border-emerald-500/30"
    },
    {
      title: "100% Verified Renters",
      description: "We enforce strict license checkups, Aadhaar verification, and credit scores before key handovers.",
      icon: Verified,
      color: "from-blue-500/20 to-indigo-500/5",
      border: "hover:border-blue-500/30"
    },
    {
      title: "24/7 Dedicated Support",
      description: "An exclusive hotline for platform owners to report damage, coordinate returns, or log emergencies.",
      icon: Users,
      color: "from-purple-500/20 to-pink-500/5",
      border: "hover:border-purple-500/30"
    },
    {
      title: "Zero Setup Fees",
      description: "Listing your vehicle and syncing calendar availability is completely free. We only charge when you earn.",
      icon: Coins,
      color: "from-yellow-500/20 to-amber-500/5",
      border: "hover:border-yellow-500/30"
    }
  ];

  // How it Works Steps
  const steps = [
    {
      step: "01",
      title: "Register Profile",
      description: "Sign up as an owner and fill out your vehicle's make, model, registration, and basic address info.",
      icon: UserPlus
    },
    {
      step: "02",
      title: "Upload Documents",
      description: "Provide the Registration Certificate (RC), active Insurance, and pollution certificate (PUC) photo.",
      icon: FileCheck2
    },
    {
      step: "03",
      title: "Vehicle Approval",
      description: "Our operations group checks the RC details and approves the vehicle listing live in under 24 hours.",
      icon: VerifiedBadge
    },
    {
      step: "04",
      title: "Receive Bookings",
      description: "Accept rental requests, coordinate key handovers or dropoffs directly, and lock/unlock trip statuses.",
      icon: CalendarCheck
    },
    {
      step: "05",
      title: "Get Paid",
      description: "Earnings are compiled weekly and credited directly to your bank account every Wednesday morning.",
      icon: Landmark
    }
  ];

  // Success Stories
  const successStories = [
    {
      name: "Ramesh Kumar",
      city: "Indore",
      vehicle: "Mahindra Thar 4x4",
      earnings: "₹38,500/mo",
      avatar: "https://i.pravatar.cc/150?img=11",
      quote: "My SUV sat in the garage during office hours. Listing it on CarBoom was smooth. The verification process is thorough, and the passive income now covers my SUV's monthly EMI."
    },
    {
      name: "Siddhi Patel",
      city: "Pune",
      vehicle: "Ather 450X Apex",
      earnings: "₹14,200/mo",
      avatar: "https://i.pravatar.cc/150?img=44",
      quote: "As a student, listing my electric scooter was the best decision. I set my own calendar blockouts for exam weeks, and get weekly payments directly to my bank account. Excellent support!"
    },
    {
      name: "Abhishek Sharma",
      city: "Bangalore",
      vehicle: "BMW G 310 RR",
      earnings: "₹24,000/mo",
      avatar: "https://i.pravatar.cc/150?img=68",
      quote: "Renting my sports bike out initially felt risky. But CarBoom's safety deposit caps and GPS-linked insurance coverage put me completely at ease. I'm adding a second bike next month!"
    }
  ];

  const [activeStory, setActiveStory] = React.useState(0);

  // FAQs
  const faqItems = [
    {
      id: "fo1",
      question: "Is my vehicle safe with CarBoom renters?",
      answer: "Absolutely! We do thorough license verifications and identity checks on all renters. We also pre-authorize a safety deposit prior to checkout, and our onboard telematics track location and speed limits."
    },
    {
      id: "fo2",
      question: "How do I get paid, and what are the platform commissions?",
      answer: "Platform owners keep up to 85% of their total rental fees. CarBoom processes weekly earnings summaries, and payouts are transferred directly to your bank account every Wednesday."
    },
    {
      id: "fo3",
      question: "What happens if a renter gets into an accident or damages the vehicle?",
      answer: "CarBoom provides fully integrated damage protection and third-party liability insurance cover during the active trip period. The renter is responsible for damages up to the safety deposit cap, while platform insurance handles major repairs."
    },
    {
      id: "fo4",
      question: "Can I block specific dates to use my vehicle personally?",
      answer: "Yes! You maintain complete control over availability. Through the Owner Dashboard, you can block any hourly or daily range on the vehicle calendar when you need your ride for personal chores."
    }
  ];

  // Dashboard Simulator State
  const [simulatorTab, setSimulatorTab] = React.useState<"earnings" | "bookings" | "performance">("earnings");

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen pt-24 pb-16 selection:bg-yellow-400 selection:text-black">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-16 px-6 max-w-7xl mx-auto mb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full filter blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full filter blur-[150px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded-full"
            >
              <DollarSign size={12} />
              <span>Earn Up to ₹45,000 / month</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight"
            >
              Earn Passive Income <br />
              With Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Idle Vehicles</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-sm md:text-base font-medium max-w-xl leading-relaxed"
            >
              List your car, motorcycle, or scooter on India's premium P2P rental platform. Take full control of prices, schedule availability, and watch your earnings hit your bank account weekly.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup">
                <Button variant="primary" className="px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-yellow-glow-hover flex items-center justify-center gap-2">
                  Register Vehicle <ArrowUpRight size={14} />
                </Button>
              </Link>
              <a href="#how-it-works" className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl text-xs font-extrabold transition text-center uppercase tracking-wider">
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Right Preview Box (Interactive Owner Dashboard Simulation) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 w-full max-w-lg relative"
          >
            <div className="absolute inset-0 bg-yellow-400/10 rounded-[32px] filter blur-xl opacity-30 animate-pulse pointer-events-none" />
            <Card variant="glass" className="relative border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl text-left p-6 rounded-[28px] shadow-2xl">
              
              {/* Simulator Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">Owner Dashboard</span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Simulation Mode</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <div>
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider">Weekly Income</span>
                  <p className="text-base font-black text-white mt-0.5">₹12,450</p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider">Rating Score</span>
                  <p className="text-base font-black text-yellow-400 mt-0.5 flex items-center gap-0.5">
                    4.92 <Star size={11} fill="currentColor" />
                  </p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider">Utilization</span>
                  <p className="text-base font-black text-emerald-400 mt-0.5">82%</p>
                </div>
              </div>

              {/* Tabs list inside simulator */}
              <div className="flex border-b border-white/5 mb-4">
                {(["earnings", "bookings", "performance"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSimulatorTab(tab);
                      toast(`Viewing ${tab}`, { description: `Switched simulator preview tab.`, type: "info" });
                    }}
                    className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider text-center border-b-2 transition cursor-pointer ${
                      simulatorTab === tab
                        ? "border-yellow-400 text-yellow-400"
                        : "border-transparent text-gray-500 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content rendering */}
              <div className="min-h-[150px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  
                  {/* Earnings Tab */}
                  {simulatorTab === "earnings" && (
                    <motion.div
                      key="earnings"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold">Weekly Net Earnings</span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-400/20 text-[10px]">
                          +14% vs last week
                        </span>
                      </div>
                      
                      {/* Animated graph columns */}
                      <div className="h-20 flex items-end gap-3.5 pt-2">
                        <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "45%" }}
                            className="w-full bg-white/10 rounded-t-md"
                          />
                          <span className="text-[8px] text-gray-500 font-bold uppercase">Mon</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "70%" }}
                            className="w-full bg-white/10 rounded-t-md"
                          />
                          <span className="text-[8px] text-gray-500 font-bold uppercase">Tue</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "30%" }}
                            className="w-full bg-white/10 rounded-t-md"
                          />
                          <span className="text-[8px] text-gray-500 font-bold uppercase">Wed</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "90%" }}
                            className="w-full bg-yellow-400 rounded-t-md shadow-yellow-glow"
                          />
                          <span className="text-[8px] text-yellow-400 font-bold uppercase">Thu</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: "55%" }}
                            className="w-full bg-white/10 rounded-t-md"
                          />
                          <span className="text-[8px] text-gray-500 font-bold uppercase">Fri</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Bookings Tab */}
                  {simulatorTab === "bookings" && (
                    <motion.div
                      key="bookings"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <div>
                          <p className="font-extrabold text-white">Mahindra Thar 4x4</p>
                          <p className="text-[10px] text-gray-400">18 Jul - 21 Jul • 3 days</p>
                        </div>
                        <span className="bg-yellow-400 text-black font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                          Upcoming
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <div>
                          <p className="font-extrabold text-white">Honda City Hybrid</p>
                          <p className="text-[10px] text-gray-400">14 Jul - 16 Jul • 2 days</p>
                        </div>
                        <span className="bg-emerald-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                          Active
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Performance Tab */}
                  {simulatorTab === "performance" && (
                    <motion.div
                      key="performance"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-3.5 text-xs"
                    >
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">
                          <span>Feedback &amp; Rating Score</span>
                          <span className="text-white">96% Positive</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: "96%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">
                          <span>Listing Views</span>
                          <span className="text-white">840 views / wk</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: "80%" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </Card>
          </motion.div>
        </div>
      </section>

      {/* Statistics Row Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-6 rounded-[20px] text-center hover:border-yellow-400/20 transition-all">
                <p className="text-3xl md:text-4xl font-black text-yellow-400">{stat.value}</p>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mt-2">{stat.label}</h4>
                <p className="text-[10px] text-gray-400 font-semibold mt-1">{stat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="how-it-works" className="relative py-20 border-y border-white/5 mb-24 bg-white/[0.01]">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Onboarding Flow</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 font-heading">Getting Started is Simple</h2>
            <p className="text-gray-400 text-xs font-semibold mt-1">Submit documents, get verified, list availability, and collect cash.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card 
                  key={idx} 
                  variant="dark"
                  className="bg-[#111827]/50 border border-white/5 rounded-[20px] p-6 text-center h-full flex flex-col items-center justify-between"
                >
                  <div className="space-y-4 flex flex-col items-center">
                    <span className="text-xs font-black text-yellow-400/40 font-heading block">{s.step}</span>
                    <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center text-yellow-400 mb-2">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wide">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-[10px] font-semibold leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Owner Benefits Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Exclusive Advantages</span>
          <h2 className="text-3xl font-extrabold mt-2 font-heading">CarBoom Platform Benefits</h2>
          <p className="text-xs text-gray-400 mt-1 font-semibold">Maximize your revenue margins with full safety insurance backups.</p>
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
                <Card className={`bg-gradient-to-br ${b.color} border border-white/5 p-6 rounded-[20px] text-left transition-all duration-300 ${b.border} h-full`}>
                  <div className="w-10 h-10 rounded-[14px] bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-2">{b.title}</h3>
                  <p className="text-gray-400 text-[10px] font-semibold leading-relaxed">
                    {b.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Success Stories Testimonial Carousel */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Owner Feedback</span>
          <h2 className="text-3xl font-extrabold mt-2 font-heading">Success Stories</h2>
        </div>

        <Card variant="glass" className="bg-[#111827]/40 border border-white/10 rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-2xl text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full filter blur-xl pointer-events-none" />
          
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
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="font-bold text-white text-base leading-tight">{successStories[activeStory].name}</h4>
                  <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-wider">
                    {successStories[activeStory].city} • Lists {successStories[activeStory].vehicle}
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-300 text-xs md:text-sm font-semibold italic leading-relaxed">
                "{successStories[activeStory].quote}"
              </blockquote>

              <div className="flex justify-between items-center pt-5 border-t border-white/5">
                <div className="text-xs font-black text-white uppercase tracking-wider">
                  Weekly Income: <span className="text-yellow-400 font-black">{successStories[activeStory].earnings}</span>
                </div>
                
                {/* Dots controller */}
                <div className="flex gap-1.5">
                  {successStories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveStory(i);
                        toast("Story Switched", { description: `Showing story ${i+1}.`, type: "info" });
                      }}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        activeStory === i ? "w-5 bg-yellow-400" : "bg-white/10"
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
      <section className="max-w-3xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-extrabold font-heading">Owner FAQs</h2>
          <p className="text-xs text-gray-400 mt-1 font-semibold">
            Common questions from vehicle owners about list approvals, payout times, and incident coverage.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Become Owner CTA Bottom Banner */}
      <section className="max-w-5xl mx-auto px-6">
        <Card variant="glass" className="bg-gradient-to-r from-yellow-400/10 via-[#0f172a] to-blue-500/10 border border-white/10 rounded-[28px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-full filter blur-[50px] pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading leading-tight">
            Ready to Start Earning?
          </h2>
          <p className="text-gray-400 text-xs mt-2 max-w-md mx-auto font-medium">
            List your vehicle in under 3 minutes, set pricing coordinates, and collect earnings automatically.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/signup">
              <Button variant="primary" className="px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl shadow-yellow-glow-hover">
                Register Your Vehicle Now
              </Button>
            </Link>
          </div>
        </Card>
      </section>

    </div>
  );
};

export default BecomeOwner;
