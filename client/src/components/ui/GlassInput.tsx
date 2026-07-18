// src/components/ui/GlassInput.tsx
import React from "react";
import { cn } from "../../utils/cn";

interface GlassInputProps {
  label: string;
  type?: string;
  icon: React.ComponentType<any>;
  disabled?: boolean;
  register: ReturnType<ReturnType<typeof import('react-hook-form').useForm>['register']>;
  name: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({ label, type = "text", icon: Icon, disabled = false, register }) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        {...register}
        disabled={disabled}
        placeholder=" "
        className={cn(
          "peer w-full rounded-xl bg-gray-800 border border-gray-600 pl-10 pr-3 py-2 text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary",
          disabled && "bg-gray-700 text-gray-400 cursor-not-allowed"
        )}
      />
      <label className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary">
        {label}
      </label>
    </div>
  );
};
