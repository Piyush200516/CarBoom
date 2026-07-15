import * as React from "react";
import { Heart, Users, Fuel, Settings, MapPin, Zap, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Vehicle } from "../../data/mockData";
import { RatingStars } from "../common/RatingStars";
import { useToast } from "../ui/Toast";
import { motion } from "framer-motion";

interface PremiumVehicleCardProps {
  vehicle: Vehicle;
}

export const PremiumVehicleCard: React.FC<PremiumVehicleCardProps> = ({ vehicle }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      {
        description: `${vehicle.name} is ${isWishlisted ? "removed from" : "saved in"} your favorites list.`,
        type: "success"
      }
    );
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-full flex flex-col bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Image Container with Hover zoom */}
      <Link to={`/vehicle/${vehicle.id}`} className="relative w-full h-56 shrink-0 block overflow-hidden bg-gray-100">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {vehicle.discountBadge && (
            <div className="bg-yellow-400 text-black text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm flex items-center gap-1">
              <Zap size={12} className="fill-black" />
              {vehicle.discountBadge}
            </div>
          )}
          {vehicle.instantBooking && (
            <div className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm">
              Instant Booking
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/50 hover:bg-white text-gray-700 hover:text-red-500 shadow-sm transition-all duration-300 cursor-pointer z-10"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-red-500 text-red-500 scale-110 transition-transform" : "transition-transform"}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              {vehicle.brand || vehicle.category}
              {vehicle.verifiedOwner && (
                <ShieldCheck size={14} className="text-blue-500 inline-block" title="Verified Owner" />
              )}
            </div>
            <Link to={`/vehicle/${vehicle.id}`}>
              <h3 className="font-extrabold text-gray-900 text-lg md:text-xl line-clamp-1 group-hover:text-yellow-600 transition-colors duration-200">
                {vehicle.name}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <RatingStars rating={vehicle.rating} size={14} />
              <span className="text-xs font-bold text-yellow-700">{vehicle.rating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold mt-1">({vehicle.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold mb-4">
          <MapPin size={14} className="text-gray-400" />
          <span className="line-clamp-1">{vehicle.location || "City Center"}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="text-gray-400 whitespace-nowrap">{vehicle.distance || "3.5 km away"}</span>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 py-3 border-y border-gray-100/50">
          {vehicle.fuelType !== "None" && (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <div className="p-1.5 bg-gray-50 rounded-md"><Fuel size={14} className="text-gray-500" /></div>
              <span>{vehicle.fuelType}</span>
            </div>
          )}
          {vehicle.transmission !== "None" && (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <div className="p-1.5 bg-gray-50 rounded-md"><Settings size={14} className="text-gray-500" /></div>
              <span>{vehicle.transmission}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <div className="p-1.5 bg-gray-50 rounded-md"><Users size={14} className="text-gray-500" /></div>
            <span>{vehicle.seats} seats</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <div className="p-1.5 bg-gray-50 rounded-md">
               {/* Custom mileage icon using text or lucide icon */}
               <span className="text-gray-500 font-bold px-1 tracking-tighter text-[10px]">KM/L</span>
            </div>
            <span>{vehicle.mileage}</span>
          </div>
        </div>

        <div className="mt-auto">
          {/* Pricing */}
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price per day</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">₹{vehicle.dailyPrice}</span>
                {vehicle.originalPrice && (
                  <span className="text-sm text-gray-400 line-through font-semibold">₹{vehicle.originalPrice}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-gray-500">₹{vehicle.hourlyPrice}/hr</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link 
              to={`/vehicle/${vehicle.id}`}
              className="flex-1 text-center py-3 rounded-xl border-2 border-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-50 hover:border-gray-200 transition-colors"
            >
              View Details
            </Link>
            <button 
              onClick={handleBookNow}
              className="flex-1 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumVehicleCard;
