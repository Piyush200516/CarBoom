import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Star, CheckCircle2
} from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { useToast } from "../../../components/ui/Toast";

type TabType = "revenue" | "bookings" | "payouts";

export const DashboardPreview: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<TabType>("revenue");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    toast(`Viewing Host ${tab}`, {
      description: `Mock dashboard updated with real-time ${tab} logs.`,
      type: "info"
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="text-center mb-12">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Control Panel Preview</span>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-1 font-heading text-white">
          The Host Experience
        </h2>
        <p className="text-gray-400 text-xs font-semibold mt-2">
          Get a look inside our premium owner dashboard to monitor earnings, metrics, and logs.
        </p>
      </div>

      {/* Glassmorphic Dashboard Wrapper */}
      <Card
        variant="glass"
        className="w-full max-w-5xl mx-auto border border-white/10 rounded-[28px] p-0 shadow-2xl bg-[#0f172a]/60 backdrop-blur-xl overflow-hidden text-left"
      >
        {/* Dashboard Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-black/30 border-b border-white/5 px-6 py-4.5 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-white">Owner Portal</span>
            <span className="text-[9px] text-gray-500 font-extrabold border border-white/10 px-2 py-0.5 rounded">DEMO MODE</span>
          </div>

          {/* Interactive tabs */}
          <div className="flex bg-white/5 border border-white/5 p-1 rounded-xl w-full sm:w-auto">
            {(["revenue", "bookings", "payouts"] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab 
                    ? "bg-yellow-400 text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          
          {/* Sidebar metrics panel */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Key Metrics</h4>
            
            <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-4.5">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Monthly Revenue</span>
              <div className="text-xl font-black text-white mt-1 flex items-baseline gap-1">
                ₹38,500 <span className="text-[9px] text-emerald-400 font-bold">+18%</span>
              </div>
            </div>
            
            <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-4.5">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Booking Load</span>
              <div className="text-xl font-black text-white mt-1 flex items-baseline gap-1">
                84% <span className="text-[9px] text-emerald-400 font-bold">Stable</span>
              </div>
            </div>

            <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-4.5">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Host Score</span>
              <div className="text-xl font-black text-yellow-400 mt-1 flex items-center gap-1">
                4.9 <Star size={14} fill="currentColor" />
                <span className="text-[9px] text-gray-400 font-bold ml-1">(98 reviews)</span>
              </div>
            </div>
          </div>

          {/* Interactive display board */}
          <div className="lg:col-span-3 min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === "revenue" && (
                <motion.div
                  key="revenue"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-white">Monthly Revenue Graph</h3>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                      <TrendingUp size={12} className="text-emerald-400" /> +₹6,200 this week
                    </span>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="bg-black/20 border border-white/5 rounded-2xl p-5 h-56 flex flex-col justify-between">
                    <div className="flex-1 relative w-full flex items-end pt-8">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        <div className="border-b border-white/5 w-full h-0" />
                        <div className="border-b border-white/5 w-full h-0" />
                        <div className="border-b border-white/5 w-full h-0" />
                        <div className="border-b border-white/5 w-full h-0" />
                      </div>

                      {/* SVG line overlay */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FFC107" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Area */}
                        <path d="M 0 80 Q 20 60 40 40 T 80 15 T 100 20 L 100 100 L 0 100 Z" fill="url(#chartGradient)" />
                        {/* Line */}
                        <path d="M 0 80 Q 20 60 40 40 T 80 15 T 100 20" fill="none" stroke="#FFC107" strokeWidth="2.5" />
                      </svg>

                      {/* Dynamic tooltip node */}
                      <div className="absolute top-1/4 left-[68%] flex flex-col items-center">
                        <span className="bg-yellow-400 text-black text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                          ₹38,500
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white border-2 border-yellow-400 mt-1" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[8px] text-gray-500 font-black uppercase tracking-widest pt-4 border-t border-white/5">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Active &amp; Upcoming Bookings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-[#1e293b]/40 border border-white/5 rounded-2xl p-4 transition hover:bg-[#1e293b]/60">
                      <div>
                        <h4 className="text-xs font-extrabold text-white">Mahindra Thar 4x4</h4>
                        <p className="text-[10px] text-gray-500 font-bold mt-1">Driver: Kunal S. • Indore • Trip: 18 Jul - 21 Jul</p>
                      </div>
                      <span className="bg-yellow-400 text-black font-black text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                        Upcoming
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-[#1e293b]/40 border border-white/5 rounded-2xl p-4 transition hover:bg-[#1e293b]/60">
                      <div>
                        <h4 className="text-xs font-extrabold text-white">Ather 450X Apex</h4>
                        <p className="text-[10px] text-gray-500 font-bold mt-1">Driver: Priya R. • Pune • Trip: 15 Jul - 16 Jul</p>
                      </div>
                      <span className="bg-emerald-500 text-white font-black text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-0.5">
                        Active
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "payouts" && (
                <motion.div
                  key="payouts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Payout History</h3>
                  
                  <div className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-[10px] font-bold">
                      <thead>
                        <tr className="bg-white/5 text-gray-400 uppercase tracking-wider">
                          <th className="p-3.5">Reference ID</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Amount</th>
                          <th className="p-3.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80 divide-y divide-white/5">
                        <tr>
                          <td className="p-3.5 font-mono">TXN-739194</td>
                          <td className="p-3.5">08 Jul 2026</td>
                          <td className="p-3.5 text-white font-extrabold">₹12,450</td>
                          <td className="p-3.5 text-right">
                            <span className="text-emerald-400 flex items-center justify-end gap-1">
                              <CheckCircle2 size={10} /> Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono">TXN-429014</td>
                          <td className="p-3.5">01 Jul 2026</td>
                          <td className="p-3.5 text-white font-extrabold">₹9,800</td>
                          <td className="p-3.5 text-right">
                            <span className="text-emerald-400 flex items-center justify-end gap-1">
                              <CheckCircle2 size={10} /> Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono">TXN-110294</td>
                          <td className="p-3.5">24 Jun 2026</td>
                          <td className="p-3.5 text-white font-extrabold">₹16,250</td>
                          <td className="p-3.5 text-right">
                            <span className="text-emerald-400 flex items-center justify-end gap-1">
                              <CheckCircle2 size={10} /> Paid
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </Card>
    </section>
  );
};

export default DashboardPreview;
