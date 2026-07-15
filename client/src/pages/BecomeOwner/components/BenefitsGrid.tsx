import React from "react";
import { motion } from "framer-motion";
import { 
  Coins, Verified, ShieldCheck, Landmark, Users, 
  HelpCircle, CalendarRange, LayoutDashboard, UserCheck 
} from "lucide-react";
import { Card } from "../../../components/ui/Card";

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  border: string;
}

const BENEFITS: BenefitItem[] = [
  {
    title: "Higher Earnings",
    description: "Keep up to 85% of the total rental fees. Keep your vehicle active during peak holidays to double margins.",
    icon: Coins,
    color: "from-yellow-500/10 via-amber-500/5 to-transparent",
    border: "hover:border-yellow-400/30"
  },
  {
    title: "Verified Renters",
    description: "Every driver undergoes license validation, Aadhaar checks, and profile reviews before scheduling bookings.",
    icon: Verified,
    color: "from-blue-500/10 via-indigo-500/5 to-transparent",
    border: "hover:border-blue-400/30"
  },
  {
    title: "Insurance Protection",
    description: "Comprehensive damage and liability cover covers the vehicle active trip coordinates. Zero owner liability.",
    icon: ShieldCheck,
    color: "from-emerald-500/10 via-teal-500/5 to-transparent",
    border: "hover:border-emerald-400/30"
  },
  {
    title: "Fast Payments",
    description: "Get payouts directly into your linked bank account every Wednesday morning. Auto-credited.",
    icon: Landmark,
    color: "from-purple-500/10 via-pink-500/5 to-transparent",
    border: "hover:border-purple-400/30"
  },
  {
    title: "24x7 Host Support",
    description: "Direct priority support access for owners. Resolve incident logs, booking modifications, or roadside emergencies quickly.",
    icon: Users,
    color: "from-rose-500/10 via-orange-500/5 to-transparent",
    border: "hover:border-rose-400/30"
  },
  {
    title: "Zero Hidden Charges",
    description: "No subscription fees or onboarding deposits. Free registration and listings. We only make money when you earn.",
    icon: HelpCircle,
    color: "from-sky-500/10 via-cyan-500/5 to-transparent",
    border: "hover:border-sky-400/30"
  },
  {
    title: "Flexible Availability",
    description: "Block any days or hours on the vehicle calendar. Maintain full personal usage of your ride whenever needed.",
    icon: CalendarRange,
    color: "from-teal-500/10 via-emerald-500/5 to-transparent",
    border: "hover:border-teal-400/30"
  },
  {
    title: "Owner Dashboard",
    description: "Track earnings charts, coordinate upcoming bookings, download payout receipts, and monitor vehicle locations.",
    icon: LayoutDashboard,
    color: "from-violet-500/10 via-fuchsia-500/5 to-transparent",
    border: "hover:border-violet-400/30"
  },
  {
    title: "Dedicated Account Manager",
    description: "Get personalized tips from optimization executives to boost daily rental views and maximize utilization rates.",
    icon: UserCheck,
    color: "from-fuchsia-500/10 via-rose-500/5 to-transparent",
    border: "hover:border-fuchsia-400/30"
  }
];

export const BenefitsGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="text-center mb-16">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Exclusive Advantages</span>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-1 font-heading text-white">
          Why Host on CarBoom?
        </h2>
        <p className="text-gray-400 text-xs font-semibold mt-2">
          Maximize profit margins with total safety backups and zero risk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BENEFITS.map((benefit, idx) => {
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-full"
            >
              <Card
                className={`bg-gradient-to-br ${benefit.color} border border-white/5 p-6 rounded-[20px] text-left transition-all duration-300 ${benefit.border} h-full flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div>
                  <div className="w-10 h-10 rounded-[14px] bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 mb-4 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default BenefitsGrid;
