// src/pages/Dashboard/MyBookings.tsx
import * as React from "react";
import { 
  MapPin, Clock, MessageSquare, Download, CalendarRange, 
  Trash2, Search, ArrowRight, DollarSign, Award, CheckCircle, Clock3, 
  XCircle, ChevronRight, Receipt, ExternalLink,
  Sparkles, Compass, Milestone, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";

interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  category: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  returnDate: string;
  duration: string;
  ownerName: string;
  ownerAvatar: string;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  bookingStatus: "Upcoming" | "Active" | "Completed" | "Cancelled";
  amount: number;
  progressPercent?: number; // only for active
}

const mockBookings: Booking[] = [
  {
    id: "CB-70492",
    vehicleId: "1",
    vehicleName: "Tesla Model Y Performance",
    vehicleImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
    category: "EV",
    pickupLocation: "Vijay Nagar, Indore",
    dropLocation: "Palasia, Indore",
    pickupDate: "2026-07-15",
    returnDate: "2026-07-16",
    duration: "24 Hours",
    ownerName: "Aarav Sharma",
    ownerAvatar: "https://i.pravatar.cc/150?img=33",
    paymentStatus: "Paid",
    bookingStatus: "Active",
    amount: 3500,
    progressPercent: 65
  },
  {
    id: "CB-69381",
    vehicleId: "2",
    vehicleName: "Thar Earth Edition 4x4",
    vehicleImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    category: "SUV",
    pickupLocation: "Bhawarkua, Indore",
    dropLocation: "Bhawarkua, Indore",
    pickupDate: "2026-07-22",
    returnDate: "2026-07-25",
    duration: "3 Days",
    ownerName: "Vikram Malhotra",
    ownerAvatar: "https://i.pravatar.cc/150?img=12",
    paymentStatus: "Paid",
    bookingStatus: "Upcoming",
    amount: 7200
  },
  {
    id: "CB-68270",
    vehicleId: "3",
    vehicleName: "BMW G 310 RR",
    vehicleImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800",
    category: "Sports",
    pickupLocation: "Palasia, Indore",
    dropLocation: "Palasia, Indore",
    pickupDate: "2026-06-10",
    returnDate: "2026-06-11",
    duration: "24 Hours",
    ownerName: "Rohan Verma",
    ownerAvatar: "https://i.pravatar.cc/150?img=60",
    paymentStatus: "Paid",
    bookingStatus: "Completed",
    amount: 1200
  },
  {
    id: "CB-67129",
    vehicleId: "5",
    vehicleName: "Ola S1 Pro Gen 2",
    vehicleImage: "https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=800",
    category: "EV",
    pickupLocation: "Rajendra Nagar, Indore",
    dropLocation: "Rajendra Nagar, Indore",
    pickupDate: "2026-05-02",
    returnDate: "2026-05-02",
    duration: "6 Hours",
    ownerName: "Amit Patel",
    ownerAvatar: "https://i.pravatar.cc/150?img=65",
    paymentStatus: "Paid",
    bookingStatus: "Completed",
    amount: 490
  },
  {
    id: "CB-65902",
    vehicleId: "4",
    vehicleName: "Royal Enfield Meteor 350",
    vehicleImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    category: "Cruiser",
    pickupLocation: "Vijay Nagar, Indore",
    dropLocation: "Vijay Nagar, Indore",
    pickupDate: "2026-04-18",
    returnDate: "2026-04-20",
    duration: "2 Days",
    ownerName: "Neha Sen",
    ownerAvatar: "https://i.pravatar.cc/150?img=47",
    paymentStatus: "Refunded",
    bookingStatus: "Cancelled",
    amount: 1900
  }
];

const mockPayments = [
  { id: "TXN-80928", bookingId: "CB-70492", date: "2026-07-15", amount: "₹3,500", method: "UPI", status: "Success" },
  { id: "TXN-79810", bookingId: "CB-69381", date: "2026-07-13", amount: "₹7,200", method: "Credit Card", status: "Success" },
  { id: "TXN-76512", bookingId: "CB-68270", date: "2026-06-10", amount: "₹1,200", method: "UPI", status: "Success" },
  { id: "TXN-71249", bookingId: "CB-65902", date: "2026-04-18", amount: "₹1,900", method: "Refund to Wallet", status: "Refunded" }
];

export const MyBookings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<"All" | "Upcoming" | "Active" | "Completed" | "Cancelled">("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Modal Actions States
  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  
  const [extendDuration, setExtendDuration] = React.useState("6 hours");
  const [bookings, setBookings] = React.useState<Booking[]>(mockBookings);

  // Stats Card Calculations
  const totalBookings = bookings.length;
  const activeCount = bookings.filter(b => b.bookingStatus === "Active").length;
  const completedCount = bookings.filter(b => b.bookingStatus === "Completed").length;
  const totalSpending = bookings.filter(b => b.bookingStatus === "Completed" || b.bookingStatus === "Active" || b.bookingStatus === "Upcoming").reduce((sum, b) => sum + b.amount, 0);
  const rewardPoints = Math.round(totalSpending * 0.05);

  // Filter Bookings by Tab & Keyword
  const filteredBookings = React.useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = b.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeTab === "All") return true;
      return b.bookingStatus === activeTab;
    });
  }, [bookings, activeTab, searchQuery]);

  // Invoice downloader
  const handleDownloadInvoice = (id: string) => {
    toast("Invoice Download Started", {
      description: `Downloading invoice receipt pdf for booking ID ${id}.`,
      type: "success"
    });
  };

  // Chat with owner
  const handleChatOwner = (ownerName: string) => {
    toast("Opening Chat Room", {
      description: `Connecting with vehicle owner ${ownerName}...`,
      type: "info"
    });
  };

  // Open Cancel dialog
  const openCancelDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  // Confirm cancel booking
  const confirmCancelBooking = () => {
    if (selectedBooking) {
      setBookings(prev => 
        prev.map(b => b.id === selectedBooking.id 
          ? { ...b, bookingStatus: "Cancelled", paymentStatus: "Refunded" } 
          : b
        )
      );
      setIsCancelModalOpen(false);
      toast("Booking Cancelled", {
        description: `Your booking for ${selectedBooking.vehicleName} has been cancelled. Refund initialized.`,
        type: "success"
      });
      setSelectedBooking(null);
    }
  };

  // Open Extend dialog
  const openExtendDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsExtendModalOpen(true);
  };

  // Confirm extend
  const confirmExtendBooking = () => {
    if (selectedBooking) {
      const addedCost = extendDuration === "6 hours" ? 600 : extendDuration === "12 hours" ? 1100 : 2000;
      setBookings(prev =>
        prev.map(b => b.id === selectedBooking.id
          ? { ...b, duration: `${b.duration} + ${extendDuration}`, amount: b.amount + addedCost }
          : b
        )
      );
      setIsExtendModalOpen(false);
      toast("Booking Extended Successfully", {
        description: `Your rental duration has been extended by ${extendDuration}. Additional charge: ₹${addedCost}.`,
        type: "success"
      });
      setSelectedBooking(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Upcoming": return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      case "Completed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen pt-4 pb-16 selection:bg-yellow-400 selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Dashboard Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Bookings Dashboard</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">
              Track active schedules, review invoice records, and coordinate with vehicle owners.
            </p>
          </div>
          
          {/* Action button redirect */}
          <Button
            variant="primary"
            onClick={() => navigate("/browse")}
            className="text-xs font-black uppercase tracking-wider rounded-xl shadow-yellow-glow-hover flex items-center gap-1.5"
          >
            Browse New Rides <ArrowRight size={13} />
          </Button>
        </div>

        {/* Dashboard Cards Summary Banner */}
        <section className="grid grid-cols-2 lg:grid-cols-6 gap-5 mb-10">
          <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl text-left">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Total Bookings</span>
            <div className="text-2xl font-black text-white mt-1.5">{totalBookings}</div>
          </Card>

          <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl text-left border-l-2 border-l-emerald-500">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Active Drives</span>
            <div className="text-2xl font-black text-emerald-400 mt-1.5">{activeCount}</div>
          </Card>

          <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl text-left border-l-2 border-l-yellow-400">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Upcoming Trips</span>
            <div className="text-2xl font-black text-yellow-400 mt-1.5">{bookings.filter(b => b.bookingStatus === "Upcoming").length}</div>
          </Card>

          <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl text-left">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Completed</span>
            <div className="text-2xl font-black text-blue-400 mt-1.5">{completedCount}</div>
          </Card>

          <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl text-left">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-heading flex items-center gap-1">
              <DollarSign size={10} className="text-yellow-400" /> Spending
            </span>
            <div className="text-2xl font-black text-white mt-1.5">₹{totalSpending.toLocaleString()}</div>
          </Card>

          <Card variant="glass" className="bg-[#111827]/40 border border-yellow-400/20 p-4 rounded-xl text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/5 rounded-full filter blur-md pointer-events-none" />
            <span className="text-[9px] text-yellow-400 font-black uppercase tracking-widest flex items-center gap-1">
              <Award size={10} /> Reward Points
            </span>
            <div className="text-2xl font-black text-yellow-400 mt-1.5 flex items-center gap-1">
              {rewardPoints}
              <Sparkles size={12} className="animate-pulse" />
            </div>
          </Card>
        </section>

        {/* Tab selector and keyword Search Row */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Tab Selector */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto scrollbar-none">
            {(["All", "Upcoming", "Active", "Completed", "Cancelled"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  toast(`Filtering: ${tab}`, { description: `Showing ${tab} bookings.`, type: "info" });
                }}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? "bg-yellow-400 text-black font-extrabold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Filter */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Filter by Booking ID or Name"
              className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Bookings cards/timeline section split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Left panel: Active bookings timelines / booking lists (2 Columns) */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            
            {filteredBookings.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {filteredBookings.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-6 rounded-[20px] hover:border-yellow-400/20 transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden">
                      
                      {/* Left: Image */}
                      <div className="w-full md:w-44 h-32 rounded-xl overflow-hidden shrink-0 relative bg-[#1a2236] border border-white/5">
                        <img src={b.vehicleImage} className="w-full h-full object-cover" alt="" />
                        <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[8px] font-black text-yellow-400 uppercase tracking-widest">
                          {b.category}
                        </span>
                      </div>

                      {/* Right: Booking Details */}
                      <div className="flex-grow flex flex-col justify-between text-left space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                          <div>
                            <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider block">ID: {b.id}</span>
                            <h3 className="text-white font-extrabold text-base md:text-lg leading-tight mt-0.5">{b.vehicleName}</h3>
                          </div>
                          
                          <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border shrink-0 ${getStatusColor(b.bookingStatus)}`}>
                            {b.bookingStatus}
                          </span>
                        </div>

                        {/* Location and address detail */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-gray-400 border-y border-white/5 py-2.5 my-1">
                          <div className="space-y-1">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider flex items-center gap-1">
                              <Milestone size={10} className="text-yellow-400" /> Pickup Location
                            </span>
                            <p className="text-white text-[11px] font-semibold line-clamp-1">{b.pickupLocation}</p>
                            <p className="text-[10px] text-gray-500 font-medium">{b.pickupDate}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider flex items-center gap-1">
                              <MapPin size={10} className="text-yellow-400" /> Dropoff Location
                            </span>
                            <p className="text-white text-[11px] font-semibold line-clamp-1">{b.dropLocation}</p>
                            <p className="text-[10px] text-gray-500 font-medium">{b.returnDate}</p>
                          </div>
                        </div>

                        {/* Owner details */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-3">
                          <div className="flex items-center gap-2">
                            <img src={b.ownerAvatar} className="w-6 h-6 rounded-full object-cover border border-white/10" alt="" />
                            <div>
                              <p className="text-[10px] text-gray-500 font-bold uppercase leading-none">Vehicle Owner</p>
                              <p className="text-white font-extrabold text-[11px] mt-0.5">{b.ownerName}</p>
                            </div>
                          </div>

                          <div className="flex items-baseline gap-1 text-right sm:text-left self-end sm:self-auto">
                            <span className="text-[10px] text-gray-500 font-bold uppercase">Duration:</span>
                            <span className="text-white font-extrabold text-xs">{b.duration}</span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-1.5" />
                            <span className="text-[10px] text-gray-500 font-bold uppercase">Paid:</span>
                            <span className="text-yellow-400 font-black text-xs">₹{b.amount}</span>
                          </div>
                        </div>

                        {/* Active trip progress bar */}
                        {b.bookingStatus === "Active" && b.progressPercent && (
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                              <span>Drive Journey progress</span>
                              <span className="text-emerald-400">{b.progressPercent}% Elapsed</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${b.progressPercent}%` }} />
                            </div>
                          </div>
                        )}

                        {/* Timeline Details block (only for active trips) */}
                        {b.bookingStatus === "Active" && (
                          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 text-[10px] font-bold text-gray-400 space-y-2">
                            <p className="text-white uppercase text-[8px] tracking-wider font-black">Live Tracking Timeline</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle size={12} />
                                <span>Key handover done</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle size={12} />
                                <span>Drive started</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-500">
                                <Clock size={12} />
                                <span>Return check (Pending)</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Card Actions buttons block based on states */}
                        <div className="flex flex-wrap items-center justify-between border-t border-white/5 pt-3 mt-3 gap-3">
                          
                          {/* Left actions */}
                          <div className="flex items-center gap-2">
                            {b.bookingStatus === "Completed" && (
                              <button
                                onClick={() => handleDownloadInvoice(b.id)}
                                className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/25 rounded-xl transition cursor-pointer"
                              >
                                <Download size={12} /> Invoice PDF
                              </button>
                            )}
                            {b.bookingStatus === "Upcoming" && (
                              <>
                                <button
                                  onClick={() => openExtendDialog(b)}
                                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-yellow-400 hover:text-yellow-300 bg-yellow-400/10 border border-yellow-400/25 rounded-xl transition cursor-pointer"
                                >
                                  <CalendarRange size={12} /> Extend Drive
                                </button>
                                <button
                                  onClick={() => openCancelDialog(b)}
                                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/25 rounded-xl transition cursor-pointer"
                                >
                                  <Trash2 size={12} /> Cancel Booking
                                </button>
                              </>
                            )}
                            {b.bookingStatus === "Active" && (
                              <>
                                <button
                                  onClick={() => openExtendDialog(b)}
                                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-yellow-400 hover:text-yellow-300 bg-yellow-400/10 border border-yellow-400/25 rounded-xl transition cursor-pointer"
                                >
                                  <CalendarRange size={12} /> Extend
                                </button>
                                <button
                                  onClick={() => toast("Live Tracking Unavailable", { description: "Owner vehicle telemetry is syncing. Real-time maps will unlock shortly.", type: "error" })}
                                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-xl transition cursor-pointer"
                                >
                                  <Compass size={12} /> Track Live
                                </button>
                              </>
                            )}
                          </div>

                          {/* Right actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleChatOwner(b.ownerName)}
                              className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-gray-300 hover:text-white border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl transition cursor-pointer"
                            >
                              <MessageSquare size={12} /> Chat Owner
                            </button>
                            <button
                              onClick={() => navigate(`/vehicle/${b.vehicleId}`)}
                              className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              View Details <ChevronRight size={14} />
                            </button>
                          </div>

                        </div>

                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <Card className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] border border-white/5 rounded-[24px]">
                <div className="p-5 bg-yellow-400/10 rounded-full text-yellow-400 mb-4 animate-bounce">
                  <CalendarRange size={36} />
                </div>
                <h3 className="text-xl font-bold text-white">No Bookings Found</h3>
                <p className="text-sm text-gray-400 mt-1 max-w-sm font-medium">
                  We couldn't find any rentals matching "{searchQuery}" under the {activeTab} filter list.
                </p>
                <Button variant="primary" onClick={() => navigate("/browse")} className="mt-6 font-extrabold uppercase text-xs tracking-wider">
                  Browse Vehicles
                </Button>
              </Card>
            )}

          </div>

          {/* Right panel: Timeline Progress indicator, Recent payments list (1 Column) */}
          <div className="space-y-6">
            
            {/* Timeline Progress card */}
            <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-6 rounded-[20px] text-left">
              <h3 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
                <Clock3 size={15} className="text-yellow-400" /> Booking Status Timeline
              </h3>
              
              <div className="relative border-l-2 border-white/5 pl-5 ml-2.5 space-y-6 py-1">
                
                {/* Milestone 1 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#0b0f19]">
                    <Check size={8} className="text-white" />
                  </span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">01. Setup &amp; Verification</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Documents check &amp; base approval completed.</p>
                </div>

                {/* Milestone 2 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#0b0f19]">
                    <Check size={8} className="text-white" />
                  </span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">02. Booking Confirmed</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Aarav Sharma approved Tesla Model Y booking.</p>
                </div>

                {/* Milestone 3 */}
                <div className="relative animate-pulse">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-[#0b0f19]" />
                  <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">03. Key Handover &amp; Pick</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Meet owner at Vijay Nagar address. Swap credentials.</p>
                </div>

                {/* Milestone 4 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center border-2 border-[#0b0f19]" />
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">04. Return Checkup</h4>
                  <p className="text-[10px] text-gray-600 mt-0.5">Inspect fuel levels, cleanliness &amp; close drive loop.</p>
                </div>

              </div>
            </Card>

            {/* Recent Payments list Card */}
            <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-6 rounded-[20px] text-left">
              <h3 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
                <Receipt size={15} className="text-yellow-400" /> Recent Receipts
              </h3>

              <div className="space-y-4">
                {mockPayments.map(p => (
                  <div key={p.id} className="flex justify-between items-center text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-extrabold text-white">{p.bookingId} ({p.method})</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Txn: {p.id} • {p.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-white">{p.amount}</p>
                      <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        p.status === "Success" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>

        {/* Historical Bookings Table */}
        <section className="mb-16">
          <Card variant="glass" className="bg-[#111827]/30 border border-white/5 p-6 rounded-[24px] text-left overflow-x-auto">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5 border-b border-white/5 pb-3 flex items-center gap-2">
              <Receipt size={16} className="text-yellow-400" /> Complete Billing &amp; Booking History
            </h3>
            
            <table className="w-full text-xs text-left text-gray-400">
              <thead className="text-[10px] text-gray-500 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th scope="col" className="py-3 px-2">Booking ID</th>
                  <th scope="col" className="py-3 px-2">Vehicle</th>
                  <th scope="col" className="py-3 px-2">Dates</th>
                  <th scope="col" className="py-3 px-2">Duration</th>
                  <th scope="col" className="py-3 px-2">Total Cost</th>
                  <th scope="col" className="py-3 px-2">Payment Status</th>
                  <th scope="col" className="py-3 px-2">Booking Status</th>
                  <th scope="col" className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="py-3.5 px-2 font-bold text-white">{b.id}</td>
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-2">
                        <img src={b.vehicleImage} className="w-7 h-7 rounded object-cover" alt="" />
                        <span className="font-bold text-white/95 line-clamp-1">{b.vehicleName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 font-medium">{b.pickupDate} to {b.returnDate}</td>
                    <td className="py-3.5 px-2 font-medium">{b.duration}</td>
                    <td className="py-3.5 px-2 font-black text-white">₹{b.amount}</td>
                    <td className="py-3.5 px-2">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.paymentStatus === "Paid" ? "text-emerald-400 bg-emerald-400/10" : "text-yellow-400 bg-yellow-400/10"
                      }`}>
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.bookingStatus === "Active" ? "text-emerald-400 bg-emerald-400/10" :
                        b.bookingStatus === "Upcoming" ? "text-yellow-400 bg-yellow-400/10" :
                        b.bookingStatus === "Completed" ? "text-blue-400 bg-blue-500/10" :
                        "text-red-400 bg-red-500/10"
                      }`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex justify-end gap-2.5">
                        <button 
                          onClick={() => handleDownloadInvoice(b.id)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
                          title="Download Receipt"
                        >
                          <Download size={14} />
                        </button>
                        <button 
                          onClick={() => navigate(`/vehicle/${b.vehicleId}`)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
                          title="Open Details"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

      </div>

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {isCancelModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-[#111827] border border-white/10 rounded-[24px] p-6 shadow-2xl text-left"
            >
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <XCircle size={24} />
                <h3 className="font-extrabold text-white text-lg">Cancel Rental Reservation?</h3>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Are you sure you want to cancel booking <span className="font-bold text-white">{selectedBooking.id}</span> for the <span className="font-bold text-white">{selectedBooking.vehicleName}</span>? 
                A full refund of <span className="font-bold text-yellow-400">₹{selectedBooking.amount}</span> will be credited to your payment wallet immediately in accordance with our cancellation policies.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white bg-transparent rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="px-5 py-2 text-xs font-black text-white bg-red-500 hover:bg-red-600 rounded-lg transition uppercase tracking-wider"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Extend Booking Modal */}
      <AnimatePresence>
        {isExtendModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExtendModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-[#111827] border border-white/10 rounded-[24px] p-6 shadow-2xl text-left"
            >
              <div className="flex items-center gap-3 text-yellow-400 mb-4">
                <CalendarRange size={24} />
                <h3 className="font-extrabold text-white text-lg">Extend Rental Duration?</h3>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Choose the additional rental period you'd like to extend for <span className="font-bold text-white">{selectedBooking.vehicleName}</span>:
                </p>
                
                <select
                  value={extendDuration}
                  onChange={(e) => setExtendDuration(e.target.value)}
                  className="w-full bg-[#131b2e] border border-white/10 focus:border-yellow-400 rounded-xl p-3 text-xs text-white outline-none transition"
                >
                  <option value="6 hours">6 Hours (+ ₹600)</option>
                  <option value="12 hours">12 Hours (+ ₹1,100)</option>
                  <option value="24 hours">24 Hours / 1 Day (+ ₹2,000)</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsExtendModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white bg-transparent rounded-lg transition"
                >
                  Close
                </button>
                <button
                  onClick={confirmExtendBooking}
                  className="px-5 py-2 text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition uppercase tracking-wider"
                >
                  Pay &amp; Extend
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MyBookings;
