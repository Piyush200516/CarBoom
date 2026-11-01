// src/router/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyBookings from "../pages/Dashboard/MyBookings";
import Wishlist from "../pages/Dashboard/Wishlist";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import BrowseVehicles from "../pages/BrowseVehicles";
import HowItWorks from "../pages/HowItWorks";
import BecomeOwner from "../pages/BecomeOwner";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import HelpCenterPage from "../pages/HelpCenter";
import VehicleDetails from "../pages/VehicleDetails";
import SafetyPage from "../pages/Safety";
import CancellationPolicy from "../pages/CancellationPolicy";
import PrivacyPage from "../pages/Privacy";
import TermsPage from "../pages/Terms";
import NotFound from "../pages/NotFound/NotFound";
import ProfilePage from "../pages/Profile/ProfilePage";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import BookingConfirmation from "../pages/BookingConfirmation/BookingConfirmation";
import { useAuth } from "../store/AuthContext";

/**
 * GuestRoute – redirects already-authenticated users away from auth pages.
 * Waits for the initial auth check (isLoading) before deciding.
 */
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // While auth is being checked, render nothing to avoid a flash-redirect.
  if (isLoading) {
    return <div className="min-h-screen bg-[#0b0f19]" aria-busy="true" />;
  }

  // Already logged in → send to dashboard.
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

/**
 * ProtectedRoute – requires authentication.
 * Redirects guests to /login while preserving the intended destination.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-[#0b0f19]" aria-busy="true" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ returnTo: location.pathname }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone full-screen pages — only for guests */}
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Booking flow pages — protected: login required */}
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />

      {/* Authenticated Dashboard Pages — DashboardLayout handles auth guard */}
        {/* Profile Page */}
        <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>

      {/* Public Pages wrapped in MainLayout — shows DashboardNavbar when authenticated */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<BrowseVehicles />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="become-owner" element={<BecomeOwner />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="vehicle/:id" element={<VehicleDetails />} />
        <Route path="help" element={<HelpCenterPage />} />
        <Route path="safety" element={<SafetyPage />} />
        <Route path="cancellation-policy" element={<CancellationPolicy />} />
        <Route path="cancel" element={<CancellationPolicy />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;