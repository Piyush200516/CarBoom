// src/components/common/SearchBar.tsx
import * as React from "react";
import { Search, MapPin, Calendar, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export interface SearchBarProps {
  onSearch?: (filters: {
    location: string;
    type: string;
    pickupDate: string;
    returnDate: string;
  }) => void;
  initialFilters?: {
    location: string;
    type: string;
    pickupDate: string;
    returnDate: string;
  };
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialFilters }) => {
  const navigate = useNavigate();
  const [location, setLocation] = React.useState(initialFilters?.location || "");
  const [type, setType] = React.useState(initialFilters?.type || "all");
  const [pickupDate, setPickupDate] = React.useState(initialFilters?.pickupDate || "");
  const [returnDate, setReturnDate] = React.useState(initialFilters?.returnDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = { location, type, pickupDate, returnDate };
    
    if (onSearch) {
      onSearch(filters);
    } else {
      // Redirect to browse with state
      navigate("/browse", { state: filters });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl bg-white border border-gray-100/80 shadow-2xl p-4 md:p-3 rounded-[24px] grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
    >
      {/* Location */}
      <div className="md:col-span-4 flex items-center gap-3 px-3 py-2 border-r border-gray-100 last:border-0">
        <MapPin className="text-yellow-500 shrink-0" size={20} />
        <div className="flex-1 text-left">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Location
          </label>
          <input
            type="text"
            placeholder="Where are you looking?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none mt-0.5"
          />
        </div>
      </div>

      {/* Vehicle Type */}
      <div className="md:col-span-3 flex items-center gap-3 px-3 py-2 border-r border-gray-100 last:border-0">
        <Car className="text-yellow-500 shrink-0" size={20} />
        <div className="flex-1 text-left">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Vehicle Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none mt-0.5 cursor-pointer appearance-none"
          >
            <option value="all">All Vehicles</option>
            <option value="car">Cars</option>
            <option value="bike">Bikes</option>
            <option value="scooter">Scooters</option>
            <option value="cycle">Cycles</option>
          </select>
        </div>
      </div>

      {/* Pickup Date */}
      <div className="md:col-span-2 flex items-center gap-3 px-3 py-2 border-r border-gray-100 last:border-0">
        <Calendar className="text-yellow-500 shrink-0" size={20} />
        <div className="flex-1 text-left">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Pickup Date
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none mt-0.5 cursor-pointer"
          />
        </div>
      </div>

      {/* Return Date */}
      <div className="md:col-span-2 flex items-center gap-3 px-3 py-2">
        <Calendar className="text-yellow-500 shrink-0" size={20} />
        <div className="flex-1 text-left">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none mt-0.5 cursor-pointer"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-1 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="icon"
          className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center shadow-lg"
          aria-label="Search vehicles"
        >
          <Search size={18} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
