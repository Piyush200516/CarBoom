// src/pages/ResetPassword/ResetPassword.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../components/ui/Toast";

const resetSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>;

export const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (_: ResetFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast("Password Reset Successful", {
          description: "You can now log in with your new password.",
          type: "success",
        });
        navigate("/login");
        resolve();
      }, 1500);
    });
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
            Safe, Secure, and <span className="text-yellow-400">Reliable</span>
          </h2>
          <p className="text-gray-300">
            Keep your credentials secure. Make sure to use a strong password with a mix of numbers, symbols, and letters.
          </p>
        </div>
      </motion.div>

      {/* Right side form */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Reset Password</h2>
            <p className="text-sm text-gray-500 mt-1 font-semibold">
              Enter your new credentials below to update your account password.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-2.5 rounded-xl hover:bg-yellow-300 transition shadow-yellow-glow-hover disabled:opacity-75 cursor-pointer mt-4"
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="mt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} CarBoom. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
