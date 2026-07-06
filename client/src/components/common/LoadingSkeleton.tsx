// src/components/common/LoadingSkeleton.tsx
import * as React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse bg-gray-200 rounded-[12px]", className)}
      {...props}
    />
  );
};

export const VehicleCardSkeleton = () => {
  return (
    <div className="border border-gray-100 rounded-[20px] p-4 bg-white space-y-4">
      <Skeleton className="w-full h-44 rounded-[16px]" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="space-y-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
};

export const GridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
