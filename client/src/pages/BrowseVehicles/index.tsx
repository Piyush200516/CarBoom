import * as React from "react";
import { useNavigate } from "react-router-dom";
import { mockVehicles } from "../../data/mockData";
import { useToast } from "../../components/ui/Toast";
import vehicleService, { VehicleItem } from "../../services/vehicleService";

// Import local components
import HeroSection from "./components/HeroSection";
import AdvancedSearch, { SearchFormData } from "./components/AdvancedSearch";
import FeaturedVehicles from "./components/FeaturedVehicles";
import PopularCategories from "./components/PopularCategories";
import PopularBrands from "./components/PopularBrands";
import SpecialOffers from "./components/SpecialOffers";
import RecommendedVehicles from "./components/RecommendedVehicles";
import RecentlyViewed from "./components/RecentlyViewed";
import CustomerReviews from "./components/CustomerReviews";
import FAQSection from "./components/FAQSection";

// Enhance mock vehicles with brand, distance, oldPrice, owner reviews, and instant booking fields
import { VehicleWithExtras } from "./components/VehicleCard";

const enhancedMockVehicles: VehicleWithExtras[] = mockVehicles.map(v => {
  const brandMap: Record<string, string> = {
    "Tesla Model Y Performance": "Tesla",
    "Thar Earth Edition 4x4": "Mahindra",
    "BMW G 310 RR": "BMW",
    "Royal Enfield Meteor 350": "Royal Enfield",
    "Ola S1 Pro Gen 2": "Ola",
    "Trek Marlin 7 Gen 3": "Trek",
    "Honda City Hybrid e:HEV": "Honda",
    "Ather 450X Apex": "Ather"
  };

  const distanceMap: Record<string, string> = {
    "1": "1.2 km",
    "2": "3.5 km",
    "3": "0.8 km",
    "4": "2.4 km",
    "5": "4.1 km",
    "6": "5.0 km",
    "7": "2.9 km",
    "8": "1.7 km"
  };

  const locationMap: Record<string, string> = {
    "1": "Vijay Nagar, Indore",
    "2": "Bhawarkua, Indore",
    "3": "Palasia, Indore",
    "4": "Saket, Indore",
    "5": "Rajendra Nagar, Indore",
    "6": "Annanagar, Chennai",
    "7": "Baner, Pune",
    "8": "Koramangala, Bangalore"
  };

  const brand = brandMap[v.name] || "CarBoom";
  const distance = distanceMap[v.id] || "2.0 km";
  const locationName = locationMap[v.id] || "Indore";
  
  return {
    ...v,
    brand,
    distance,
    locationName,
    instantBook: parseInt(v.id) % 2 === 1,
    oldPrice: Math.round(v.dailyPrice * 1.25),
    discountBadge: parseInt(v.id) % 3 === 0 ? "15% OFF" : undefined,
    ownerReviewsCount: v.reviewsCount + 12
  };
});

const formatBackendVehicleToExtras = (v: VehicleItem): VehicleWithExtras => {
  const primaryImg = v.images?.[0]?.url || "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800";
  const allImages = v.images?.length ? v.images.map(img => img.url) : [primaryImg];

  const typeMap: Record<string, "car" | "bike" | "scooter" | "cycle"> = {
    CAR: "car",
    BIKE: "bike",
    SCOOTER: "scooter",
    BICYCLE: "cycle",
  };

  const fuelMap: Record<string, "Petrol" | "Diesel" | "Electric" | "Hybrid" | "None"> = {
    PETROL: "Petrol",
    DIESEL: "Diesel",
    ELECTRIC: "Electric",
    CNG: "Hybrid",
  };

  return {
    id: v.id,
    name: v.name,
    type: typeMap[v.type] || "car",
    category: v.type,
    image: primaryImg,
    images: allImages,
    fuelType: fuelMap[v.fuelType] || "Petrol",
    transmission: v.transmission === "AUTOMATIC" ? "Automatic" : "Manual",
    seats: v.seatingCapacity || 4,
    rating: v.avgRating || 4.8,
    reviewsCount: v.reviewsCount || 1,
    hourlyPrice: v.pricePerHour || 120,
    dailyPrice: v.pricePerDay || 1400,
    mileage: `${v.mileage || 18} km/l`,
    ownerName: v.owner?.name || "Verified Host",
    ownerAvatar: "https://i.pravatar.cc/150?img=33",
    ownerRating: 4.9,
    description: v.description || "Well maintained premium vehicle with complete verification.",
    features: ["Air Conditioning", "Bluetooth", "Fastag", "Airbags", "Clean Interior"],
    brand: v.brand || "CarBoom",
    distance: "1.8 km",
    locationName: `${v.pickupAddress || v.city}, ${v.city}`,
    instantBook: true,
    oldPrice: Math.round((v.pricePerDay || 1400) * 1.25),
    discountBadge: "VERIFIED",
    ownerReviewsCount: (v.reviewsCount || 0) + 10,
  };
};

export const BrowseVehicles = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Search & Filter State
  const [filters, setFilters] = React.useState<Partial<SearchFormData>>({
    pickupLoc: "",
    dropLoc: "",
    pickupDate: "",
    returnDate: "",
    category: "all",
    brand: "All",
    fuelType: "all",
    transmission: "all",
    seats: "all",
    priceRange: 5000,
    minRating: "0",
    sortBy: "rating"
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [apiVehicles, setApiVehicles] = React.useState<VehicleWithExtras[] | null>(null);

  // Wishlist State (synced with localStorage)
  const [wishlist, setWishlist] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch real vehicles from backend API with active filter parameters
  React.useEffect(() => {
    let isMounted = true;
    const fetchVehiclesFromApi = async () => {
      setIsLoading(true);
      try {
        const params: Record<string, any> = {};
        if (filters.pickupLoc) params.city = filters.pickupLoc;
        if (filters.category && filters.category !== "all") params.type = filters.category.toUpperCase();
        if (filters.brand && filters.brand !== "All" && filters.brand !== "all") params.brand = filters.brand;
        if (filters.fuelType && filters.fuelType !== "all") params.fuelType = filters.fuelType.toUpperCase();
        if (filters.transmission && filters.transmission !== "all") params.transmission = filters.transmission.toUpperCase();
        if (filters.seats && filters.seats !== "all") params.seats = parseInt(filters.seats);
        if (filters.pickupDate) params.pickupDate = filters.pickupDate;
        if (filters.returnDate) params.returnDate = filters.returnDate;
        if (filters.priceRange) params.maxPrice = filters.priceRange;

        if (filters.sortBy === "price-asc") params.sortBy = "price_asc";
        else if (filters.sortBy === "price-desc") params.sortBy = "price_desc";
        else params.sortBy = "newest";

        const res = await vehicleService.getVehicles(params);
        if (isMounted) {
          if (res && res.vehicles && res.vehicles.length > 0) {
            setApiVehicles(res.vehicles.map(formatBackendVehicleToExtras));
          } else {
            setApiVehicles(null);
          }
        }
      } catch (err) {
        // Fallback to local fleet if backend has 0 approved listings yet
        if (isMounted) setApiVehicles(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchVehiclesFromApi();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  // Calculate brand counts based on entire dataset
  const brandCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: enhancedMockVehicles.length };
    enhancedMockVehicles.forEach(v => {
      counts[v.brand] = (counts[v.brand] || 0) + 1;
    });
    return counts;
  }, []);

  const handleSearchSubmit = (searchData: SearchFormData) => {
    setIsLoading(true);
    setFilters(searchData);
    setCurrentPage(1);

    // Simulate luxury API fetch delay
    setTimeout(() => {
      setIsLoading(false);
      toast("Search Filters Updated", {
        description: "Viewing vehicles based on your selected specifications.",
        type: "success"
      });
      // Scroll to grid
      const el = document.getElementById("vehicle-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const handleCategorySelect = (category: string) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, category }));
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleBrandSelect = (brand: string) => {
    setIsLoading(true);
    setFilters(prev => ({ ...prev, brand }));
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleResetFilters = () => {
    setFilters({
      pickupLoc: "",
      dropLoc: "",
      pickupDate: "",
      returnDate: "",
      category: "all",
      brand: "All",
      fuelType: "all",
      transmission: "all",
      seats: "all",
      priceRange: 5000,
      minRating: "0",
      sortBy: "rating"
    });
    setCurrentPage(1);
    toast("Filters Restored", {
      description: "Search inputs have been cleared to default configurations.",
      type: "info"
    });
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const toggleWishlist = (id: string, name: string) => {
    let updated;
    const exists = wishlist.includes(id);
    if (exists) {
      updated = wishlist.filter(item => item !== id);
      toast("Removed from Wishlist", {
        description: `${name} has been removed from your saved items.`,
        type: "success"
      });
    } else {
      updated = [...wishlist, id];
      toast("Added to Wishlist", {
        description: `${name} has been saved to your wishlist.`,
        type: "success"
      });
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleBookNow = (vehicle: VehicleWithExtras) => {
    addToHistory(vehicle.id);
    navigate(`/vehicle/${vehicle.id}`);
  };

  const handleViewDetails = (vehicle: VehicleWithExtras) => {
    addToHistory(vehicle.id);
    navigate(`/vehicle/${vehicle.id}`);
  };

  const addToHistory = (id: string) => {
    try {
      const saved = localStorage.getItem("recentlyViewed");
      let ids: string[] = saved ? JSON.parse(saved) : [];
      ids = [id, ...ids.filter(savedId => savedId !== id)].slice(0, 8);
      localStorage.setItem("recentlyViewed", JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered vehicles logic
  const filteredVehicles = React.useMemo(() => {
    // If real backend API returned vehicles, prioritize live database listings
    if (apiVehicles && apiVehicles.length > 0) {
      return apiVehicles;
    }

    return enhancedMockVehicles.filter(v => {
      // Location match
      if (filters.pickupLoc && !v.locationName.toLowerCase().includes(filters.pickupLoc.toLowerCase())) {
        return false;
      }

      // Category match
      if (filters.category && filters.category !== "all" && v.category !== filters.category) {
        return false;
      }

      // Brand match
      if (filters.brand && filters.brand !== "All" && v.brand !== filters.brand) {
        return false;
      }

      // Fuel match
      if (filters.fuelType && filters.fuelType !== "all" && v.fuelType !== filters.fuelType) {
        return false;
      }

      // Transmission match
      if (filters.transmission && filters.transmission !== "all" && v.transmission !== filters.transmission) {
        return false;
      }

      // Seats match
      if (filters.seats && filters.seats !== "all") {
        const reqSeats = parseInt(filters.seats);
        if (v.seats < reqSeats) return false;
      }

      // Rating match
      if (filters.minRating) {
        const ratingThreshold = parseFloat(filters.minRating);
        if (v.rating < ratingThreshold) return false;
      }

      // Daily Price match
      if (filters.priceRange && v.dailyPrice > filters.priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const sort = filters.sortBy || "rating";
      if (sort === "price-asc") return a.dailyPrice - b.dailyPrice;
      if (sort === "price-desc") return b.dailyPrice - a.dailyPrice;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [filters, apiVehicles]);

  const scrollToFilters = () => {
    const el = document.getElementById("search-filters-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen pb-16 selection:bg-yellow-400 selection:text-black font-sans">
      
      {/* Hero Banner Section */}
      <HeroSection onBrowseClick={scrollToFilters} />

      {/* Advanced Search Form */}
      <div id="search-filters-card">
        <AdvancedSearch
          initialFilters={filters}
          onSearch={handleSearchSubmit}
          onReset={handleResetFilters}
        />
      </div>

      <div className="mt-20">
        {/* Popular Categories filter */}
        <PopularCategories
          selectedCategory={filters.category || "all"}
          onSelectCategory={handleCategorySelect}
        />

        {/* Popular Brands filter */}
        <PopularBrands
          selectedBrand={filters.brand || "All"}
          onSelectBrand={handleBrandSelect}
          vehicleCounts={brandCounts}
        />

        {/* Special Coupons section */}
        <SpecialOffers />

        {/* Core Vehicle Grid Section */}
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#1e293b]/40 rounded-[20px] h-96 border border-white/5 flex flex-col justify-between p-5">
                <div className="bg-[#1e293b] w-full h-44 rounded-xl" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-[#1e293b] rounded w-2/3" />
                  <div className="h-3 bg-[#1e293b] rounded w-1/2" />
                  <div className="h-6 bg-[#1e293b] rounded w-full" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="h-6 bg-[#1e293b] rounded w-1/3" />
                  <div className="h-8 bg-[#1e293b] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <FeaturedVehicles
            vehicles={filteredVehicles}
            wishlist={wishlist}
            onWishlistToggle={toggleWishlist}
            onBookNow={handleBookNow}
            onViewDetails={handleViewDetails}
            sortBy={filters.sortBy || "rating"}
            onSortChange={handleSortChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={6}
          />
        )}

        {/* AI Recommendations */}
        <RecommendedVehicles 
          vehicles={enhancedMockVehicles} 
          onVehicleClick={handleViewDetails} 
        />

        {/* Recently Viewed Carousel */}
        <RecentlyViewed 
          vehicles={enhancedMockVehicles} 
          onVehicleClick={handleViewDetails} 
        />

        {/* Testimonials */}
        <CustomerReviews />

        {/* FAQS Accordion */}
        <FAQSection />
      </div>

    </div>
  );
};

export default BrowseVehicles;
