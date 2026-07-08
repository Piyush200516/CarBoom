// src/components/safety/EmergencySupport.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, ShieldAlert, AlertTriangle, X } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SUPPORT_PHONE, SUPPORT_PHONE_RAW } from "../../constants/contact";

export const EmergencySupport: React.FC = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alertDispatched, setAlertDispatched] = useState(false);

  useEffect(() => {
    let timer: any;
    if (sosActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (sosActive && countdown === 0) {
      setAlertDispatched(true);
    }
    return () => clearTimeout(timer);
  }, [sosActive, countdown]);

  const handleStartSos = () => {
    setSosActive(true);
    setCountdown(5);
    setAlertDispatched(false);
  };

  const handleCancelSos = () => {
    setSosActive(false);
    setCountdown(5);
    setAlertDispatched(false);
  };

  return (
    <section id="emergency" className="py-24 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        
        <Card variant="dark" className="relative overflow-hidden p-8 md:p-12 rounded-[32px] shadow-2xl border border-white/5">
          {/* Background Gradients */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 text-left">
            
            {/* Contact Information & Texts */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20">
                <AlertTriangle size={12} className="text-red-400" /> Critical Support
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Need Help on the Road? <br />
                <span className="text-yellow-400">We’ve Got Your Back.</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-semibold">
                Our emergency response system is active 24/7. Whether you face a technical breakdown, 
                a flat tire, or an accident, contact our roadside support immediately.
              </p>

              {/* Emergency Hotline details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Roadside Assistance</div>
                  <a href={`tel:${SUPPORT_PHONE_RAW}`} className="text-base font-black text-white hover:text-yellow-400 transition flex items-center gap-2 mt-1">
                    <PhoneCall size={16} /> {SUPPORT_PHONE}
                  </a>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Customer Support Helpline</div>
                  <a href={`tel:${SUPPORT_PHONE_RAW}`} className="text-base font-black text-white hover:text-yellow-400 transition flex items-center gap-2 mt-1">
                    <PhoneCall size={16} /> {SUPPORT_PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive SOS Trigger Panel */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/5 rounded-[24px] border border-white/10 backdrop-blur-sm min-h-[260px] text-center">
              <AnimatePresence mode="wait">
                {!sosActive ? (
                  <motion.div
                    key="trigger"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-600/30 rounded-full blur-[20px] animate-pulse" />
                      <button
                        type="button"
                        onClick={handleStartSos}
                        className="relative w-28 h-28 rounded-full bg-red-600 hover:bg-red-500 border-4 border-white/10 flex flex-col items-center justify-center text-white font-black text-base shadow-xl tracking-wider cursor-pointer active:scale-95 transition-all"
                      >
                        <ShieldAlert size={28} className="mb-1 text-white animate-bounce" />
                        <span>SOS</span>
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                      Hold to trigger emergency alert
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active-sos"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center justify-center space-y-6"
                  >
                    {!alertDispatched ? (
                      <>
                        <div className="text-red-500 font-black text-6xl animate-pulse">
                          {countdown}s
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-white font-extrabold text-base">Triggering Emergency SOS</h4>
                          <p className="text-gray-400 text-xs font-semibold px-4">
                            Alerting support dispatch. You can cancel this request within the countdown.
                          </p>
                        </div>
                        <Button
                          variant="danger"
                          onClick={handleCancelSos}
                          className="flex items-center gap-2 text-xs font-black uppercase px-6 py-2.5 rounded-full"
                        >
                          <X size={14} /> Cancel SOS
                        </Button>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="w-14 h-14 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                          <ShieldAlert size={26} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-white font-extrabold text-base">Alert Dispatched</h4>
                          <p className="text-gray-400 text-xs font-semibold px-4">
                            Your mock safety alert has been successfully logged. Safety agents will call you immediately.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleCancelSos}
                          className="text-xs font-black uppercase px-6 py-2.5 rounded-full"
                        >
                          Reset Control
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </Card>

      </div>
    </section>
  );
};

export default EmergencySupport;
