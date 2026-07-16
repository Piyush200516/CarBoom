// src/components/profile/StatsCard.tsx
import React from "react";
import { Card } from "../ui/Card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value }) => {
  return (
    <Card variant="glass" className="flex flex-col items-center p-4 space-y-2">
      <Icon className="w-6 h-6 text-primary" />
      <span className="text-xl font-semibold text-white">{value}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </Card>
  );
};
