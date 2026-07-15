import React from "react";
import { Star, Sparkles, Fuel, Settings, ArrowRight } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { VehicleWithExtras } from "./VehicleCard";

interface RecommendedVehiclesProps {
  vehicles: VehicleWithExtras[];
  onVehicleClick: (vehicle: VehicleWithExtras) => void;
}

export const RecommendedVehicles: React.FC<RecommendedVehiclesProps> = ({
  vehicles,
  onVehicleClick
}) => {
  const navigate = useNavigate();

  // Pick up top 3 high-rated items
  const recommendedItems = React.useMemo(() => {
    return vehicles
      .filter(v => v.rating >= 4.7)
      .slice(0, 3)
      .map((v, i) => {
        const matches = ["98% Match", "95% Match", "92% Match"];
        return {
          ...v,
          matchScore: matches[i] || "90% Match"
        };
      });
  }, [vehicles]);

  if (recommendedItems.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="border-b border-white/5 pb-4 mb-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 flex items-center gap-1">
          <Sparkles size={11} className="animate-pulse" /> Personalized Picks
        </span>
        <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-0.5">Recommended For You</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedItems.map((v) => (
          <Card
            key={v.id}
            variant="dark"
            className="bg-gradient-to-br from-[#131b2e] to-[#0f172a] border border-white/5 hover:border-yellow-400/25 transition-all duration-300 p-5 flex gap-4 h-full relative overflow-hidden group"
          >
            {/* Corner Match badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-bl-xl flex items-center gap-0.5">
              <Sparkles size={8} />
              {v.matchScore}
            </div>

            {/* Thumbnail */}
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/5 bg-[#1e293b] shrink-0">
              <img
                src={v.image}
                alt={v.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info details */}
            <div className="flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 
                  onClick={() => onVehicleClick(v)}
                  className="text-sm font-bold text-white line-clamp-1 cursor-pointer hover:text-yellow-400 transition-colors"
                >
                  {v.name}
                </h4>
                <div className="flex items-center gap-0.5 text-yellow-400 font-extrabold text-[10px] mt-1">
                  <span>{v.rating}</span>
                  <Star size={9} fill="currentColor" />
                  <span className="text-gray-500 font-semibold ml-1">({v.reviewsCount} reviews)</span>
                </div>

                <div className="flex gap-2 text-[9px] text-gray-400 font-bold mt-2">
                  <span className="flex items-center gap-0.5">
                    <Fuel size={10} className="text-yellow-400/70" /> {v.fuelType}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Settings size={10} className="text-yellow-400/70" /> {v.transmission}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                <span className="text-xs font-black text-white">₹{v.dailyPrice}/day</span>
                <button 
                  onClick={() => {
                    onVehicleClick(v);
                    navigate(`/vehicle/${v.id}`);
                  }}
                  className="text-[9px] font-black uppercase tracking-widest text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  View Details <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendedVehicles;
