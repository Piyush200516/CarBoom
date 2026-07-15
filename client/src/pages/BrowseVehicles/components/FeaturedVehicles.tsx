import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, X, GitCompare, Star, Car } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { VehicleWithExtras, VehicleCard } from "./VehicleCard";

interface FeaturedVehiclesProps {
  vehicles: VehicleWithExtras[];
  wishlist: string[];
  onWishlistToggle: (id: string, name: string) => void;
  onBookNow: (vehicle: VehicleWithExtras) => void;
  onViewDetails: (vehicle: VehicleWithExtras) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({
  vehicles,
  wishlist,
  onWishlistToggle,
  onBookNow,
  onViewDetails,
  sortBy,
  onSortChange,
  currentPage,
  onPageChange,
  itemsPerPage = 6
}) => {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [compareList, setCompareList] = React.useState<VehicleWithExtras[]>([]);
  const [isCompareOpen, setIsCompareOpen] = React.useState(false);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(vehicles.length / itemsPerPage));
  const paginatedVehicles = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return vehicles.slice(start, start + itemsPerPage);
  }, [vehicles, currentPage, itemsPerPage]);

  const toggleCompare = (vehicle: VehicleWithExtras) => {
    if (compareList.some(v => v.id === vehicle.id)) {
      setCompareList(compareList.filter(v => v.id !== vehicle.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 vehicles at a time.");
        return;
      }
      setCompareList([...compareList, vehicle]);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16 scroll-mt-24" id="vehicle-grid">
      {/* Header controls: items count, view mode, sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-[20px] bg-white/[0.02] border border-white/5 shadow-sm gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-1.5">
            <SlidersHorizontal size={13} className="text-yellow-400" />
            <span>{vehicles.length} Vehicles Available</span>
          </span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === "grid" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={14} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === "list" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <List size={14} />
            </button>
          </div>

          {/* Sorting drop down */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-300 focus:outline-none border-b border-transparent hover:border-white/20 pb-0.5 cursor-pointer outline-none"
            >
              <option value="rating" className="bg-[#0f172a]">Rating: High to Low</option>
              <option value="price-asc" className="bg-[#0f172a]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#0f172a]">Price: High to Low</option>
              <option value="reviews" className="bg-[#0f172a]">Most Reviewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Vehicles */}
      <AnimatePresence mode="wait">
        {paginatedVehicles.length > 0 ? (
          <motion.div 
            key={`${viewMode}-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-6"
            }
          >
            {paginatedVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isWishlisted={wishlist.includes(vehicle.id)}
                isComparing={compareList.some(v => v.id === vehicle.id)}
                onWishlistToggle={() => onWishlistToggle(vehicle.id, vehicle.name)}
                onCompareToggle={() => toggleCompare(vehicle)}
                onBookNow={() => onBookNow(vehicle)}
                onViewDetails={() => onViewDetails(vehicle)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] border border-white/5 rounded-[24px]"
          >
            <div className="p-5 bg-yellow-400/10 rounded-full text-yellow-400 mb-4 animate-pulse">
              <SlidersHorizontal size={36} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">No Vehicles Match Your Criteria</h3>
            <p className="text-xs text-gray-400 mt-2 max-w-sm font-semibold leading-relaxed">
              We couldn't find vehicles matching the filters selected. Try clearing some selections or expanding the price range.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 p-1.5 rounded-xl">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-lg bg-transparent hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer text-xs font-bold"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx + 1)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition cursor-pointer ${
                  currentPage === idx + 1
                    ? "bg-yellow-400 text-black font-extrabold"
                    : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-lg bg-transparent hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer text-xs font-bold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Floating Comparison Drawer Panel */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-4xl"
          >
            <div className="bg-[#0f172a] border border-white/10 rounded-[20px] p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-yellow-400/10 border border-yellow-400/25 rounded-full flex items-center justify-center text-yellow-400 font-bold text-sm shrink-0">
                  {compareList.length}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Compare Vehicles</h4>
                  <p className="text-[10px] text-gray-400">Select up to 3 models to view side-by-side.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto p-1">
                {compareList.map(v => (
                  <div key={v.id} className="relative flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 shrink-0">
                    <img src={v.image} className="w-8 h-8 rounded object-cover" alt="" />
                    <span className="text-[10px] font-bold text-white/90 line-clamp-1 max-w-[80px]">{v.name}</span>
                    <button 
                      onClick={() => toggleCompare(v)}
                      className="text-gray-500 hover:text-red-400 transition cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={() => setCompareList([])}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl text-[10px] font-bold text-gray-400 hover:text-white border border-white/5 hover:bg-white/5 transition uppercase tracking-wider cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-black hover:bg-yellow-300 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Compare Now <GitCompare size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Popup */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-[24px] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#0f172a] z-20 flex justify-between items-center p-6 border-b border-white/5">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-yellow-400 flex items-center gap-2">
                  <GitCompare size={16} /> Technical Comparison
                </h3>
                <button 
                  onClick={() => setIsCompareOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 text-[11px] font-bold text-gray-400">
                  {/* Headers */}
                  <div className="border-b border-white/5 pb-4 flex flex-col justify-end">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Specs Matrix</span>
                  </div>
                  {compareList.map(v => (
                    <div key={v.id} className="border-b border-white/5 pb-4 text-center">
                      <img src={v.image} className="w-full h-20 md:h-24 rounded-lg object-cover border border-white/5 mb-2" alt="" />
                      <h4 className="font-extrabold text-white text-xs line-clamp-1">{v.name}</h4>
                      <p className="text-[9px] text-yellow-400 mt-0.5">₹{v.dailyPrice}/day</p>
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <div key={i} className="border-b border-white/5 pb-4 bg-white/[0.01] rounded-lg border border-dashed border-white/5 flex flex-col items-center justify-center h-full min-h-[120px] text-gray-600">
                      <Car size={20} />
                      <span className="text-[8px] uppercase tracking-wider mt-1 font-bold">Empty Slot</span>
                    </div>
                  ))}

                  {/* Hourly pricing */}
                  <div className="py-3 border-b border-white/5">Price Per Hour</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">₹{v.hourlyPrice}/hr</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Fuel type */}
                  <div className="py-3 border-b border-white/5">Fuel Type</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.fuelType}</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Transmission */}
                  <div className="py-3 border-b border-white/5">Transmission</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.transmission}</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Seats */}
                  <div className="py-3 border-b border-white/5">Seats</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.seats} Seats</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Mileage/Range */}
                  <div className="py-3 border-b border-white/5">Range &amp; Mileage</div>
                  {compareList.map(v => <div key={v.id} className="py-3 border-b border-white/5 text-center text-white font-extrabold">{v.mileage}</div>)}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Rating */}
                  <div className="py-3 border-b border-white/5">Rating</div>
                  {compareList.map(v => (
                    <div key={v.id} className="py-3 border-b border-white/5 text-center text-yellow-400 font-extrabold flex items-center justify-center gap-0.5">
                      {v.rating} <Star size={10} fill="currentColor" />
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-3 border-b border-white/5" />)}

                  {/* Action buttons */}
                  <div className="py-4" />
                  {compareList.map(v => (
                    <div key={v.id} className="py-4 text-center">
                      <Button
                        variant="primary"
                        className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider"
                        onClick={() => {
                          setIsCompareOpen(false);
                          onBookNow(v);
                        }}
                      >
                        Book This
                      </Button>
                    </div>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <div key={i} className="py-4" />)}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FeaturedVehicles;
