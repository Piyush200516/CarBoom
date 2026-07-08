// src/components/privacy/CookiesAndRights.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, RefreshCw, CheckCircle, ChevronRight, Info } from "lucide-react";

interface CookieCategory {
  id: "essential" | "analytics" | "functional" | "marketing";
  title: string;
  desc: string;
  required: boolean;
}

interface UserRight {
  id: string;
  title: string;
  short: string;
  description: string;
  timeframe: string;
  legalBase: string;
  actionLabel: string;
}

export const CookiesAndRights: React.FC = () => {
  // Cookie Preferences State
  const [cookieState, setCookieState] = useState({
    essential: true,
    analytics: true,
    functional: false,
    marketing: false,
  });
  const [savingCookies, setSavingCookies] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // User Rights State
  const [activeRightId, setActiveRightId] = useState("access");

  const cookies: CookieCategory[] = [
    {
      id: "essential",
      title: "Essential & Security Cookies",
      desc: "Strictly necessary for user login, secure authentication escrow, and Stripe payment processing.",
      required: true,
    },
    {
      id: "analytics",
      title: "Performance & Analytics Cookies",
      desc: "Anonymized page counts and search usage logs that help us optimize load speeds and layout designs.",
      required: false,
    },
    {
      id: "functional",
      title: "Functional & Preferences Cookies",
      desc: "Remembers your dark mode selection, currency selections, and favorite vehicle searches.",
      required: false,
    },
    {
      id: "marketing",
      title: "Targeted Marketing Cookies",
      desc: "Used to customize promotions, vehicle recommendations, and ads on external search engines.",
      required: false,
    },
  ];

  const userRights: UserRight[] = [
    {
      id: "access",
      title: "Right to Access (GDPR Art. 15)",
      short: "Request a full copy of your account profile details, telemetry coordinates, and payment logs.",
      description: "You have the right to request a structural export of all data assets we hold associated with your verified profile. We deliver this data in standard JSON/CSV files.",
      timeframe: "30 Days response window",
      legalBase: "GDPR Article 15 / CCPA § 1798.110",
      actionLabel: "Request Data Export",
    },
    {
      id: "erasure",
      title: "Right to Erasure (GDPR Art. 17)",
      short: "Request deletion of your profile, verification scans, and contact coordinates.",
      description: "Allows you to scrub your identity records from active databases. Please note that legal tax records and active car insurance dispute logs are kept for regulatory compliance.",
      timeframe: "30 Days response window",
      legalBase: "GDPR Article 17 / CCPA § 1798.105",
      actionLabel: "Request Account Deletion",
    },
    {
      id: "rectification",
      title: "Right to Rectification (GDPR Art. 16)",
      short: "Request correction of mismatched contact details or invalid driver credentials.",
      description: "If you find that your verified credentials, legal name, or banking details are outdated or incorrect, you can request immediate rectification or update them via your profile panel.",
      timeframe: "14 Days response window",
      legalBase: "GDPR Article 16 / CCPA § 1798.106",
      actionLabel: "Submit Rectification Request",
    },
    {
      id: "portability",
      title: "Right to Portability (GDPR Art. 20)",
      short: "Download machine-readable transaction files for import to external products.",
      description: "Enables transferring your rental logs, rating stats, and hosting history logs to any competing service or personal repository in a standardized structure.",
      timeframe: "30 Days response window",
      legalBase: "GDPR Article 20",
      actionLabel: "Export Portability Package",
    },
    {
      id: "optout",
      title: "Right to Opt-Out (CCPA/CPRA)",
      short: "Restrict sale or distribution of metrics for targeted cross-context ads.",
      description: "CarBoom does not trade, rent, or sell user records. However, you can permanently disable sharing trackers with marketing networks here.",
      timeframe: "Instant configuration",
      legalBase: "CCPA § 1798.120 / CPRA",
      actionLabel: "Configure Opt-Out Settings",
    },
  ];

  const handleCookieToggle = (id: "analytics" | "functional" | "marketing") => {
    setCookieState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setSaveSuccess(false);
  };

  const savePreferences = () => {
    setSavingCookies(true);
    setTimeout(() => {
      setSavingCookies(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  const selectedRight = userRights.find((r) => r.id === activeRightId) || userRights[0];

  return (
    <section id="cookies" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 text-xs font-black uppercase tracking-wider">
          User Settings & Protection
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Cookies & Privacy Rights
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Manage your telemetry trackers, and explore the legal tools available to you to control your personal parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Cookie preferences card - 5 Cols */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FACC15]" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-400/10 text-[#FACC15] rounded-xl">
              <Cookie className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cookie Settings Center</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Configure active browser trackers</p>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            {cookies.map((cookie) => (
              <div
                key={cookie.id}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/80 transition-colors"
              >
                {/* Custom toggle */}
                <button
                  disabled={cookie.required}
                  onClick={() => handleCookieToggle(cookie.id as any)}
                  className={`w-11 h-6 rounded-full p-1 transition-all duration-300 relative shrink-0 mt-0.5 cursor-pointer ${
                    cookieState[cookie.id]
                      ? "bg-[#FACC15]"
                      : "bg-gray-300 dark:bg-gray-700"
                  } ${cookie.required ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 transform ${
                      cookieState[cookie.id] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {cookie.title}
                    </span>
                    {cookie.required && (
                      <span className="text-[9px] font-black uppercase text-gray-400 px-1.5 py-0.2 bg-gray-200 dark:bg-gray-700 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                    {cookie.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={savePreferences}
              disabled={savingCookies}
              className="w-full bg-gray-900 hover:bg-black dark:bg-[#FACC15] dark:text-black dark:hover:bg-yellow-300 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-yellow-500/10 cursor-pointer disabled:opacity-80"
            >
              {savingCookies ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Applying preferences...</span>
                </>
              ) : (
                <span>Save Cookie Settings</span>
              )}
            </button>

            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 -bottom-14 flex items-center justify-center gap-1.5 p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Cookie preferences applied to profile.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Rights Center - 7 Cols */}
        <div className="lg:col-span-7 flex flex-col md:flex-row bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl min-h-[500px]">
          {/* Tabs Sidebar */}
          <div className="md:w-2/5 border-r border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 p-4 space-y-2 flex md:flex-col overflow-x-auto md:overflow-x-visible">
            <div className="hidden md:block mb-4 px-2">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Identity Controls
              </span>
            </div>
            {userRights.map((right) => (
              <button
                key={right.id}
                onClick={() => setActiveRightId(right.id)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer shrink-0 md:shrink ${
                  activeRightId === right.id
                    ? "bg-[#FACC15]/10 border-yellow-400/20 text-yellow-600 dark:text-yellow-400 font-bold"
                    : "bg-transparent border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/40 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold">{right.title.split(" (")[0]}</span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
                    {right.id === "optout" ? "CCPA Opt-Out" : "GDPR Request"}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 hidden md:block" />
              </button>
            ))}
          </div>

          {/* Details Panel */}
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                  Active Rights Focus
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {selectedRight.title}
                </h3>
              </div>

              {/* Box for short description */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 rounded-2xl flex gap-3">
                <Info className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedRight.short}
                </p>
              </div>

              {/* Detailed Description */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                  Compliance Details
                </span>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                  {selectedRight.description}
                </p>
              </div>

              {/* Metadata Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50 rounded-xl">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    Response Limit
                  </span>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                    {selectedRight.timeframe}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/50 rounded-xl">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    Statutory Source
                  </span>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                    {selectedRight.legalBase}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-between p-3.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700/80 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-800 dark:text-white transition-all duration-300 cursor-pointer"
              >
                <span>{selectedRight.actionLabel}</span>
                <div className="flex items-center gap-1 text-[#FACC15]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-black tracking-wider">Secure Path</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiesAndRights;
