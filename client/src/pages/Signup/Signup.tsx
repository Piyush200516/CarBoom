// src/pages/Signup/Signup.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../components/ui/Toast";
import { authService } from "../../services/authService";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: "RENTER"
      };
      await authService.register(payload);
      
      toast("Account Created Successfully", {
        description: `Welcome to CarBoom, ${data.name}!`,
        type: "success",
      });
      navigate("/login");
    } catch (error: any) {
      toast("Signup Failed", {
        description: error.response?.data?.message || "An error occurred during signup",
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] opacity-80" />
        <div className="absolute top-8 left-8 space-y-1">
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
              Car<span className="text-yellow-400">Boom</span>
            </h1>
          </Link>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-[-3px]">
            Rent. Ride. Earn.
          </p>
        </div>
        <div className="m-auto text-center px-12 max-w-lg relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Join India's Fastest Growing{" "}
            <span className="text-yellow-400">P2P Network</span>
          </h2>
          <p className="text-gray-300 mb-8">
            List your vehicle or rent one in minutes. Over 25,000 users trust CarBoom across Tier-2 & Tier-3 cities.
          </p>
          <div className="relative w-full h-80">
            <motion.img
              src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=500"
              alt="Premium EV"
              className="absolute top-0 left-0 w-44 h-auto rounded-xl shadow-2xl"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1597501849790-78f731c83b23?auto=format&fit=crop&q=80&w=500"
              alt="Scooter"
              className="absolute bottom-0 right-10 w-40 h-auto rounded-xl shadow-2xl"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Right side form */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Create Account</h2>
            <Link to="/login" className="text-sm font-medium text-yellow-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.name ? "border-red-500" : "border-gray-200"}`}
                {...register("name")}
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500 font-bold">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500 font-bold">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Phone Number"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                {...register("phone")}
                disabled={isSubmitting}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500 font-bold">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.password ? "border-red-500" : "border-gray-200"}`}
                {...register("password")}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="mt-1 text-xs text-red-500 font-bold">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                {...register("confirmPassword")}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500 font-bold">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2.5 text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox mt-1 text-yellow-400 focus:ring-yellow-400 rounded" required />
              <span>
                I agree to CarBoom's{" "}
                <Link to="/terms" className="text-yellow-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-yellow-500 hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-2.5 rounded-xl hover:bg-yellow-300 transition shadow-yellow-glow-hover disabled:opacity-75 cursor-pointer mt-4"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} CarBoom. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
