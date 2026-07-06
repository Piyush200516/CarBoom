// src/components/ui/Input.tsx
import * as React from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    return (
      <div className="w-full text-left space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-gray-400 pointer-events-none select-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={id}
            className={cn(
              "w-full bg-white border text-gray-900 placeholder-gray-400 font-medium text-sm rounded-[16px] px-4 py-3 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-yellow-400/80 focus:border-yellow-400",
              "disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed",
              leftIcon ? "pl-11" : "",
              rightIcon ? "pr-11" : "",
              error ? "border-red-500 focus:ring-red-400/50 focus:border-red-500" : "border-gray-200 focus:border-yellow-400",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 text-gray-400 cursor-pointer select-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-semibold text-red-500 animate-in fade-in slide-in-from-top-1 duration-150">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
