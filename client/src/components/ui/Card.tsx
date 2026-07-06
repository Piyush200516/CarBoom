// src/components/ui/Card.tsx
import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<"div">>,
    HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "glass-light" | "dark" | "flat";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = false, children, ...props }, ref) => {
    const cardVariants = {
      default: "bg-white border border-gray-100 shadow-sm",
      glass: "glassmorphism",
      "glass-light": "glassmorphism-light",
      dark: "bg-gray-900 border border-white/5 text-white shadow-xl",
      flat: "bg-gray-50 border border-gray-100",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -6, transition: { duration: 0.2, ease: "easeOut" } } : undefined}
        className={cn(
          "rounded-[20px] p-6 transition-shadow duration-300",
          cardVariants[variant],
          hoverEffect && "hover:shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
export default Card;
