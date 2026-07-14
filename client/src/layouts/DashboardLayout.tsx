import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#0b0f19] text-white selection:bg-yellow-400/30">
            <DashboardNavbar />
            <main className="flex-grow pt-24 pb-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
