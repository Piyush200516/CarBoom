// src/pages/Dashboard/Wishlist.tsx
import * as React from "react";
import { 
  Heart, Search, Fuel, Settings, Users, Star, Trash2, GitCompare, 
  Share2, ArrowRight, Sparkles, Clock, Compass
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { mockVehicles, Vehicle } from "../../data/mockData";

// Enhanced structure matching Browse page
interface EnhancedVehicle extends Vehicle {
  brand: string;
  distance: string;
  locationName: string;
  oldPrice: number;
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
  const locationName = locationMap[v.id] || "Indore";
  
  return {
    ...v,
    brand,
    distance: "1.5 km",
    locationName,
    oldPrice: Math.round(v.dailyPrice * 1.25)
  };
});

export const Wishlist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load wishlist IDs from localStorage
  const [wishlistIds, setWishlistIds] = React.useState<string[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("all");

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = React.useState<EnhancedVehicle[]>([]);

  // Load recently viewed
  React.useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      const ids: string[] = JSON.parse(saved);
      const items = ids
        .map(id => enhancedMockVehicles.find(v => v.id === id))
        .filter((v): v is EnhancedVehicle => !!v);
      setRecentlyViewed(items.slice(0, 4));
    }
  }, []);

  // Map wishlist IDs to full vehicles
  const wishlistedVehicles = React.useMemo(() => {
    return wishlistIds
      .map(id => enhancedMockVehicles.find(v => v.id === id))
      .filter((v): v is EnhancedVehicle => !!v);
  }, [wishlistIds]);

  // Apply search/category filter inside wishlist
  const filteredVehicles = React.useMemo(() => {
    return wishlistedVehicles.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.brand.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedType !== "all" && v.type !== selectedType) return false;
      return true;
    });
  }, [wishlistedVehicles, searchQuery, selectedType]);

  // Remove from Wishlist
  const handleRemoveWishlist = (id: string, name: string) => {
    const updated = wishlistIds.filter(item => item !== id);
    setWishlistIds(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast("Removed from Wishlist", {
      description: `${name} has been removed from your saved items.`,
      type: "success"
    });
  };

  // Mock share logic
  const handleShare = (name: string) => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link Copied!", {
      description: `A sharing link for ${name} has been copied to your clipboard.`,
      type: "success"
    });
  };

  // Mock compare
  const handleCompare = (name: string) => {
    toast("Added to Compare List", {
      description: `${name} has been marked for comparison. Open Browse to view side-by-side specs.`,
      type: "info"
    });
  };

  const recommendedVehicles = React.useMemo(() => {
    return enhancedMockVehicles.filter(v => !wishlistIds.includes(v.id)).slice(0, 4);
  }, [wishlistIds]);

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen pt-4 pb-16 selection:bg-yellow-400 selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Hero Banner Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading">
              My Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">Vehicles</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">
              You have <span className="text-yellow-400 font-extrabold">{wishlistedVehicles.length} vehicles</span> saved in your favorites library.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate("/browse")}
            className="text-xs font-black uppercase tracking-wider rounded-xl shadow-yellow-glow-hover flex items-center gap-1.5"
          >
            Explore Vehicles <ArrowRight size={13} />
          </Button>
        </div>

        {/* Filter controls row (only show if they have saved items) */}
        {wishlistedVehicles.length > 0 && (
          <section className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
            {/* Quick Type Selection */}
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto p-0.5">
              {["all", "car", "bike", "scooter", "cycle"].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition uppercase tracking-wider cursor-pointer ${
                    selectedType === type
                      ? "bg-yellow-400 text-black font-extrabold shadow"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {type}s
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:max-w-xs shrink-0">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={13} />
              </span>
              <input
                type="text"
                placeholder="Search within saved items..."
                className="w-full bg-[#131b2e] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </section>
        )}

        {/* Main Grid display */}
        <section className="mb-16">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredVehicles.map(v => (
                  <motion.div
                    key={v.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card variant="glass" className="bg-[#111827]/40 border border-white/5 p-4 rounded-[20px] flex flex-col justify-between h-full hover:border-yellow-400/25 transition relative overflow-hidden group">
                      
                      {/* Image panel */}
                      <div className="relative w-full h-40 rounded-[14px] overflow-hidden bg-[#1a2236] shrink-0 border border-white/5">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                        
                        {/* Remove button */}
                        <button
                          onClick={() => handleRemoveWishlist(v.id, v.name)}
                          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 text-white transition-all cursor-pointer z-10"
                          title="Remove from favorites"
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="absolute bottom-2.5 left-2.5 bg-[#0b0f19]/80 backdrop-blur-md border border-white/5 text-[8px] font-black uppercase tracking-widest text-yellow-400 px-2 py-0.5 rounded">
                          {v.category}
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="flex-grow flex flex-col justify-between mt-3 text-left">
                        <div className="space-y-1.5">
                          <h3 
                            onClick={() => navigate(`/vehicle/${v.id}`)}
                            className="font-bold text-white text-sm md:text-base hover:text-yellow-400 transition cursor-pointer line-clamp-1"
                          >
                            {v.name}
                          </h3>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Brand: {v.brand}</p>
                          
                          {/* Rating review block */}
                          <div className="flex items-center gap-1 text-[11px] font-bold">
                            <span className="text-yellow-400 flex items-center gap-0.5">
                              {v.rating} <Star size={10} fill="currentColor" />
                            </span>
                            <span className="text-gray-500 font-semibold">({v.reviewsCount} reviews)</span>
                          </div>

                          {/* Specification indicators */}
                          <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold pt-1">
                            {v.fuelType !== "None" && (
                              <span className="flex items-center gap-0.5"><Fuel size={11} className="text-yellow-400" /> {v.fuelType}</span>
                            )}
                            {v.transmission !== "None" && (
                              <span className="flex items-center gap-0.5"><Settings size={11} className="text-yellow-400" /> {v.transmission}</span>
                            )}
                            <span className="flex items-center gap-0.5"><Users size={11} className="text-yellow-400" /> {v.seats} Seats</span>
                          </div>
                          
                          <div className="text-[9px] text-gray-500 font-bold flex items-center gap-0.5 pt-0.5">
                            <Compass size={10} /> {v.locationName}
                          </div>
                        </div>

                        {/* Pricing details and actions */}
                        <div className="border-t border-white/5 pt-3 mt-4">
                          <div className="flex justify-between items-baseline mb-3">
                            <div>
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Price Per Day</span>
                              <span className="text-base font-black text-white">₹{v.dailyPrice}</span>
                              <span className="text-[10px] text-gray-400 font-semibold">/day</span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-bold">₹{v.hourlyPrice}/hr</span>
                          </div>

                          {/* Action grids */}
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                            <button
                              onClick={() => handleCompare(v.name)}
                              className="flex items-center justify-center gap-1 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-yellow-400/20 text-gray-300 hover:text-yellow-400 transition cursor-pointer"
                            >
                              <GitCompare size={11} /> Compare
                            </button>
                            <button
                              onClick={() => handleShare(v.name)}
                              className="flex items-center justify-center gap-1 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-white/20 text-gray-300 hover:text-white transition cursor-pointer"
                            >
                              <Share2 size={11} /> Share
                            </button>
                          </div>

                          <Button
                            variant="primary"
                            className="w-full mt-2 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg"
                            onClick={() => navigate(`/vehicle/${v.id}`)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>

                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] border border-white/5 rounded-[24px]">
              <div className="p-5 bg-yellow-400/10 rounded-full text-yellow-400 mb-4 animate-pulse">
                <Heart size={36} className="text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Your Wishlist is Empty</h3>
              <p className="text-sm text-gray-400 mt-1.5 max-w-sm font-medium">
                Save vehicles you like while browsing to find them here and book them later!
              </p>
              <Button variant="primary" onClick={() => navigate("/browse")} className="mt-6 font-extrabold uppercase text-xs tracking-wider rounded-xl">
                Browse Vehicles
              </Button>
            </Card>
          )}
        </section>

        {/* Recently Viewed Panel */}
        {recentlyViewed.length > 0 && (
          <section className="max-w-7xl mx-auto mb-16 text-left">
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

        {/* Recommended Vehicles Section */}
        {recommendedVehicles.length > 0 && (
          <section className="text-left mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
              <Sparkles size={16} className="text-yellow-400" /> Recommended For You
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedVehicles.map(v => (
                <Card
                  key={v.id}
                  variant="dark"
                  className="bg-gradient-to-br from-[#111827] to-[#0f172a] border border-white/5 hover:border-yellow-400/25 transition p-4 flex flex-col justify-between"
                >
                  <div>
                    <img src={v.image} className="w-full h-32 rounded-xl object-cover border border-white/5 mb-3" alt="" />
                    <h4 className="text-xs font-bold text-white line-clamp-1">{v.name}</h4>
                    <div className="flex items-center gap-0.5 text-yellow-400 font-extrabold text-[10px] mt-0.5">
                      {v.rating} <Star size={10} fill="currentColor" />
                      <span className="text-gray-500 font-bold ml-1">({v.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs font-black text-white">₹{v.dailyPrice}/day</span>
                    <button 
                      onClick={() => navigate(`/vehicle/${v.id}`)}
                      className="text-[10px] font-bold text-yellow-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      Book <ArrowRight size={10} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
