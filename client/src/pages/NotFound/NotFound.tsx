// src/pages/NotFound/NotFound.tsx

import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center px-6 relative overflow-hidden text-center text-white">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full filter blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md space-y-6 relative z-10"
      >
        <div className="w-24 h-24 rounded-full bg-yellow-400/15 flex items-center justify-center text-yellow-400 mx-auto animate-spin-slow">
          <Compass size={48} />
        </div>

        <h1 className="text-8xl font-black text-yellow-400 tracking-tight">404</h1>
        
        <h2 className="text-2xl font-extrabold text-white">Lost Your Way?</h2>
        
        <p className="text-gray-400 text-xs font-semibold leading-relaxed">
          It looks like the road you took isn't on our map. Let's redirect you back to safety or browse through our vehicles.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link to="/">
            <Button variant="primary" className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
              <Home size={14} /> Go Home
            </Button>
          </Link>
          <Link to="/browse">
            <Button variant="outline" className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs border-white/20 text-white hover:border-yellow-400">
              Browse Cars
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
