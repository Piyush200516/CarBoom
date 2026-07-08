// src/components/privacy/RetentionAndChildren.tsx
import React from "react";
import { CalendarRange, ShieldAlert, CheckSquare, Clock } from "lucide-react";

interface RetentionBarProps {
  label: string;
  duration: string;
  percentage: string;
  barColor: string;
}

const RetentionBar: React.FC<RetentionBarProps> = ({ label, duration, percentage, barColor }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-bold text-gray-800 dark:text-gray-200">{label}</span>
        <span className="font-mono font-black text-[#FACC15]">{duration}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800/80 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: percentage }} />
      </div>
    </div>
  );
};

export const RetentionAndChildren: React.FC = () => {
  return (
    <section id="retention" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Retention Durations - 6 Cols */}
        <div className="lg:col-span-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-400/10 text-[#FACC15] rounded-xl">
                <CalendarRange className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Data Retention Schedules</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500">Timeline metrics for data erasure triggers</p>
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <RetentionBar
                label="Session & Temp Log Files"
                duration="30 Days"
                percentage="12%"
                barColor="bg-yellow-400"
              />
              <RetentionBar
                label="Driver Verification Images"
                duration="90 Days"
                percentage="25%"
                barColor="bg-amber-500"
              />
              <RetentionBar
                label="Location & Telematics Routes"
                duration="12 Months"
                percentage="40%"
                barColor="bg-blue-500"
              />
              <RetentionBar
                label="Tax, Audits & Billing Records"
                duration="7 Years"
                percentage="80%"
                barColor="bg-emerald-500"
              />
              <RetentionBar
                label="Active Profile Credentials"
                duration="Account Lifetime"
                percentage="100%"
                barColor="bg-purple-500"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
              Expired records are automatically purged or fully anonymized within 60 days of the retention window expiration.
            </span>
          </div>
        </div>

        {/* Children's Privacy Shield - 6 Cols */}
        <div className="lg:col-span-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle red background glow */}
          <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Children's Privacy Protection</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500">Strict regulatory compliance age bounds</p>
              </div>
            </div>

            {/* Warn container box */}
            <div className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider">
                  Registration Limit: Under 18 Restriction
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                CarBoom is a peer-to-peer automotive sharing platform. Our systems do not knowingly collect, parse, or keep profile information from children under the age of 18.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3">
                <CheckSquare className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                  <strong className="text-gray-800 dark:text-gray-200">Account Deletion:</strong> If a parent or guardian discovers their child has registered an account, email our privacy desk immediately for instant record removal.
                </span>
              </div>
              <div className="flex gap-3">
                <CheckSquare className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                  <strong className="text-gray-800 dark:text-gray-200">KYC Auditing:</strong> Instant validation of national identification prevents minor registration attempts before profile verification completes.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-500/80 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              COPPA COMPLIANT
            </span>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
              Children's Online Privacy Protection Rule active.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RetentionAndChildren;
