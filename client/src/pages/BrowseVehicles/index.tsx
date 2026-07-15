// src/pages/BrowseVehicles/index.tsx
import * as React from "react";
import { 
  Search, MapPin, Calendar, Car, SlidersHorizontal, Sliders, ArrowUpDown, 
  RotateCcw, Heart, Star, ShieldCheck, Fuel, Settings, Users, Compass, 
  Sparkles, Award, Clock, ArrowRight, LayoutGrid, List,
  X, GitCompare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockVehicles, Vehicle } from "../../data/mockData";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FAQAccordion } from "../../components/common/FAQAccordion";
import { useToast } from "../../components/ui/Toast";

// Enhance mock vehicles with brand, distance, oldPrice, owner reviews, and instant booking fields
interface EnhancedVehicle extends Vehicle {
  brand: string;
  distance: string;
  locationName: string;
  instantBook: boolean;
  oldPrice: number;
  discountBadge?: string;
  ownerReviewsCount: number;
}

const enhancedMockVehicles: EnhancedVehicle[] = mockVehicles.map(v => {
  const brandMap: Record<string, string> = {
    "Tesla Model Y Performance": "Tesla",
    "Thar Earth Edition 4x4": "Mahindra",
    "BMW G 310 RR": "BMW",
    "Royal Enfield Meteor 350": "Royal Enfield",
    "Ola S1 Pro Gen 2": "Ola",
    "Trek Marlin 7 Gen 3": "Trek",
    "Honda City Hybrid e:HEV": "Honda",
    "Ather 450X Apex": "Ather"
  };

  const distanceMap: Record<string, string> = {
    "1": "1.2 km",
    "2": "3.5 km",
    "3": "0.8 km",
    "4": "2.4 km",
    "5": "4.1 km",
    "6": "5.0 km",
    "7": "2.9 km",
    "8": "1.7 km"
  };

  const locationMap: Record<string, string> = {
    "1": "Vijay Nagar, Indore",
    "2": "Bhawarkua, Indore",
    "3": "Palasia, Indore",
    "4": "Saket, Indore",
    "5": "Rajendra Nagar, Indore",
    "6": "Annanagar, Chennai",
    "7": "Baner, Pune",
    "8": "Koramangala, Bangalore"
  };

  const brand = brandMap[v.name] || "CarBoom";
  const distance = distanceMap[v.id] || "2.0 km";
  const locationName = locationMap[v.id] || "Indore";
  
  return {
    ...v,
    brand,
    distance,
    locationName,
    instantBook: parseInt(v.id) % 2 === 1, // odd IDs have instant booking
    oldPrice: Math.round(v.dailyPrice * 1.25),
    discountBadge: parseInt(v.id) % 3 === 0 ? "15% OFF" : undefined,
    ownerReviewsCount: v.reviewsCount + 12
  };
});

const POPULAR_BRANDS = [
  { name: "All", count: enhancedMockVehicles.length },
  { name: "Tesla", count: 1 },
  { name: "Mahindra", count: 1 },
  { name: "BMW", count: 1 },
  { name: "Royal Enfield", count: 1 },
  { name: "Ola", count: 1 },
  { name: "Honda", count: 1 },
  { name: "Ather", count: 1 }
];

export const BrowseVehicles = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Search & Filter State
  const [pickupLoc, setPickupLoc] = React.useState("");
  const [dropLoc, setDropLoc] = React.useState("");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [vehicleType, setVehicleType] = React.useState("all");
  const [selectedBrand, setSelectedBrand] = React.useState("All");
  const [fuelType, setFuelType] = React.useState("all");
  const [transmission, setTransmission] = React.useState("all");
  const [seats, setSeats] = React.useState("all");
  const [priceRange, setPriceRange] = React.useState<number>(1000);
  const [minRating, setMinRating] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState("rating");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Wishlist State (synced with localStorage)
  const [wishlist, setWishlist] = React.useState<string[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = React.useState<EnhancedVehicle[]>([]);

  // Comparison State
  const [compareList, setCompareList] = React.useState<EnhancedVehicle[]>([]);
  const [isCompareOpen, setIsCompareOpen] = React.useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  // View state
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Load recently viewed on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      const ids: string[] = JSON.parse(saved);
      const vehicles = ids
        .map(id => enhancedMockVehicles.find(v => v.id === id))
        .filter((v): v is EnhancedVehicle => !!v);
      setRecentlyViewed(vehicles.slice(0, 4));
    }
  }, []);

  // Update localStorage when wishlist changes
  const toggleWishlist = (id: string, name: string) => {
    let updated;
    const exists = wishlist.includes(id);
    if (exists) {
      updated = wishlist.filter(item => item !== id);
      toast("Removed from Wishlist", {
        description: `${name} has been removed from your saved vehicles.`,
        type: "success"
      });
    } else {
      updated = [...wishlist, id];
      toast("Added to Wishlist", {
        description: `${name} has been saved to your wishlist.`,
        type: "success"
      });
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Add vehicle to compare
  const toggleCompare = (vehicle: EnhancedVehicle) => {
    if (compareList.some(v => v.id === vehicle.id)) {
      setCompareList(compareList.filter(v => v.id !== vehicle.id));
      toast("Removed from Comparison", {
        description: `${vehicle.name} removed from compare list.`,
        type: "info"
      });
    } else {
      if (compareList.length >= 3) {
        toast("Compare Limit Reached", {
          description: "You can compare up to 3 vehicles at a time.",
          type: "error"
        });
        return;
      }
      setCompareList([...compareList, vehicle]);
      toast("Added to Comparison", {
        description: `${vehicle.name} added to comparison.`,
        type: "success"
      });
    }
  };

  // Track recently viewed clicks
  const handleVehicleClick = (vehicle: EnhancedVehicle) => {
    const saved = localStorage.getItem("recentlyViewed");
    let ids: string[] = saved ? JSON.parse(saved) : [];
    ids = [vehicle.id, ...ids.filter(id => id !== vehicle.id)].slice(0, 10);
    localStorage.setItem("recentlyViewed", JSON.stringify(ids));
  };

  // Reset Filters
  const handleReset = () => {
    setPickupLoc("");
    setDropLoc("");
    setPickupDate("");
    setReturnDate("");
    setVehicleType("all");
    setSelectedBrand("All");
    setFuelType("all");
    setTransmission("all");
    setSeats("all");
    setPriceRange(1000);
    setMinRating(0);
    setSortBy("rating");
    setSearchQuery("");
    setCurrentPage(1);
    toast("Filters Cleared", {
      description: "Search and filter inputs have been reset.",
      type: "info"
    });
  };

  // Computed filtered list
  const filteredVehicles = React.useMemo(() => {
    return enhancedMockVehicles.filter(v => {
      // Free text search
      if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Location match
      if (pickupLoc && !v.locationName.toLowerCase().includes(pickupLoc.toLowerCase())) {
        return false;
      }

      // Type match
      if (vehicleType !== "all" && v.type !== vehicleType) {
        return false;
      }

      // Brand match
      if (selectedBrand !== "All" && v.brand !== selectedBrand) {
        return false;
      }

      // Fuel type match
      if (fuelType !== "all" && v.fuelType !== fuelType) {
        return false;
      }

      // Transmission match
      if (transmission !== "all" && v.transmission !== transmission) {
        return false;
      }

      // Seats match
      if (seats !== "all") {
        const minSeats = parseInt(seats);
        if (v.seats < minSeats) return false;
      }

      // Rating match
      if (v.rating < minRating) {
        return false;
      }

      // Hourly price cap
      if (v.hourlyPrice > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.hourlyPrice - b.hourlyPrice;
      if (sortBy === "price-desc") return b.hourlyPrice - a.hourlyPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [searchQuery, pickupLoc, vehicleType, selectedBrand, fuelType, transmission, seats, minRating, priceRange, sortBy]);

  // Paginated vehicles
  const paginatedVehicles = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / itemsPerPage));

  // Reset pagination on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pickupLoc, vehicleType, selectedBrand, fuelType, transmission, seats, minRating, priceRange, sortBy]);

  const recommendedVehicles = React.useMemo(() => {
    return enhancedMockVehicles.filter(v => v.rating >= 4.8).slice(0, 3);
  }, []);

  const browseFAQs = [
    {
      id: "faq-b1",
      question: "How are distance ranges calculated for peer vehicle locations?",
      answer: "We display real-time coordinates between your location search query and the owner's vehicle base address. The distances shown (e.g. 1.2 km) represent exact straight-line routes to facilitate prompt key handovers."
    },
    {
      id: "faq-b2",
      question: "What does the 'Instant Booking' badge mean?",
      answer: "Vehicles with the Instant Booking badge do not require manual pre-approval from the vehicle owner. Once your payment goes through, the vehicle is immediately secured for your selected dates, and the pickup details are unlocked."
    },
    {
      id: "faq-b3",
      question: "Are fuel charges included in the price?",
      answer: "No, fuel is not included in the rental price. Renters are expected to return the vehicle with the same fuel level as it had at pickup. If returned with less fuel, local refueling charges will be billed dynamically."
    },
    {
      id: "faq-b4",
      question: "Is there a security deposit required?",
      answer: "Yes, a minimal refundable security deposit of ₹1,000 - ₹5,000 (depending on the vehicle class) is authorized at checkout. This amount is automatically released back to your payment source within 24 hours of a safe vehicle return."
    }
  ];

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen pt-24 pb-16 selection:bg-yellow-400 selection:text-black">
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden py-16 px-6 max-w-7xl mx-auto mb-12">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="text-center md:text-left mb-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-4"
          >
            <Sparkles size={12} />
            <span>Premium Marketplace</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight"
          >
            Explore &amp; Rent <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Elite Vehicles</span> Near You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 mt-3 text-sm md:text-base font-medium max-w-xl"
          >
            Rent high-end cars, cruisers, and clean EVs directly from verified local owners. Flat rates, comprehensive coverage, and zero hassle.
          </motion.p>
        </div>

        {/* Large Glassmorphic Search & Filter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 p-6 md:p-8 rounded-[24px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {/* Main Grid: Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Locations Column */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin size={12} /> Address Details
              </h3>
              <div className="space-y-2.5">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Compass size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Pickup location (e.g. Vijay Nagar)"
                    className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition"
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <MapPin size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Dropoff location (Optional)"
                    className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition"
                    value={dropLoc}
                    onChange={(e) => setDropLoc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Dates Column */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={12} /> Date Range
              </h3>
              <div className="space-y-2.5">
                <div className="relative">
                  <input
                    type="date"
                    className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none transition cursor-pointer [color-scheme:dark]"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                  <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-[9px] font-bold uppercase tracking-wider">
                    Pickup
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none transition cursor-pointer [color-scheme:dark]"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-[9px] font-bold uppercase tracking-wider">
                    Return
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                <Car size={12} /> Build &amp; Spec
              </h3>
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="all">Any Type</option>
                    <option value="car">Cars</option>
                    <option value="bike">Bikes</option>
                    <option value="scooter">Scooters</option>
                    <option value="cycle">Cycles</option>
                  </select>
                  <select
                    className="bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="All">Any Brand</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="BMW">BMW</option>
                    <option value="Royal Enfield">Royal Enfield</option>
                    <option value="Ola">Ola</option>
                    <option value="Honda">Honda</option>
                    <option value="Ather">Ather</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="all">Any Fuel</option>
                    <option value="Electric">Electric</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <select
                    className="bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                  >
                    <option value="all">Any Gear</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price Slider & Ratings */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sliders size={12} /> Pricing &amp; Score
              </h3>
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                    <span>Max Price / Hour</span>
                    <span className="text-yellow-400 text-xs font-black">₹{priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="1000"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none transition cursor-pointer"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                  >
                    <option value="all">Any Seats</option>
                    <option value="1">1+ Seats</option>
                    <option value="2">2+ Seats</option>
                    <option value="4">4+ Seats</option>
                    <option value="5">5+ Seats</option>
                  </select>
                  <select
                    className="bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none transition cursor-pointer"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  >
                    <option value="0">Any Star</option>
                    <option value="4.5">4.5+ ★</option>
                    <option value="4.7">4.7+ ★</option>
                    <option value="4.8">4.8+ ★</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Search Row & Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-5 border-t border-white/5 gap-4">
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Keyword (e.g. Thar, Tesla, Sport)"
                className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button 
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer border border-transparent hover:border-white/10 rounded-xl"
              >
                <RotateCcw size={14} /> Reset
              </button>
              <Button 
                variant="primary" 
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-yellow-glow-hover flex items-center justify-center gap-2"
                onClick={() => toast("Search Applied", { description: "Updated grid based on filters", type: "success" })}
              >
                <Search size={14} /> Find Vehicle
              </Button>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Popular Brands Quick Filter bar */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Award size={16} className="text-yellow-400" /> Popular Brands
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => setSelectedBrand(brand.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                selectedBrand === brand.name
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20"
                  : "bg-white/5 text-gray-300 border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              <span>{brand.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedBrand === brand.name ? "bg-black/10 text-black font-extrabold" : "bg-white/10 text-gray-400"
              }`}>
                {brand.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Sorting, Mode controls & Filter Details count */}
      <section className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-[20px] bg-white/[0.02] border border-white/5 shadow-sm gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <SlidersHorizontal size={13} className="text-yellow-400" />
              <span>{filteredVehicles.length} Vehicles Found</span>
            </span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition ${viewMode === "grid" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition ${viewMode === "list" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"}`}
              >
                <List size={14} />
              </button>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-300 focus:outline-none border-b border-transparent hover:border-white/20 pb-0.5 cursor-pointer outline-none"
              >
                <option value="rating" className="bg-[#111827]">Rating: High to Low</option>
                <option value="price-asc" className="bg-[#111827]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#111827]">Price: High to Low</option>
                <option value="reviews" className="bg-[#111827]">Reviews Count</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Vehicle Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        {paginatedVehicles.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "flex flex-col gap-6"
          }>
            {paginatedVehicles.map((vehicle) => {
              const isSaved = wishlist.includes(vehicle.id);
              const isComparing = compareList.some(v => v.id === vehicle.id);
              
              return (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <Card 
                    variant="glass" 
                    className={`relative overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all duration-300 p-0 flex ${
                      viewMode === "grid" ? "flex-col" : "flex-col md:flex-row"
                    } h-full bg-[#111827]/40 backdrop-blur-md`}
                  >
                    
                    {/* Image Panel */}
                    <div className={`relative overflow-hidden ${
                      viewMode === "grid" ? "w-full h-56" : "w-full md:w-80 h-56 md:h-full shrink-0"
                    } bg-[#1a2236]`}>
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onClick={() => {
                          handleVehicleClick(vehicle);
                          navigate(`/vehicle/${vehicle.id}`);
                        }}
                      />
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(vehicle.id, vehicle.name)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 hover:border-white/20 text-white transition-all cursor-pointer z-10"
                      >
                        <Heart
                          size={15}
                          className={isSaved ? "fill-red-500 text-red-500 scale-110" : "text-white"}
                        />
                      </button>

                      {/* Badges Overlay */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        {vehicle.discountBadge && (
                          <span className="bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                            {vehicle.discountBadge}
                          </span>
                        )}
                        {vehicle.instantBook && (
                          <span className="bg-emerald-500/90 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                            Instant Book
                          </span>
                        )}
                      </div>

                      {/* Type Category overlay (bottom) */}
                      <div className="absolute bottom-3 left-3 bg-[#0b0f19]/80 backdrop-blur-md border border-white/5 text-[9px] font-black uppercase tracking-widest text-yellow-400 px-2 py-0.5 rounded-md">
                        {vehicle.category}
                      </div>
                    </div>

                    {/* Content Panel */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        
                        {/* Owner Header */}
                        <div className="flex justify-between items-center mb-2.5 text-[11px] text-gray-400 border-b border-white/5 pb-2">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={vehicle.ownerAvatar}
                              alt={vehicle.ownerName}
                              className="w-5 h-5 rounded-full object-cover border border-white/10"
                            />
                            <span className="font-semibold text-white/80">{vehicle.ownerName}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full" />
                            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-bold uppercase">
                              <ShieldCheck size={10} /> Verified
                            </span>
                          </div>
                          
                          {/* Owner rating */}
                          <div className="flex items-center gap-0.5 text-yellow-400 font-extrabold">
                            <span>{vehicle.rating}</span>
                            <Star size={11} fill="currentColor" />
                            <span className="text-gray-500 font-semibold">({vehicle.ownerReviewsCount})</span>
                          </div>
                        </div>

                        {/* Vehicle Title */}
                        <h3 
                          onClick={() => {
                            handleVehicleClick(vehicle);
                            navigate(`/vehicle/${vehicle.id}`);
                          }}
                          className="font-bold text-white text-base md:text-lg hover:text-yellow-400 transition cursor-pointer line-clamp-1 leading-snug"
                        >
                          {vehicle.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                          Brand: {vehicle.brand}
                        </p>

                        {/* Specs grid */}
                        <div className="grid grid-cols-3 gap-2.5 my-4 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-[11px] font-bold text-gray-400">
                          {vehicle.fuelType !== "None" && (
                            <div className="flex items-center gap-1.5">
                              <Fuel size={12} className="text-yellow-400" />
                              <span className="truncate">{vehicle.fuelType}</span>
                            </div>
                          )}
                          {vehicle.transmission !== "None" && (
                            <div className="flex items-center gap-1.5">
                              <Settings size={12} className="text-yellow-400" />
                              <span className="truncate">{vehicle.transmission}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-yellow-400" />
                            <span>{vehicle.seats} Seats</span>
                          </div>
                          <div className="col-span-3 border-t border-white/5 mt-1 pt-1 flex items-center justify-between text-[10px] text-gray-500 font-semibold">
                            <div className="flex items-center gap-1">
                              <Compass size={11} /> {vehicle.locationName} ({vehicle.distance})
                            </div>
                            <div>
                              <Clock size={11} className="inline mr-1" /> {vehicle.mileage}
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Pricing row & buttons */}
                      <div className="border-t border-white/5 pt-4 mt-2">
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Price Per Day</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-black text-white">₹{vehicle.dailyPrice}</span>
                              {vehicle.oldPrice > vehicle.dailyPrice && (
                                <span className="text-xs text-gray-500 line-through font-medium">
                                  ₹{vehicle.oldPrice}
                                </span>
                              )}
                              <span className="text-xs text-gray-400 font-semibold">/day</span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-bold">₹{vehicle.hourlyPrice}/hour</span>
                          </div>
                          
                          {/* Compare toggle badge button */}
                          <button
                            onClick={() => toggleCompare(vehicle)}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all cursor-pointer ${
                              isComparing
                                ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                                : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
                            }`}
                          >
                            <GitCompare size={12} />
                            {isComparing ? "Comparing" : "Compare"}
                          </button>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            onClick={() => {
                              handleVehicleClick(vehicle);
                              navigate(`/vehicle/${vehicle.id}`);
                            }}
                            className="w-full text-center border border-white/10 hover:border-yellow-400/30 hover:text-yellow-400 bg-white/5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Details
                          </button>
                          <Button
                            variant="primary"
                            className="w-full px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
                            onClick={() => {
                              handleVehicleClick(vehicle);
                              navigate(`/vehicle/${vehicle.id}`);
                            }}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>

                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] border border-white/5 rounded-[24px]">
            <div className="p-5 bg-yellow-400/10 rounded-full text-yellow-400 mb-4 animate-pulse">
              <SlidersHorizontal size={36} />
            </div>
            <h3 className="text-xl font-bold text-white">No Vehicles Match Your Criteria</h3>
            <p className="text-sm text-gray-400 mt-1.5 max-w-sm font-medium">
              We couldn't find vehicles within your requested capacity, fuel, price, or location coordinates. Try expanding your search terms.
            </p>
            <Button variant="primary" onClick={handleReset} className="mt-6 font-extrabold uppercase text-xs tracking-wider">
              Reset All Filters
            </Button>
          </Card>
        )}
      </section>

      {/* Pagination component */}
      {totalPages > 1 && (
        <section className="max-w-7xl mx-auto px-6 mb-16 flex justify-center">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 p-1.5 rounded-xl">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-transparent hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer text-xs font-bold"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentPage === idx + 1
                    ? "bg-yellow-400 text-black font-extrabold"
                    : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-transparent hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer text-xs font-bold"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {/* Floating Comparison Bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-4xl"
          >
            <div className="bg-[#111827] border border-white/10 rounded-[20px] p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-yellow-400/10 border border-yellow-400/25 rounded-full flex items-center justify-center text-yellow-400 font-bold text-sm shrink-0">
                  {compareList.length}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Compare Vehicles</h4>
                  <p className="text-[10px] text-gray-400">Select up to 3 models to analyze details side-by-side.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto p-1">
                {compareList.map(v => (
                  <div key={v.id} className="relative flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-2 py-1 shrink-0">
                    <img src={v.image} className="w-8 h-8 rounded object-cover" alt="" />
                    <span className="text-[10px] font-bold text-white/90 line-clamp-1 max-w-[80px]">{v.name}</span>
                    <button 
                      onClick={() => toggleCompare(v)}
                      className="text-gray-500 hover:text-red-400 transition"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => setCompareList([])}
                  className="w-full md:w-auto px-4 py-2 rounded-xl text-[10px] font-bold text-gray-400 hover:text-white border border-white/5 hover:bg-white/5 transition uppercase tracking-wider cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="w-full md:w-auto px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-black hover:bg-yellow-300 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Compare Now <GitCompare size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Popup */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl bg-[#111827] border border-white/10 rounded-[28px] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#111827] z-20 flex justify-between items-center p-6 border-b border-white/5">
                <h3 className="text-base font-extrabold uppercase tracking-widest text-yellow-400 flex items-center gap-2">
                  <GitCompare size={16} /> Technical Comparison
                </h3>
                <button 
                  onClick={() => setIsCompareOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 text-xs font-bold text-gray-400">
                  {/* Headers */}
                  <div className="border-b border-white/5 pb-4 flex flex-col justify-end">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Specs Matrix</span>
                  </div>
                  {compareList.map(v => (
                    <div key={v.id} className="border-b border-white/5 pb-4 text-center">
                      <img src={v.image} className="w-full h-24 rounded-lg object-cover border border-white/5 mb-2" alt="" />
                      <h4 className="font-extrabold text-white text-xs line-clamp-1">{v.name}</h4>
                      <p className="text-[10px] text-yellow-400 mt-0.5">₹{v.dailyPrice}/day</p>
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} className="border-b border-white/5 pb-4 bg-white/[0.01] rounded-lg border border-dashed border-white/5 flex flex-col items-center justify-center h-full min-h-[140px] text-gray-600">
                      <Car size={24} />
                      <span className="text-[9px] uppercase tracking-wider mt-1.5 font-bold">Empty Slot</span>
                    </div>
                  ))}

                  {/* Pricing row */}
                  <div className="py-3 border-b border-white/5">Price Per Hour</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">₹{v.hourlyPrice}/hr</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Fuel type row */}
                  <div className="py-3 border-b border-white/5">Fuel Source</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.fuelType}</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Transmission row */}
                  <div className="py-3 border-b border-white/5">Gear System</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.transmission}</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Seats row */}
                  <div className="py-3 border-b border-white/5">Capacity / Seats</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.seats} Seats</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Mileage/Range row */}
                  <div className="py-3 border-b border-white/5">Range &amp; Mileage</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.mileage}</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Rating row */}
                  <div className="py-3 border-b border-white/5">User Rating</div>
                  {compareList.map(v => (
                    <div key={v.id} className="py-3 border-b border-white/5 text-center text-yellow-400 font-extrabold flex items-center justify-center gap-0.5">
                      {v.rating} <Star size={11} fill="currentColor" />
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Action buttons */}
                  <div className="py-4" />
                  {compareList.map(v => (
                    <div key={v.id} className="py-4 text-center">
                      <Button
                        variant="primary"
                        className="px-4 py-2 rounded-xl text-[10px] font-black uppercase"
                        onClick={() => {
                          setIsCompareOpen(false);
                          navigate(`/vehicle/${v.id}`);
                        }}
                      >
                        Book This
                      </Button>
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-4" />)}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recently Viewed Panel */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
            <Clock size={16} className="text-yellow-400" /> Recently Viewed Vehicles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map(v => (
              <div 
                key={v.id}
                onClick={() => navigate(`/vehicle/${v.id}`)}
                className="bg-white/[0.02] border border-white/5 hover:border-yellow-400/25 rounded-xl p-3 flex items-center gap-3 transition cursor-pointer"
              >
                <img src={v.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div>
                  <h4 className="text-[11px] font-bold text-white line-clamp-1">{v.name}</h4>
                  <p className="text-[10px] text-yellow-400 mt-0.5 font-bold">₹{v.dailyPrice}/day</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Vehicles Slider/List */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
          <Sparkles size={16} className="text-yellow-400" /> Recommended For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedVehicles.map(v => (
            <Card
              key={v.id}
              variant="dark"
              className="bg-gradient-to-br from-[#111827] to-[#0f172a] border border-white/5 hover:border-yellow-400/25 transition p-5 flex gap-4"
            >
              <img src={v.image} className="w-20 h-20 rounded-xl object-cover border border-white/5" alt="" />
              <div className="flex-grow flex flex-col justify-between text-left">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{v.name}</h4>
                  <div className="flex items-center gap-0.5 text-yellow-400 font-extrabold text-[10px] mt-0.5">
                    {v.rating} <Star size={10} fill="currentColor" />
                    <span className="text-gray-500 font-bold ml-1">({v.reviewsCount} reviews)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-black text-white">₹{v.dailyPrice}/day</span>
                  <button 
                    onClick={() => navigate(`/vehicle/${v.id}`)}
                    className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    View <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-lg font-black uppercase tracking-wider text-white">Browse &amp; Rental Help</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium">Clear insights on pickup instructions, deposit policies, and peer-to-peer rules.</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <FAQAccordion items={browseFAQs} />
        </div>
      </section>

    </div>
  );
};

export default BrowseVehicles;
