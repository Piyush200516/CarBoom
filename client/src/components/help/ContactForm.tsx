// src/components/help/ContactForm.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Placeholder: simulate async request
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Contact form submitted", data);
    reset();
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="glassmorphism-light rounded-xl p-6 shadow-lg space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">{errors.message?.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
          {isSubmitSuccessful && (
            <p className="mt-4 text-center text-green-600">Your message has been sent successfully!</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};
