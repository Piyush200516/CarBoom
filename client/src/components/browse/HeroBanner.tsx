import * as React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroBannerProps {
  onSearch: (location: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSearch }) => {
  const [location, setLocation] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden bg-black mt-16 lg:mt-20">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376712394-6b5ca4b6b71f?auto=format&fit=crop&q=80&w=2000"
          alt="Premium luxury car"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Find Your <span className="text-yellow-400">Perfect Ride</span> Today
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 max-w-xl">
            Experience luxury, comfort, and performance with our premium fleet of vehicles ready for your next journey.
          </p>
        </motion.div>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-2xl md:rounded-full w-full max-w-4xl shadow-2xl"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 w-full bg-white rounded-xl md:rounded-full flex items-center px-4 py-3">
              <MapPin className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-900 font-semibold text-sm md:text-base placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex-1 w-full bg-white rounded-xl md:rounded-full flex items-center px-4 py-3">
              <Calendar className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Pick-up date - Return date"
                className="w-full bg-transparent border-none outline-none text-gray-900 font-semibold text-sm md:text-base placeholder:text-gray-400"
                readOnly // for mockup purposes
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto rounded-xl md:rounded-full px-8 py-3.5 h-auto text-sm font-bold uppercase tracking-wider bg-yellow-400 hover:bg-yellow-500 text-black border-none"
            >
              <Search size={18} className="mr-2 inline-block" />
              Search
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
