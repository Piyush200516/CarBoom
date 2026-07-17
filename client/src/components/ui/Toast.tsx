// src/components/ui/Toast.tsx
import * as React from "react";
import { Toaster, toast as sonnerToast } from "sonner";

// Define toast types
export type ToastType = "success" | "error" | "info" | "warning";

// Central toast utility mirroring previous API
export const toast = {
  success: (title: string, description?: string) =>
    sonnerToast.success(title, { description, duration: 4000, className: "bg-[#111827] text-white" }),
  error: (title: string, description?: string) =>
    sonnerToast.error(title, { description, duration: 4000, className: "bg-[#111827] text-white" }),
  info: (title: string, description?: string) =>
    sonnerToast.message(title, { description, duration: 4000, className: "bg-[#111827] text-white" }),
  warning: (title: string, description?: string) =>
    sonnerToast.custom(() => (
      <div className="flex items-center gap-2 p-3 bg-yellow-700 text-white rounded-md">
        <span className="font-medium">{title}</span>
        {description && <p className="text-sm">{description}</p>}
      </div>
    ), { duration: 4000, className: "bg-[#111827] text-white" }),
};

// Global provider – render Sonner's Toaster once at the app root
export const GlobalToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    {children}
    <Toaster position="bottom-right" />
  </>
);

// Context hook kept for backward compatibility – wraps the new toast utility
export const useToast = () => {
  // No context needed; we expose a simple hook that uses the toast utility directly
  return {
    toast: (title: string, options?: { description?: string; type?: ToastType }) => {
      const { description, type = "success" } = options || {};
      switch (type) {
        case "error":
          return toast.error(title, description);
        case "info":
          return toast.info(title, description);
        case "warning":
          return toast.warning(title, description);
        case "success":
        default:
          return toast.success(title, description);
      }
    },
  };
};
