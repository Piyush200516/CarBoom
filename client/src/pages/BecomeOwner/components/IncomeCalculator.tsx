import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Sparkles, TrendingUp, Info } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../components/ui/Toast";

interface VehicleTypeOption {
  id: string;
  name: string;
  defaultPrice: number;
  minPrice: number;
  maxPrice: number;
}

const VEHICLE_TYPES: VehicleTypeOption[] = [
  { id: "luxury", name: "Luxury Car (e.g. BMW, Audi)", defaultPrice: 4000, minPrice: 2000, maxPrice: 15000 },
  { id: "suv", name: "Thar & SUVs", defaultPrice: 2500, minPrice: 1500, maxPrice: 8000 },
  { id: "sedan", name: "Sedans", defaultPrice: 1600, minPrice: 1000, maxPrice: 5000 },
  { id: "ev", name: "Electric Vehicles (EV)", defaultPrice: 1800, minPrice: 1200, maxPrice: 6000 },
  { id: "bike", name: "Cruiser Motorcycles", defaultPrice: 900, minPrice: 500, maxPrice: 3000 },
  { id: "scooter", name: "City Scooters", defaultPrice: 450, minPrice: 200, maxPrice: 1500 }
];

export const IncomeCalculator: React.FC = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = React.useState("suv");
  const [pricePerDay, setPricePerDay] = React.useState(2500);
  const [availableDays, setAvailableDays] = React.useState(15);
  const [calculated, setCalculated] = React.useState({
    gross: 0,
    commission: 0,
    insurance: 0,
    net: 0
  });

  // Sync slider default boundaries on type change
  React.useEffect(() => {
    const matched = VEHICLE_TYPES.find(v => v.id === selectedType);
    if (matched) {
      setPricePerDay(matched.defaultPrice);
    }
  }, [selectedType]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const gross = pricePerDay * availableDays;
    const commission = Math.round(gross * 0.15); // 15% platform fee
    const insurance = Math.round(availableDays * 80); // ₹80 per active day
    const net = gross - commission - insurance;

    setCalculated({ gross, commission, insurance, net });
    toast("Earnings Calculated", {
      description: `Estimated monthly income compiled successfully.`,
      type: "success"
    });
  };

  // Run calculation immediately on mount/adjustments for responsive feedback
  React.useEffect(() => {
    const gross = pricePerDay * availableDays;
    const commission = Math.round(gross * 0.15);
    const insurance = Math.round(availableDays * 80);
    const net = gross - commission - insurance;
    setCalculated({ gross, commission, insurance, net });
  }, [selectedType, pricePerDay, availableDays]);

  const activeTypeDetails = VEHICLE_TYPES.find(v => v.id === selectedType) || VEHICLE_TYPES[1];

  return (
    <section className="max-w-4xl mx-auto px-6 mb-24">
      <div className="text-center mb-12">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Earnings Estimator</span>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider mt-0.5">
          Income Calculator
        </h2>
        <p className="text-gray-400 text-xs font-semibold mt-2">
          Find out how much money your vehicle can collect based on customized availability logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Input Panel Card */}
        <Card
          variant="glass"
          className="border border-white/5 bg-[#111827]/40 backdrop-blur-md p-6 rounded-[24px] text-left flex flex-col justify-between"
        >
          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Vehicle Type */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider block">
                Vehicle Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#1e293b] border border-white/10 hover:border-white/20 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition cursor-pointer"
              >
                {VEHICLE_TYPES.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-gray-300 uppercase tracking-wider">Price per day</span>
                <span className="text-yellow-400 font-black text-sm">₹{pricePerDay}</span>
              </div>
              <input
                type="range"
                min={activeTypeDetails.minPrice}
                max={activeTypeDetails.maxPrice}
                step={50}
                value={pricePerDay}
                onChange={(e) => setPricePerDay(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-bold">
                <span>Min: ₹{activeTypeDetails.minPrice}</span>
                <span>Max: ₹{activeTypeDetails.maxPrice}</span>
              </div>
            </div>

            {/* Days slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-gray-300 uppercase tracking-wider">Available Days / Month</span>
                <span className="text-yellow-400 font-black text-sm">{availableDays} Days</span>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={availableDays}
                onChange={(e) => setAvailableDays(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-bold">
                <span>3 Days</span>
                <span>30 Days</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-xs font-black uppercase tracking-widest rounded-xl shadow-yellow-glow-hover flex items-center justify-center gap-2"
            >
              <Calculator size={14} /> Calculate Earnings
            </Button>
          </form>
        </Card>

        {/* Animated Result Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${calculated.net}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Card
              className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-400/10 via-[#0f172a] to-transparent p-6 rounded-[24px] text-left flex flex-col justify-between h-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow">
                <Sparkles size={10} className="animate-pulse" /> ESTIMATED PAYOUT
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest block">Net Monthly Earnings</span>
                <div className="text-4xl lg:text-5xl font-black text-white mt-2 tracking-tight flex items-baseline gap-1">
                  ₹{calculated.net.toLocaleString()}
                  <span className="text-xs text-gray-400 font-semibold lowercase">/mo</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-400/20 px-2 py-0.5 rounded text-[9px] text-emerald-400 font-bold mt-2 uppercase tracking-wider">
                  <TrendingUp size={10} /> Yields ₹{(calculated.net * 12).toLocaleString()} / year
                </div>
              </div>

              {/* Breakdown detail list */}
              <div className="space-y-2 border-t border-white/5 pt-4 mt-6 text-[10px] font-bold text-gray-400">
                <div className="flex justify-between items-center">
                  <span>Gross Earnings ({availableDays} days)</span>
                  <span className="text-white">₹{calculated.gross.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-red-400">
                  <span>Platform Service Commission (15%)</span>
                  <span>- ₹{calculated.commission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-red-400">
                  <span>GPS Onboard Telematics &amp; Insurance</span>
                  <span>- ₹{calculated.insurance.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 border-t border-white/5 pt-2 text-[9px] text-gray-500 font-semibold leading-relaxed">
                  <Info size={11} className="text-yellow-400 shrink-0" />
                  <span>Calculations assume optimal listing pricing coordinates. Payouts are made directly every Wednesday.</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default IncomeCalculator;
