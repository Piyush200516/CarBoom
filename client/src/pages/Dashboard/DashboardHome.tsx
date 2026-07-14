import { motion } from "framer-motion";
import DashboardHero from "../../components/dashboard/DashboardHero";
import QuickStats from "../../components/dashboard/QuickStats";
import VehicleCarousel from "../../components/dashboard/VehicleCarousel";
import SpecialOffers from "../../components/dashboard/SpecialOffers";
import PopularCategories from "../../components/dashboard/PopularCategories";
import OwnerCTA from "../../components/dashboard/OwnerCTA";
import RecentBookings from "../../components/dashboard/RecentBookings";
import UpcomingBookings from "../../components/dashboard/UpcomingBookings";
import CustomerReviews from "../../components/dashboard/CustomerReviews";
import { mockVehicles } from "../../data/mockData";

const DashboardHome = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-12 max-w-[1400px] mx-auto px-6"
        >
            <DashboardHero />
            <QuickStats />
            
            <VehicleCarousel title="Nearby Vehicles" vehicles={mockVehicles.slice(0, 4)} />
            <VehicleCarousel title="Featured Vehicles" vehicles={mockVehicles.slice(4, 8)} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-2">
                    <SpecialOffers />
                </div>
                <div className="col-span-1">
                    <UpcomingBookings />
                </div>
            </div>

            <PopularCategories />
            <VehicleCarousel title="Recommended for You" vehicles={mockVehicles.slice(1, 5)} />
            
            <RecentBookings />
            <OwnerCTA />
            <CustomerReviews />
        </motion.div>
    );
};

export default DashboardHome;
