// src/components/ui/Toast.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (title: string, options?: { description?: string; type?: ToastType }) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback((title: string, options?: { description?: string; type?: ToastType }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = {
      id,
      title,
      description: options?.description,
      type: options?.type || "success",
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="bg-[#111827] text-white p-4 rounded-[16px] border border-white/10 shadow-2xl flex items-start justify-between gap-3 pointer-events-auto backdrop-blur-md bg-opacity-95"
            >
              <div className="flex gap-3">
                {t.type === "success" && <CheckCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />}
                {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
                {t.type === "info" && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
                
                <div>
                  <h4 className="text-sm font-bold tracking-wide">{t.title}</h4>
                  {t.description && (
                    <p className="text-xs text-gray-400 mt-1 font-medium">{t.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
