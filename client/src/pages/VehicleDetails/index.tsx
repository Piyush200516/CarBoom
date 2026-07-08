// src/pages/VehicleDetails/index.tsx

import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Fuel, Settings, Users, Fuel as MileageIcon, Star, Check, ArrowRight, MessageSquare, AlertCircle, Heart, MapPin, Calendar } from "lucide-react";
import { mockVehicles } from "../../data/mockData";
import { RatingStars } from "../../components/common/RatingStars";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";

export const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Find vehicle by ID
  const vehicle = useMemo(() => {
    return mockVehicles.find((v) => v.id === id);
  }, [id]);

  // Gallery slider state
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Booking Form state
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLoc, setPickupLoc] = useState("Main Hub (Free)");
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Vehicle Not Found</h2>
        <p className="text-sm text-gray-500 font-semibold mt-1">
          The vehicle you are looking for does not exist or has been unlisted.
        </p>
        <Link to="/browse" className="mt-6">
          <Button variant="primary">Back to Browse</Button>
        </Link>
      </div>
    );
  }

  // Calculate pricing
  const pricingSummary = useMemo(() => {
    if (!pickupDate || !returnDate) return null;
    
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffMs = end.getTime() - start.getTime();
    
    if (diffMs <= 0) return { error: "Return date must be after pickup date" };

    const hours = Math.ceil(diffMs / (1000 * 60 * 60));
    const days = Math.ceil(hours / 24);

    let durationLabel = "";
    let rate = 0;
    let total = 0;

    // Standard business rule: If less than 24 hours, charge hourly. Else, charge daily.
    if (hours < 24) {
      durationLabel = `${hours} Hour${hours > 1 ? "s" : ""}`;
      rate = vehicle.hourlyPrice;
      total = hours * rate;
    } else {
      durationLabel = `${days} Day${days > 1 ? "s" : ""}`;
      rate = vehicle.dailyPrice;
      total = days * rate;
    }

    const cgst = Math.round(total * 0.09);
    const sgst = Math.round(total * 0.09);
    const refundDeposit = 1500; // Mock security deposit
    const grandTotal = total + cgst + sgst + refundDeposit;

    return {
      durationLabel,
      baseTotal: total,
      cgst,
      sgst,
      refundDeposit,
      grandTotal,
    };
  }, [pickupDate, returnDate, vehicle]);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      toast("Select dates", { description: "Please choose pickup and return dates.", type: "error" });
      return;
    }
    if (pricingSummary?.error) {
      toast("Invalid dates", { description: pricingSummary.error, type: "error" });
      return;
    }

    toast("Booking Successful", {
      description: `Your rental for ${vehicle.name} has been confirmed. Redirecting to payment...`,
      type: "success",
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      { description: `${vehicle.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`, type: "success" }
    );
  };

  const similarVehicles = mockVehicles.filter((v) => v.type === vehicle.type && v.id !== vehicle.id).slice(0, 3);

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gallery & Information */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Gallery Panel */}
            <Card className="bg-white border border-gray-100 p-4 rounded-[24px] shadow-sm text-left">
              {/* Large Display Image */}
              <div className="relative w-full h-[400px] bg-gray-50 rounded-[20px] overflow-hidden">
                <img
                  src={vehicle.images[activeImgIndex] || vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                <button
                  onClick={toggleWishlist}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 hover:text-red-500 shadow-md cursor-pointer"
                >
                  <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                </button>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-3.5 mt-4 overflow-x-auto pb-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-20 h-16 rounded-[12px] overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      activeImgIndex === idx ? "border-yellow-400 scale-102 shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Vehicle Details */}
            <Card className="bg-white border border-gray-100 p-6 md:p-8 rounded-[24px] shadow-sm text-left space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900">{vehicle.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <RatingStars rating={vehicle.rating} size={16} />
                  <span className="text-sm font-bold text-gray-900">{vehicle.rating}</span>
                  <span className="text-xs text-gray-400 font-semibold">({vehicle.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-50">
                <div className="p-4 bg-gray-50 rounded-[16px] text-center space-y-1">
                  <Fuel className="text-yellow-600 mx-auto" size={20} />
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Fuel Type</div>
                  <div className="font-extrabold text-gray-900 text-xs mt-0.5">{vehicle.fuelType}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-[16px] text-center space-y-1">
                  <Settings className="text-yellow-600 mx-auto" size={20} />
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Transmission</div>
                  <div className="font-extrabold text-gray-900 text-xs mt-0.5">{vehicle.transmission}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-[16px] text-center space-y-1">
                  <Users className="text-yellow-600 mx-auto" size={20} />
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Seats</div>
                  <div className="font-extrabold text-gray-900 text-xs mt-0.5">{vehicle.seats} seats</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-[16px] text-center space-y-1">
                  <MileageIcon className="text-yellow-600 mx-auto" size={20} />
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Mileage / Range</div>
                  <div className="font-extrabold text-gray-900 text-xs mt-0.5">{vehicle.mileage}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2.5 pt-4">
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">About this vehicle</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-semibold">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {vehicle.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600 font-semibold">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                        <Check size={12} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Owner card */}
            <Card className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm text-left flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={vehicle.ownerAvatar} alt={vehicle.ownerName} className="w-12 h-12 rounded-full object-cover border border-yellow-400/20" />
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Listed By</div>
                  <h4 className="font-extrabold text-gray-900 text-base mt-0.5">{vehicle.ownerName}</h4>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500 font-semibold">
                    <Star size={12} fill="currentColor" className="text-yellow-400" />
                    <span>{vehicle.ownerRating} owner rating</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2 rounded-xl text-xs py-2 px-4 hover:border-yellow-400 text-gray-800 font-bold">
                <MessageSquare size={14} /> Message Owner
              </Button>
            </Card>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <Card className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-lg text-left">
              <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 pb-4">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Rental Price</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-gray-900">₹{vehicle.hourlyPrice}</span>
                    <span className="text-xs font-semibold text-gray-500">/hr</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-yellow-600">₹{vehicle.dailyPrice}/day</div>
                  <div className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Weekly discount active</div>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Dates */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Pickup Date &amp; Time</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Return Date &amp; Time</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Delivery Options</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={pickupLoc}
                      onChange={(e) => setPickupLoc(e.target.value)}
                      className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer appearance-none"
                    >
                      <option value="Main Hub (Free)">Hub Pickup (Free)</option>
                      <option value="Home Delivery (₹250)">Home Delivery (+ ₹250)</option>
                      <option value="Airport Pickup (₹400)">Airport Terminal (+ ₹400)</option>
                    </select>
                  </div>
                </div>

                {/* Pricing Calculation Display */}
                {pricingSummary && (
                  <div className="space-y-2 bg-gray-50 p-4 rounded-[16px] text-xs font-semibold text-gray-600 mt-4 border border-gray-100">
                    {pricingSummary.error ? (
                      <p className="text-red-500 font-bold text-center">{pricingSummary.error}</p>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span>Base Rental ({pricingSummary.durationLabel})</span>
                          <span className="text-gray-900 font-bold">₹{pricingSummary.baseTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CGST (9%)</span>
                          <span className="text-gray-900 font-bold">₹{pricingSummary.cgst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SGST (9%)</span>
                          <span className="text-gray-900 font-bold">₹{pricingSummary.sgst}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Refundable Deposit</span>
                          <span className="text-gray-900 font-bold">₹{pricingSummary.refundDeposit}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200/60 pt-2 font-bold text-sm text-gray-900">
                          <span>Grand Total</span>
                          <span className="text-yellow-600 font-black">₹{pricingSummary.grandTotal}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs py-3 rounded-xl shadow-yellow-glow-hover cursor-pointer mt-4"
                >
                  Book Now <ArrowRight size={14} />
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Similar Vehicles Carousel */}
        {similarVehicles.length > 0 && (
          <section className="mt-16 text-left">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Similar Vehicles You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((v) => (
                <Card
                  key={v.id}
                  className="bg-white border border-gray-100 p-4 rounded-[20px] hover:shadow-xl transition-shadow flex flex-col group"
                >
                  <div className="relative w-full h-40 bg-gray-50 rounded-[14px] overflow-hidden shrink-0">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between mt-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-yellow-600 transition duration-200">{v.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="currentColor" className="text-yellow-400" />
                        <span className="text-xs font-bold text-gray-600">{v.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                      <div className="text-xs font-black text-gray-900">₹{v.hourlyPrice}/hr</div>
                      <Link to={`/vehicle/${v.id}`}>
                        <Button variant="secondary" size="sm" className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
                          View details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
