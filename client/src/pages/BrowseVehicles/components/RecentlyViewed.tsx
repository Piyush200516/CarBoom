import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VehicleWithExtras } from "./VehicleCard";

interface RecentlyViewedProps {
  vehicles: VehicleWithExtras[];
  onVehicleClick: (vehicle: VehicleWithExtras) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  vehicles,
  onVehicleClick
}) => {
  const navigate = useNavigate();
  const [history, setHistory] = React.useState<VehicleWithExtras[]>([]);

  React.useEffect(() => {
    try {
      const savedIds = localStorage.getItem("recentlyViewed");
      if (savedIds) {
        const ids: string[] = JSON.parse(savedIds);
        // Find matching vehicles, keep the search ordering
        const matched = ids
          .map(id => vehicles.find(v => v.id === id))
          .filter((v): v is VehicleWithExtras => !!v);
        setHistory(matched.slice(0, 4));
      }
    } catch (e) {
      console.error("Failed to load recently viewed history", e);
    }
  }, [vehicles]);

  if (history.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
        <Clock size={16} className="text-yellow-400" />
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">History Log</span>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mt-0.5">Recently Viewed Vehicles</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {history.map(v => (
          <div
            key={v.id}
            onClick={() => {
              onVehicleClick(v);
              navigate(`/vehicle/${v.id}`);
            }}
            className="bg-white/[0.02] border border-white/5 hover:border-yellow-400/25 rounded-xl p-3 flex items-center gap-3 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 bg-[#1e293b] shrink-0">
              <img
                src={v.image}
                alt={v.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="text-[11px] font-bold text-white line-clamp-1 group-hover:text-yellow-400 transition-colors">
                {v.name}
              </h4>
              <p className="text-[10px] text-yellow-400 mt-0.5 font-bold">
                ₹{v.dailyPrice}/day
              </p>
            </div>
            <ArrowRight size={10} className="text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
