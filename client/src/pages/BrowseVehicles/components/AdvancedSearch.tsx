import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Search, MapPin, Calendar, Car, Sliders, 
  RotateCcw, Compass, Navigation, ShieldAlert 
} from "lucide-react";
import { Button } from "../../../components/ui/Button";

// Define zod schema for search filters
const searchSchema = z.object({
  pickupLoc: z.string().min(1, { message: "Location is required" }),
  dropLoc: z.string().optional(),
  pickupDate: z.string().min(1, { message: "Pick-up date is required" }),
  returnDate: z.string().min(1, { message: "Return date is required" }),
  category: z.string().default("all"),
  brand: z.string().default("All"),
  fuelType: z.string().default("all"),
  transmission: z.string().default("all"),
  seats: z.string().default("all"),
  priceRange: z.number().min(40).max(5000).default(1000),
  minRating: z.string().default("0"),
  sortBy: z.string().default("rating")
}).refine((data) => {
  if (data.pickupDate && data.returnDate) {
    return new Date(data.returnDate) >= new Date(data.pickupDate);
  }
  return true;
}, {
  message: "Return date must be after pick-up date",
  path: ["returnDate"]
});

export type SearchFormData = z.infer<typeof searchSchema>;

interface AdvancedSearchProps {
  onSearch: (data: SearchFormData) => void;
  onReset: () => void;
  initialFilters: Partial<SearchFormData>;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ 
  onSearch, 
  onReset,
  initialFilters 
}) => {
  const { 
    register, 
    handleSubmit, 
    control, 
    setValue,
    reset,
    watch,
    formState: { errors } 
  } = useForm<any>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      pickupLoc: "",
      dropLoc: "",
      pickupDate: "",
      returnDate: "",
      category: "all",
      brand: "All",
      fuelType: "all",
      transmission: "all",
      seats: "all",
      priceRange: 1000,
      minRating: "0",
      sortBy: "rating",
      ...initialFilters
    }
  });

  const selectedPrice = watch("priceRange");

  const onSubmit = (data: SearchFormData) => {
    onSearch(data);
  };

  const handleResetClick = () => {
    reset({
      pickupLoc: "",
      dropLoc: "",
      pickupDate: "",
      returnDate: "",
      category: "all",
      brand: "All",
      fuelType: "all",
      transmission: "all",
      seats: "all",
      priceRange: 1000,
      minRating: "0",
      sortBy: "rating"
    });
    onReset();
  };

  const autofillCurrentLocation = () => {
    setValue("pickupLoc", "Indore, Madhya Pradesh");
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto -mt-20 px-6">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 md:p-8 rounded-[24px] bg-[#0f172a]/70 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Location column */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
              <MapPin size={13} /> Location Details
            </label>
            <div className="space-y-2.5">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Compass size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Pickup location (e.g. Vijay Nagar)"
                  {...register("pickupLoc")}
                  className="w-full bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={autofillCurrentLocation}
                  title="Use current location"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition"
                >
                  <Navigation size={13} />
                </button>
              </div>
              {errors.pickupLoc && (
                <p className="text-[10px] text-red-400 flex items-center gap-1 font-bold">
                  <ShieldAlert size={10} /> {errors.pickupLoc.message?.toString()}
                </p>
              )}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <MapPin size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Drop location (Optional)"
                  {...register("dropLoc")}
                  className="w-full bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Dates column */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar size={13} /> Date Range
            </label>
            <div className="space-y-2.5">
              <div className="relative">
                <input
                  type="date"
                  {...register("pickupDate")}
                  className="w-full bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none transition cursor-pointer [color-scheme:dark]"
                />
                {errors.pickupDate && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 font-bold mt-1">
                    <ShieldAlert size={10} /> {errors.pickupDate.message?.toString()}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="date"
                  {...register("returnDate")}
                  className="w-full bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none transition cursor-pointer [color-scheme:dark]"
                />
                {errors.returnDate && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 font-bold mt-1">
                    <ShieldAlert size={10} /> {errors.returnDate.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Filters column */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
              <Car size={13} /> Specs &amp; Type
            </label>
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <select
                  {...register("category")}
                  className="bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                >
                  <option value="all">Any Category</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Luxury">Luxury</option>
                  <option value="EV">Electric</option>
                  <option value="Sports">Sports</option>
                  <option value="Cruiser">Cruiser</option>
                  <option value="Bike">Bike</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Convertible">Convertible</option>
                </select>
                <select
                  {...register("brand")}
                  className="bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                >
                  <option value="All">Any Brand</option>
                  <option value="BMW">BMW</option>
                  <option value="Audi">Audi</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Tata">Tata</option>
                  <option value="Kia">Kia</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="KTM">KTM</option>
                  <option value="Yamaha">Yamaha</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  {...register("fuelType")}
                  className="bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                >
                  <option value="all">Any Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <select
                  {...register("transmission")}
                  className="bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
                >
                  <option value="all">Gearbox</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Ratings column */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders size={13} /> Price &amp; Score
            </label>
            <div className="space-y-3.5 pt-1">
              <div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                  <span>Max Price / Day</span>
                  <span className="text-yellow-400 text-xs font-black">₹{selectedPrice}</span>
                </div>
                <Controller
                  name="priceRange"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="range"
                      min={40}
                      max={5000}
                      step={50}
                      value={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  {...register("seats")}
                  className="bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none transition cursor-pointer"
                >
                  <option value="all">Any Seats</option>
                  <option value="1">1+ Seats</option>
                  <option value="2">2+ Seats</option>
                  <option value="4">4+ Seats</option>
                  <option value="5">5+ Seats</option>
                  <option value="7">7+ Seats</option>
                </select>
                <select
                  {...register("minRating")}
                  className="bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-2.5 py-2 text-xs text-white outline-none transition cursor-pointer"
                >
                  <option value="0">Any Star</option>
                  <option value="4.0">4.0+ ★</option>
                  <option value="4.5">4.5+ ★</option>
                  <option value="4.7">4.7+ ★</option>
                  <option value="4.8">4.8+ ★</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sorting and Action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-white/5 gap-4">
          <div className="flex items-center gap-3 w-full sm:max-w-xs">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Sort By:</span>
            <select
              {...register("sortBy")}
              className="w-full bg-[#1e293b]/70 border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-3 py-2 text-xs text-white outline-none transition cursor-pointer"
            >
              <option value="rating">Rating: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="reviews">Reviews Count</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button 
              type="button"
              onClick={handleResetClick}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer border border-transparent hover:border-white/10 rounded-xl"
            >
              <RotateCcw size={14} /> Clear All
            </button>
            <Button 
              type="submit"
              variant="primary" 
              className="w-full sm:w-auto px-8 py-2.5 text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-yellow-glow-hover flex items-center justify-center gap-2"
            >
              <Search size={14} /> Search Vehicles
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;
