// src/router/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone full-screen pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Pages wrapped in MainLayout */}
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