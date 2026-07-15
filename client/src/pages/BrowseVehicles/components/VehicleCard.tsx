import React from "react";
import { Heart, ShieldCheck, Star, Fuel, Settings, Users, Compass, Clock, GitCompare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export interface VehicleWithExtras {
  id: string;
  name: string;
  type: "car" | "bike" | "scooter" | "cycle";
  category: string;
  image: string;
  images: string[];
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "None";
  transmission: "Automatic" | "Manual" | "None";
  seats: number;
  rating: number;
  reviewsCount: number;
  hourlyPrice: number;
  dailyPrice: number;
  mileage: string;
  ownerName: string;
  ownerAvatar: string;
  ownerRating: number;
  description: string;
  features: string[];
  
  // Custom extra fields for premium UI
  brand: string;
  distance: string;
  locationName: string;
  instantBook: boolean;
  oldPrice: number;
  discountBadge?: string;
  ownerReviewsCount: number;
}

interface VehicleCardProps {
  vehicle: VehicleWithExtras;
  isWishlisted: boolean;
  isComparing: boolean;
  onWishlistToggle: () => void;
  onCompareToggle: () => void;
  onBookNow: () => void;
  onViewDetails: () => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isWishlisted,
  isComparing,
  onWishlistToggle,
  onCompareToggle,
  onBookNow,
  onViewDetails
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group h-full"
    >
      <Card
        variant="glass"
        className="relative overflow-hidden border border-white/5 hover:border-yellow-400/40 transition-all duration-500 p-0 flex flex-col h-full bg-[#111827]/40 backdrop-blur-md"
      >
        {/* Top Image Panel */}
        <div className="relative overflow-hidden w-full h-56 bg-[#1a2236] shrink-0">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onClick={onViewDetails}
            loading="lazy"
          />

          {/* Glowing gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle();
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/85 hover:border-white/20 text-white transition z-10 cursor-pointer"
            aria-label="Add to wishlist"
          >
            <Heart
              size={15}
              className={isWishlisted ? "fill-red-500 text-red-500 scale-110 transition-transform" : "text-white transition-transform"}
            />
          </button>

          {/* Badges Overlay (Top Left) */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
            {vehicle.discountBadge && (
              <span className="bg-red-500/90 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                <Sparkles size={8} />
                {vehicle.discountBadge}
              </span>
            )}
            {vehicle.instantBook && (
              <span className="bg-emerald-500/90 text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                Instant Book
              </span>
            )}
          </div>

          {/* Category Badge overlay (bottom left) */}
          <div className="absolute bottom-3 left-3 bg-[#0f172a]/90 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-yellow-400 px-2.5 py-0.5 rounded-md pointer-events-none">
            {vehicle.category}
          </div>
        </div>

        {/* Content Panel */}
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div className="space-y-4">
            {/* Owner Details Header */}
            <div className="flex justify-between items-center text-[10px] text-gray-400 border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <img
                  src={vehicle.ownerAvatar}
                  alt={vehicle.ownerName}
                  className="w-5 h-5 rounded-full object-cover border border-white/10"
                />
                <span className="font-semibold text-white/80">{vehicle.ownerName}</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span className="text-[9px] text-emerald-400 flex items-center gap-0.5 font-bold uppercase">
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

            {/* Vehicle Title & Brand */}
            <div>
              <h3 
                onClick={onViewDetails}
                className="font-bold text-white text-base md:text-lg hover:text-yellow-400 transition cursor-pointer line-clamp-1 leading-snug"
              >
                {vehicle.name}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                Brand: <span className="text-white/90">{vehicle.brand}</span>
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-[10px] font-bold text-gray-400">
              {vehicle.fuelType !== "None" && (
                <div className="flex items-center gap-1.5" title="Fuel Type">
                  <Fuel size={12} className="text-yellow-400" />
                  <span className="truncate">{vehicle.fuelType}</span>
                </div>
              )}
              {vehicle.transmission !== "None" && (
                <div className="flex items-center gap-1.5" title="Transmission">
                  <Settings size={12} className="text-yellow-400" />
                  <span className="truncate">{vehicle.transmission}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5" title="Seats">
                <Users size={12} className="text-yellow-400" />
                <span>{vehicle.seats} Seats</span>
              </div>

              {/* Bottom Specs Info */}
              <div className="col-span-3 border-t border-white/5 mt-1.5 pt-1.5 flex items-center justify-between text-[9px] text-gray-500 font-semibold">
                <div className="flex items-center gap-1">
                  <Compass size={11} className="text-yellow-400/70" />
                  <span className="truncate max-w-[100px]">{vehicle.locationName}</span>
                  <span>({vehicle.distance})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-yellow-400/70" />
                  <span>{vehicle.mileage}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Buttons */}
          <div className="border-t border-white/5 pt-4 mt-4">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Price Per Day</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-white">₹{vehicle.dailyPrice}</span>
                  {vehicle.oldPrice > vehicle.dailyPrice && (
                    <span className="text-xs text-gray-500 line-through font-medium">
                      ₹{vehicle.oldPrice}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-semibold">/day</span>
                </div>
                <span className="text-[9px] text-gray-500 font-bold block mt-0.5">₹{vehicle.hourlyPrice}/hour</span>
              </div>
              
              {/* Compare toggle button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareToggle();
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isComparing
                    ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                    : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
                }`}
              >
                <GitCompare size={11} />
                {isComparing ? "Comparing" : "Compare"}
              </button>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onViewDetails}
                className="w-full text-center border border-white/10 hover:border-yellow-400/30 hover:text-yellow-400 bg-white/5 hover:bg-white/10 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer uppercase tracking-wider"
              >
                Details
              </button>
              <Button
                variant="primary"
                className="w-full px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md"
                onClick={onBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default VehicleCard;
