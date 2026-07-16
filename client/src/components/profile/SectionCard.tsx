// src/components/profile/SectionCard.tsx
import React from "react";
import { Card } from "../ui/Card";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <Card variant="glass" className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="space-y-4">{children}</div>
    </Card>
  );
};
