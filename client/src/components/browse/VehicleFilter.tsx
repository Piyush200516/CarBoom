import * as React from "react";
import { RefreshCcw, MapPin, Check } from "lucide-react";
import { Button } from "../ui/Button";

interface FilterState {
  pickupLocation: string;
  dropLocation: string;
  type: string;
  fuelType: string;
  transmission: string;
  maxPrice: number;
  seats: string;
  brand: string;
  minRating: number;
}

interface VehicleFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  brands: string[];
}

export const VehicleFilter: React.FC<VehicleFilterProps> = ({ filters, setFilters, onReset, brands }) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Locations */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Pickup Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="City, Airport, or Address"
              value={filters.pickupLocation}
              onChange={(e) => updateFilter("pickupLocation", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Drop-off Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Same as pickup"
              value={filters.dropLocation}
              onChange={(e) => updateFilter("dropLocation", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Vehicle Type */}
      <div>
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">Vehicle Type</label>
        <div className="grid grid-cols-2 gap-2">
          {["all", "car", "bike", "scooter", "cycle"].map((t) => (
            <button
              key={t}
              onClick={() => updateFilter("type", t)}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                filters.type === t
                  ? "bg-gray-900 border-gray-900 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t === "all" ? "All Types" : `${t}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      {brands.length > 0 && (
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white font-semibold appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {/* Daily Price Range */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Max Price (Daily)</label>
          <span className="text-sm font-black text-gray-900 bg-gray-100 px-2 py-1 rounded-md">₹{filters.maxPrice}</span>
        </div>
        <div className="px-1">
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 uppercase">
          <span>₹500/day</span>
          <span>₹10,000/day</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Specifications */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">Fuel Type</label>
          <div className="flex flex-wrap gap-2">
            {["all", "Petrol", "Diesel", "Electric", "Hybrid"].map((f) => (
              <button
                key={f}
                onClick={() => updateFilter("fuelType", f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  filters.fuelType === f
                    ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {f === "all" ? "Any" : f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">Transmission</label>
          <div className="flex gap-2">
            {["all", "Automatic", "Manual"].map((t) => (
              <button
                key={t}
                onClick={() => updateFilter("transmission", t)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  filters.transmission === t
                    ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {t === "all" ? "Any" : t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">Seats</label>
          <div className="flex gap-2">
            {["all", "2", "4", "5", "7"].map((s) => (
              <button
                key={s}
                onClick={() => updateFilter("seats", s)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  filters.seats === s
                    ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {s === "all" ? "Any" : `${s}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Minimum Rating */}
      <div>
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 block">Minimum Rating</label>
        <div className="flex flex-col gap-2">
          {[4.5, 4.0, 3.0].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                filters.minRating === rating ? "bg-gray-900 border-gray-900" : "bg-white border-gray-300 group-hover:border-gray-400"
              }`}>
                {filters.minRating === rating && <Check size={14} className="text-white" />}
              </div>
              <input
                type="radio"
                name="rating"
                className="hidden"
                checked={filters.minRating === rating}
                onChange={() => updateFilter("minRating", rating)}
              />
              <span className="text-sm font-semibold text-gray-700">{rating}+ Stars</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer group mt-1">
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
              filters.minRating === 0 ? "bg-gray-900 border-gray-900" : "bg-white border-gray-300 group-hover:border-gray-400"
            }`}>
              {filters.minRating === 0 && <Check size={14} className="text-white" />}
            </div>
            <input
              type="radio"
              name="rating"
              className="hidden"
              checked={filters.minRating === 0}
              onChange={() => updateFilter("minRating", 0)}
            />
            <span className="text-sm font-semibold text-gray-700">Any Rating</span>
          </label>
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="secondary"
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-bold rounded-xl mt-4"
      >
        <RefreshCcw size={14} />
        Reset Filters
      </Button>
    </div>
  );
};

export default VehicleFilter;
