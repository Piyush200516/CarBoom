// src/components/ui/Badge.tsx
import * as React from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "glass" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "primary", children, ...props }) => {
  const variants = {
    primary: "bg-yellow-400/20 text-yellow-600 border border-yellow-400/30",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-600 border border-red-500/20",
    glass: "bg-white/10 text-white border border-white/15 backdrop-blur-md",
    outline: "bg-transparent text-gray-500 border border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-bold rounded-full tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
