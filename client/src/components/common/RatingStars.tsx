// src/components/common/RatingStars.tsx
import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../../utils/cn";

export interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
  showText?: boolean;
  reviewsCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  className,
  size = 16,
  showText = false,
  reviewsCount,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const halfStarCount = hasHalfStar ? 1 : 0;
  const emptyStars = max - fullStars - (rating % 1 >= 0.75 ? 1 : 0) - halfStarCount;
  const adjustedFullStars = fullStars + (rating % 1 >= 0.75 ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1 text-yellow-400 select-none", className)}>
      {[...Array(adjustedFullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          fill="currentColor"
          stroke="currentColor"
          className="shrink-0"
        />
      ))}
      {hasHalfStar && (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <Star size={size} stroke="currentColor" className="absolute text-yellow-400" />
          <div className="absolute overflow-hidden" style={{ width: "50%" }}>
            <Star size={size} fill="currentColor" stroke="currentColor" className="text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          stroke="currentColor"
          className="text-gray-300 shrink-0"
        />
      ))}
      {showText && (
        <span className="text-xs font-bold text-gray-600 ml-1">
          {rating.toFixed(1)}
          {reviewsCount !== undefined && (
            <span className="text-gray-400 font-normal"> ({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
