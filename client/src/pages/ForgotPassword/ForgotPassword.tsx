// src/pages/ForgotPassword/ForgotPassword.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../../components/ui/Toast";

const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export const ForgotPassword = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast("Password Reset Email Sent", {
          description: `A reset link has been sent to ${data.email}.`,
          type: "success",
        });
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
            Security &amp; <span className="text-yellow-400">Peace of Mind</span>
          </h2>
          <p className="text-gray-300">
            We use industry-standard encryption and state-of-the-art secure auth methods to ensure your account and personal details remain safe.
          </p>
        </div>
      </motion.div>

      {/* Right side form */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition">
              <ArrowLeft size={16} /> Back to Login
            </Link>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-4">Forgot Password?</h2>
            <p className="text-sm text-gray-500 mt-1 font-semibold">
              Enter your registered email and we'll send you a secure link to reset your password.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-2.5 rounded-xl hover:bg-yellow-300 transition shadow-yellow-glow-hover disabled:opacity-75 cursor-pointer mt-4"
            >
              {isSubmitting ? "Sending Link..." : "Send Reset Link"}
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

export default ForgotPassword;
