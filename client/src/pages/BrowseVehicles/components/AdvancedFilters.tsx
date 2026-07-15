import React from "react";
import { Filter, RefreshCcw, MapPin, Calendar, Car, Fuel, Settings2, Users } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

interface AdvancedFiltersProps {
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  fuelType: string;
  setFuelType: (val: string) => void;
  transmission: string;
  setTransmission: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  seats: string;
  setSeats: (val: string) => void;
  pickupDate: string;
  setPickupDate: (val: string) => void;
  returnDate: string;
  setReturnDate: (val: string) => void;
  onReset: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  searchLocation,
  setSearchLocation,
  selectedType,
  setSelectedType,
  fuelType,
  setFuelType,
  transmission,
  setTransmission,
  maxPrice,
  setMaxPrice,
  seats,
  setSeats,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  onReset,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-6 shadow-xl sticky top-24">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
          <Filter className="text-yellow-500" size={20} />
          Filters
        </h3>
        <button 
          onClick={onReset}
          className="text-xs font-bold text-gray-500 hover:text-yellow-600 transition-colors flex items-center gap-1"
        >
          <RefreshCcw size={14} /> Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            <MapPin size={14} className="text-gray-400" /> Location
          </label>
          <input
            type="text"
            placeholder="City, airport, or address"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              <Calendar size={14} className="text-gray-400" /> Pickup
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              <Calendar size={14} className="text-gray-400" /> Return
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Vehicle Type Grid */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            <Car size={14} className="text-gray-400" /> Vehicle Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["all", "car", "bike", "scooter", "cycle"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedType === t
                    ? "bg-yellow-400 text-black shadow-md scale-[1.02]"
                    : "bg-white/50 border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Max Price
            </label>
            <span className="text-sm font-extrabold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-md">
              ₹{maxPrice}/hr
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="1000"
            step="20"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 uppercase">
            <span>₹40</span>
            <span>₹1000+</span>
          </div>
        </div>

        {/* Filters Group */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              <Fuel size={14} className="text-gray-400" /> Fuel Type
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all cursor-pointer appearance-none"
            >
              <option value="all">Any Fuel Type</option>
              <option value="Electric">Electric</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              <Settings2 size={14} className="text-gray-400" /> Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all cursor-pointer appearance-none"
            >
              <option value="all">Any Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              <Users size={14} className="text-gray-400" /> Capacity
            </label>
            <select
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all cursor-pointer appearance-none"
            >
              <option value="all">Any Capacity</option>
              <option value="1">1 Seat</option>
              <option value="2">2 Seats</option>
              <option value="5">5+ Seats</option>
              <option value="7">7+ Seats</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
