// src/components/common/Pagination.tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={cn("flex justify-center items-center gap-1 mt-8 select-none", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex gap-1.5 mx-2">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-9 w-9 text-sm font-semibold rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
              currentPage === page
                ? "bg-yellow-400 text-black shadow-md shadow-yellow-400/10"
                : "border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-gray-900"
            )}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
