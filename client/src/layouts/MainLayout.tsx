import Navbar from "../components/layout/Navbar";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const MainLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // While the initial auth check is in-flight, render a neutral shell
    // (no navbar) to prevent flashing the guest navbar for logged-in users.
    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#0b0f19]" aria-busy="true" />
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#0b0f19]">
            {isAuthenticated ? <DashboardNavbar /> : <Navbar />}
            <main className={`flex-grow ${isAuthenticated ? "pt-24 pb-12 text-white" : ""}`}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;