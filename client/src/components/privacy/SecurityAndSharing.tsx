// src/components/privacy/SecurityAndSharing.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, ExternalLink, HelpCircle, HardDrive, KeyRound, Wifi, Cpu } from "lucide-react";

interface ServiceProps {
  name: string;
  scope: string;
  dataShared: string;
  purpose: string;
}

const ServiceItem: React.FC<ServiceProps> = ({ name, scope, dataShared, purpose }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800 dark:text-white">{name}</span>
          <span className="text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 bg-gray-200/50 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            {scope}
          </span>
        </div>
        <p className="text-xs font-semibold text-[#FACC15]">{dataShared}</p>
      </div>
      <div className="text-left sm:text-right">
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Purpose</span>
        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{purpose}</p>
      </div>
    </div>
  );
};

export const SecurityAndSharing: React.FC = () => {
  return (
    <section id="sharing" className="py-24 px-6 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20 text-xs font-black uppercase tracking-wider">
            Network Integrity
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Security & Third-Party Sharing
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            We lock down financial routes and selectively coordinate with verification networks to protect the rental experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Payment Card - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Secure Payments</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">PCI-DSS compliance metrics</p>
                </div>
              </div>

              {/* Credit card graphic mock */}
              <div className="relative h-44 w-full rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 p-5 text-white flex flex-col justify-between shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-200">
                      Payment Escrow Vault
                    </span>
                    <p className="text-sm font-bold tracking-wider">CarBoom Escrow Gateway</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-lg font-mono tracking-[0.25em]">•••• •••• •••• 9801</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[7px] font-bold text-emerald-200 uppercase tracking-wider block">
                        Partner System
                      </span>
                      <span className="text-xs font-mono font-bold">Stripe Connect API</span>
                    </div>
                    <div className="px-2.5 py-1 bg-emerald-400/20 border border-emerald-400/30 rounded text-[9px] uppercase font-black">
                      PCI-DSS Level 1
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pt-4">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-normal">
                    <strong className="text-gray-800 dark:text-gray-200">Zero Storage:</strong> We never write raw credit card numbers or banking passwords to our primary servers. Everything is delegated directly to Stripe.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-normal">
                    <strong className="text-gray-800 dark:text-gray-200">Payout Routing:</strong> Bank details for vehicle owners are tokenized and validated using secure integrations with financial APIs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
              <span className="font-bold">Encryption Protocol</span>
              <span className="font-mono text-[10px] font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                TLS 1.3 Active
              </span>
            </div>
          </div>

          {/* Third-Party Service partners - 7 Cols */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Third-Party Service Integration</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Selective partner channels we communicate with</p>
                  </div>
                </div>
              </div>

              {/* Partners Grid */}
              <div className="space-y-4">
                <ServiceItem
                  name="Stripe Payments"
                  scope="Global Payment Handler"
                  dataShared="Email, Billing Zip, Tokenized Cards"
                  purpose="Executing secure charges & escrow payouts"
                />
                <ServiceItem
                  name="Plaid Financial API"
                  scope="Identity & Bank Connect"
                  dataShared="Bank Account Details, Profile Name"
                  purpose="Verifying payout account validity instantly"
                />
                <ServiceItem
                  name="Google Maps Platform"
                  scope="Routing & Address API"
                  dataShared="Latitude/Longitude, Address Inputs"
                  purpose="Rendering rental pickups & vehicle search feeds"
                />
                <ServiceItem
                  name="Amazon Web Services"
                  scope="Cloud Host Infrastructure"
                  dataShared="Encrypted Database Values, Images"
                  purpose="Secure database indexing & vehicle photo storage"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#FACC15]" />
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 leading-normal">
                Partners must comply with confidentiality limits. We never rent or trade your profile parameters with advertising brokers.
              </span>
            </div>
          </div>
        </div>

        {/* Data Security Infrastructure Grid at bottom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: <HardDrive className="w-5 h-5" />,
              title: "Encrypted Backups",
              detail: "Automated snapshot snapshots written to isolated storage grids using AES-256 standard keys.",
            },
            {
              icon: <KeyRound className="w-5 h-5" />,
              title: "Row-Level Security",
              detail: "Database queries are isolated per account session. Hosts cannot access renter documents.",
            },
            {
              icon: <Wifi className="w-5 h-5" />,
              title: "SSL/TLS Firewalls",
              detail: "All api requests require TLS 1.3. Block lists active for compromised credentials.",
            },
            {
              icon: <Cpu className="w-5 h-5" />,
              title: "Audit Records",
              detail: "Internal engineers have no access to security validation files. Audited logs active.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#FACC15]/30 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white w-fit mb-3">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityAndSharing;
