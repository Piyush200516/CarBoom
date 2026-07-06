// src/pages/BrowseVehicles/index.tsx
import * as React from "react";
import { Filter, SlidersHorizontal, ArrowUpDown, RefreshCcw } from "lucide-react";
import { mockVehicles } from "../../data/mockData";
import { VehicleCard } from "../../components/common/VehicleCard";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Drawer } from "../../components/ui/Drawer";
import { Pagination } from "../../components/common/Pagination";
import { useLocation } from "react-router-dom";

export const BrowseVehicles = () => {
  const location = useLocation();

  // Load initial search state from homepage navigation if present
  const initialSearchState = location.state as {
    location?: string;
    type?: string;
    pickupDate?: string;
    returnDate?: string;
  } | null;

  // Filter States
  const [searchLocation, setSearchLocation] = React.useState(initialSearchState?.location || "");
  const [selectedType, setSelectedType] = React.useState<string>(initialSearchState?.type || "all");
  const [fuelType, setFuelType] = React.useState<string>("all");
  const [transmission, setTransmission] = React.useState<string>("all");
  const [maxPrice, setMaxPrice] = React.useState<number>(1000);
  const [seats, setSeats] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("rating");

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  // Apply filters
  const filteredVehicles = React.useMemo(() => {
    return mockVehicles.filter((vehicle) => {
      // Location matching (case-insensitive)
      if (searchLocation && !vehicle.description.toLowerCase().includes(searchLocation.toLowerCase()) && !vehicle.name.toLowerCase().includes(searchLocation.toLowerCase())) {
        // Simple search description match fallback
      }

      // Type matching
      if (selectedType !== "all" && vehicle.type !== selectedType) {
        return false;
      }

      // Fuel matching
      if (fuelType !== "all" && vehicle.fuelType !== fuelType) {
        return false;
      }

      // Transmission matching
      if (transmission !== "all" && vehicle.transmission !== transmission) {
        return false;
      }

      // Max price filter (checks hourly rate)
      if (vehicle.hourlyPrice > maxPrice) {
        return false;
      }

      // Seats matching
      if (seats !== "all") {
        const seatNum = parseInt(seats);
        if (seatNum === 5 && vehicle.seats < 5) return false;
        if (seatNum === 7 && vehicle.seats < 7) return false;
        if (seatNum === 2 && vehicle.seats !== 2) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.hourlyPrice - b.hourlyPrice;
      if (sortBy === "price-high") return b.hourlyPrice - a.hourlyPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [searchLocation, selectedType, fuelType, transmission, maxPrice, seats, sortBy]);

  // Reset filters
  const handleReset = () => {
    setSearchLocation("");
    setSelectedType("all");
    setFuelType("all");
    setTransmission("all");
    setMaxPrice(1000);
    setSeats("all");
    setSortBy("rating");
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  // Paginated output
  const paginatedVehicles = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const FilterControls = () => (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Location</h4>
        <input
          type="text"
          placeholder="Search locations..."
          value={searchLocation}
          onChange={(e) => {
            setSearchLocation(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-white border border-gray-200 text-gray-900 rounded-[14px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>

      {/* Vehicle Type */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Vehicle Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {["all", "car", "bike", "scooter", "cycle"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedType(t);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 rounded-[14px] text-xs font-semibold uppercase tracking-wider border transition cursor-pointer ${
                selectedType === t
                  ? "bg-yellow-400 border-yellow-400 text-black shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Fuel Type</h4>
        <select
          value={fuelType}
          onChange={(e) => {
            setFuelType(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-[14px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
        >
          <option value="all">All Fuels</option>
          <option value="Electric">Electric</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Transmission */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Transmission</h4>
        <select
          value={transmission}
          onChange={(e) => {
            setTransmission(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-[14px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
        >
          <option value="all">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Max Price (Hourly)</h4>
          <span className="text-sm font-extrabold text-yellow-600">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min="40"
          max="1000"
          step="20"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full accent-yellow-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1 uppercase">
          <span>₹40/hr</span>
          <span>₹1000/hr</span>
        </div>
      </div>

      {/* Seats */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Capacity / Seats</h4>
        <select
          value={seats}
          onChange={(e) => {
            setSeats(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-[14px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
        >
          <option value="all">Any Seats</option>
          <option value="1">1 Seat (Cycles)</option>
          <option value="2">2 Seats (Bikes/Scooters)</option>
          <option value="5">5+ Seats (Cars)</option>
          <option value="7">7+ Seats (SUVs)</option>
        </select>
      </div>

      {/* Reset */}
      <Button
        variant="secondary"
        onClick={handleReset}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-bold rounded-xl"
      >
        <RefreshCcw size={14} />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        <div className="text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Browse <span className="text-yellow-500">Vehicles</span>
          </h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            Choose from our premium peer-to-peer vehicles. Rent by the hour or by the week.
          </p>
        </div>

        {/* Sort and Filters Row */}
        <div className="flex justify-between items-center bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-xl text-xs"
            >
              <Filter size={16} /> Filters
            </Button>
            <span className="hidden lg:inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 uppercase tracking-widest bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
              <SlidersHorizontal size={14} className="text-gray-400" />
              Showing {filteredVehicles.length} vehicles
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar filters (Desktop only) */}
          <aside className="hidden lg:block col-span-1 bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm h-fit sticky top-24">
            <h3 className="font-extrabold text-gray-900 text-lg border-b border-gray-100 pb-3 mb-5 uppercase tracking-wide">
              Filter Options
            </h3>
            <FilterControls />
          </aside>

          {/* Right grid */}
          <main className="col-span-1 lg:col-span-3">
            {paginatedVehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            ) : (
              <Card className="flex flex-col items-center justify-center py-20 text-center bg-white border border-gray-100 shadow-sm">
                <div className="p-5 bg-yellow-400/10 rounded-full text-yellow-500 mb-4 animate-bounce">
                  <SlidersHorizontal size={36} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No Vehicles Found</h3>
                <p className="text-sm text-gray-500 font-semibold mt-1 max-w-sm">
                  We couldn't find any vehicles matching your filters. Try resetting the filters or modifying your location/pricing.
                </p>
                <Button variant="primary" onClick={handleReset} className="mt-6 font-bold">
                  Reset All Filters
                </Button>
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filter Vehicles"
      >
        <FilterControls />
      </Drawer>
    </div>
  );
};

export default BrowseVehicles;
