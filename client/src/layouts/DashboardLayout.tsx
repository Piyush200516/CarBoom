import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const DashboardLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Wait for auth check to complete before rendering or redirecting
    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#0b0f19]" aria-busy="true" />
        );
    }

    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

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
