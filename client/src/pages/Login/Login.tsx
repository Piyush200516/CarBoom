// src/pages/Login/Login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Phone, KeyRound, Sparkles } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../components/ui/Toast";
import { authService } from "../../services/authService";

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState<"email" | "phone">("email");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mockOtpHint, setMockOtpHint] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after login (set by VehicleDetails when it redirects here)
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo;

  const handlePostLoginRedirect = (userName: string) => {
    toast("Login Successful", {
      description: `Welcome back, ${userName}!`,
      type: "success",
    });

    const hasBookingIntent = !!localStorage.getItem("bookingIntent");
    if (returnTo && hasBookingIntent) {
      navigate("/checkout");
    } else if (returnTo) {
      navigate(returnTo);
    } else {
      navigate("/dashboard");
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login(data);
      if (response.success && response.data?.user) {
        login(response.data.user);
        handlePostLoginRedirect(response.data.user.name);
      }
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast("Login Failed", {
        description: message || "Invalid email or password",
        type: "error",
      });
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.trim().length < 10) {
      toast("Invalid Phone", {
        description: "Please enter a valid 10-digit mobile number.",
        type: "error",
      });
      return;
    }

    setIsOtpLoading(true);
    try {
      const res = await authService.sendPhoneOtp(phone);
      setOtpSent(true);
      if (res.data?.mockOtp) {
        setMockOtpHint(res.data.mockOtp);
      }
      toast("OTP Sent!", {
        description: `Verification code sent to ${phone}. (Mock OTP: ${res.data?.mockOtp || "123456"})`,
        type: "success",
      });
    } catch (err: any) {
      toast("OTP Failed", {
        description: err.response?.data?.message || "Could not send OTP.",
        type: "error",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!otp || otp.trim().length < 4) {
      toast("Invalid OTP", {
        description: "Please enter the 6-digit OTP.",
        type: "error",
      });
      return;
    }

    setIsOtpLoading(true);
    try {
      const res = await authService.verifyPhoneOtp(phone, otp);
      if (res.success && res.data?.user) {
        login(res.data.user);
        handlePostLoginRedirect(res.data.user.name);
      }
    } catch (err: any) {
      toast("Verification Failed", {
        description: err.response?.data?.message || "Invalid or expired OTP.",
        type: "error",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const demoEmail = provider === "google" ? "google.rider@carboom.in" : "github.dev@carboom.in";
      const demoName = provider === "google" ? "Google Rider" : "GitHub Dev";
      const res = await authService.loginWithOAuth(provider, demoEmail, demoName);
      if (res.success && res.data?.user) {
        login(res.data.user);
        handlePostLoginRedirect(res.data.user.name);
      }
    } catch (err: any) {
      toast("Social Login Failed", {
        description: err.response?.data?.message || "Could not log in with social provider.",
        type: "error",
      });
    }
  };

  return (
    <section className="flex min-h-screen">
      {/* Left split (desktop only) */}
      <motion.div
        className="hidden lg:flex w-1/2 bg-[#0F172A] relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] opacity-80" />
        {/* Logo & tagline */}
        <div className="absolute top-8 left-8 space-y-1">
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
            Car<span className="text-yellow-400">Boom</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            Rent. Ride. Earn.
          </p>
        </div>
        {/* Central content */}
        <div className="m-auto text-center px-12 max-w-lg relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Rent Cars, Bikes &amp; Scooters{' '}
            <span className="text-yellow-400">Near You</span>
          </h2>
          <p className="text-gray-300 mb-8">
            CarBoom is India's trusted peer‑to‑peer vehicle rental marketplace connecting owners and renters.
          </p>
          <ul className="flex flex-col gap-4 text-left text-gray-200 text-sm mb-12">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/></svg>
              Verified Owners
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a11 11 0 110 22 11 11 0 010-22z"/></svg>
              Secure Payments
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
              24/7 Support
            </li>
          </ul>
          {/* Vehicle collage */}
          <div className="relative w-full h-80">
            <motion.img
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600"
              alt="Yellow SUV"
              className="absolute top-0 left-0 w-40 h-auto rounded-xl shadow-2xl"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=500"
              alt="Premium Bike"
              className="absolute bottom-0 left-20 w-36 h-auto rounded-xl shadow-2xl"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=500"
              alt="Scooter"
              className="absolute top-10 right-0 w-40 h-auto rounded-xl shadow-2xl"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>
        </div>
        {/* Bottom customers bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-sm text-gray-300">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/30?img=${i + 10}`}
                alt="avatar"
                className="w-6 h-6 rounded-full border-2 border-yellow-400/30"
              />
            ))}
          </div>
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <span className="ml-1">Trusted by 25,000+ Happy Customers</span>
        </div>
      </motion.div>

      {/* Right side – login form */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back</h2>
            <Link to="/signup" className="text-sm font-medium text-yellow-500 hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setLoginMode("email")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                loginMode === "email" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Email &amp; Password
            </button>
            <button
              type="button"
              onClick={() => setLoginMode("phone")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
                loginMode === "phone" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📱 Phone OTP
            </button>
          </div>

          {loginMode === "email" ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              {/* Password */}
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  {...register("password")}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-400" disabled={isSubmitting} />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-yellow-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-2 rounded-xl hover:bg-yellow-300 transition shadow-yellow-glow-hover disabled:opacity-70"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                )}
                {isSubmitting ? "Signing in..." : "Sign In"}
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* Phone OTP Form */
            <div className="space-y-4">
              <div className="relative">
                <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="10-digit Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={otpSent && isOtpLoading}
                />
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isOtpLoading || phone.length < 10}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-2 rounded-xl hover:bg-yellow-300 transition shadow-yellow-glow-hover disabled:opacity-50"
                >
                  {isOtpLoading ? "Sending OTP..." : "Send Verification OTP"}
                  <Sparkles size={16} />
                </button>
              ) : (
                <>
                  <div className="relative">
                    <KeyRound size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 tracking-widest text-lg font-bold"
                    />
                  </div>

                  {mockOtpHint && (
                    <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                      💡 <strong>Development Hint:</strong> Your mock OTP is <code>{mockOtpHint}</code> (or use <code>123456</code>).
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isOtpLoading}
                      className="w-1/3 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                      Resend OTP
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyPhoneOtp}
                      disabled={isOtpLoading || otp.length < 4}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-2 rounded-xl hover:bg-yellow-300 transition shadow-yellow-glow-hover disabled:opacity-50"
                    >
                      {isOtpLoading ? "Verifying..." : "Verify & Log In"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center my-5">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="mx-2 text-gray-400 text-xs uppercase tracking-wider">or social login</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700"
            >
              <svg viewBox="0 0 533.5 544.3" className="w-4 h-4"><path fill="#4285F4" d="M533.5 278.4c0-17.7-1.6-35.4-4.9-52.5H272v99.3h147.5c-6.4 34.5-25.9 63.7-55.1 82.9v68.5h89.2c52.2-48.1 82.9-119 82.9-198.2"/></svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 4.42 2.87 8.17 6.84 9.5.6.11.82-.26.82-.58v-2.16c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .32.22.69.82.58C21.13 20.17 24 16.42 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </button>
          </div>
          <div className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} CarBoom. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
