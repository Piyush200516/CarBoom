// src/components/common/VehicleCard.tsx
import * as React from "react";
import { Heart, Users, Fuel, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Vehicle } from "../../data/mockData";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RatingStars } from "./RatingStars";
import { useToast } from "../ui/Toast";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
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
    <Link to={`/vehicle/${vehicle.id}`} className="block">
      <Card
        className="overflow-hidden border border-gray-100 bg-white p-4 h-full flex flex-col group"
        hoverEffect
      >
        {/* Image Container with Hover zoom */}
        <div className="relative w-full h-48 rounded-[16px] overflow-hidden bg-gray-50 shrink-0">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/20 hover:bg-white text-gray-700 hover:text-red-500 shadow-sm transition cursor-pointer"
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-red-500 text-red-500 scale-110 transition-transform" : "transition-transform"}
            />
          </button>
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
            {vehicle.category}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between mt-4">
          <div className="space-y-2">
            {/* Header / Name */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-yellow-600 transition duration-200">
                {vehicle.name}
              </h3>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1.5">
              <RatingStars rating={vehicle.rating} size={14} />
              <span className="text-xs font-bold text-gray-600">
                {vehicle.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">
                ({vehicle.reviewsCount} reviews)
              </span>
            </div>

            {/* Specifications row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1.5 text-xs text-gray-500 font-bold">
              {vehicle.fuelType !== "None" && (
                <div className="flex items-center gap-1">
                  <Fuel size={14} className="text-gray-400" />
                  <span>{vehicle.fuelType}</span>
                </div>
              )}
              {vehicle.transmission !== "None" && (
                <div className="flex items-center gap-1">
                  <Settings size={14} className="text-gray-400" />
                  <span>{vehicle.transmission}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Users size={14} className="text-gray-400" />
                <span>{vehicle.seats} seats</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50 shrink-0">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase">Pricing</div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-gray-900">₹{vehicle.hourlyPrice}</span>
                <span className="text-xs font-semibold text-gray-500">/hr</span>
              </div>
              <div className="text-[10px] text-gray-400 font-bold">
                ₹{vehicle.dailyPrice}/day
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleBookNow}
              className="px-4 py-2 text-xs font-bold font-heading uppercase tracking-wider"
            >
              Book Now
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VehicleCard;
