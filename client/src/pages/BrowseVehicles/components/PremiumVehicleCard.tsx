import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, Fuel, Settings2, Users, Zap, CheckCircle2, ChevronRight, Gauge } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  images: string[];
  rating: number;
  reviews: number;
  location: string;
  distance?: number;
  fuelType: string;
  transmission: string;
  seats: number;
  mileage?: string;
  hourlyPrice: number;
  originalPrice?: number;
  isInstantBook?: boolean;
  isVerified?: boolean;
  discount?: number;
}

export const PremiumVehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Derive per day price roughly
  const pricePerDay = vehicle.hourlyPrice * 24;
  const originalPricePerDay = vehicle.originalPrice ? vehicle.originalPrice * 24 : pricePerDay * 1.2;

  return (
    <motion.div
      className="relative group bg-white/70 backdrop-blur-md rounded-[32px] border border-white/50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Top Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={vehicle.images[0] || "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80"}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {vehicle.discount && (
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {vehicle.discount}% OFF
            </div>
          )}
          {vehicle.isInstantBook && (
            <div className="bg-yellow-400 text-black flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <Zap size={12} className="fill-current" /> Instant
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 z-10 p-2.5 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition-all shadow-lg"
        >
          <Heart
            size={20}
            className={`${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{vehicle.brand}</span>
              {vehicle.isVerified && (
                <CheckCircle2 size={14} className="text-blue-500" />
              )}
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
              {vehicle.name}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-lg">
              <Star size={14} className="text-yellow-600 fill-yellow-500" />
              <span className="text-sm font-bold text-yellow-700">{vehicle.rating}</span>
            </div>
            <span className="text-[10px] text-gray-500 font-semibold mt-1">({vehicle.reviews} reviews)</span>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium mb-5">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-gray-400" />
            {vehicle.location}
          </div>
          {vehicle.distance && (
            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-md text-xs font-bold">
              {vehicle.distance} km away
            </div>
          )}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-4 gap-2 mb-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
          <div className="flex flex-col items-center gap-1 text-gray-600">
            <Fuel size={16} className="text-gray-400" />
            <span className="text-xs font-bold">{vehicle.fuelType}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-600">
            <Settings2 size={16} className="text-gray-400" />
            <span className="text-xs font-bold">{vehicle.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-600">
            <Users size={16} className="text-gray-400" />
            <span className="text-xs font-bold">{vehicle.seats}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-600">
            <Gauge size={16} className="text-gray-400" />
            <span className="text-xs font-bold">{vehicle.mileage || "N/A"}</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-xs text-gray-400 font-bold line-through mb-0.5">
              ₹{originalPricePerDay.toLocaleString()} / day
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-gray-900">₹{pricePerDay.toLocaleString()}</span>
              <span className="text-sm font-bold text-gray-500">/day</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
              <ChevronRight size={20} />
            </button>
            <Button variant="primary" className="px-6 py-3 rounded-xl shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50">
              Book
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
