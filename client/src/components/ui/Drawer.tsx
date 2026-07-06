// src/components/ui/Drawer.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right" | "bottom";
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  side = "right",
}) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const slideVariants = {
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
  };

  const placementClasses = {
    right: "right-0 top-0 bottom-0 w-full max-w-sm h-full rounded-l-[24px]",
    left: "left-0 top-0 bottom-0 w-full max-w-sm h-full rounded-r-[24px]",
    bottom: "bottom-0 left-0 right-0 w-full h-[80vh] rounded-t-[24px]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            variants={slideVariants[side]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className={cn(
              "fixed bg-white shadow-2xl overflow-y-auto border-gray-100 flex flex-col z-50",
              placementClasses[side],
              className
            )}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              {title ? (
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
