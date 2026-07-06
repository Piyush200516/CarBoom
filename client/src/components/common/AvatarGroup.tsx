// src/components/common/AvatarGroup.tsx
import * as React from "react";
import { cn } from "../../utils/cn";

export interface AvatarGroupProps {
  avatars: string[];
  limit?: number;
  size?: number;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  limit = 5,
  size = 32,
  className,
}) => {
  const visibleAvatars = avatars.slice(0, limit);
  const extraCount = avatars.length - limit;

  return (
    <div className={cn("flex -space-x-2 items-center select-none", className)}>
      {visibleAvatars.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`user avatar ${index + 1}`}
          className="rounded-full border-2 border-white object-cover shadow-sm bg-gray-100 shrink-0"
          style={{ width: size, height: size }}
        />
      ))}
      {extraCount > 0 && (
        <div
          className="rounded-full border-2 border-white bg-yellow-400 text-black font-extrabold text-[10px] flex items-center justify-center shadow-sm shrink-0"
          style={{ width: size, height: size }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
