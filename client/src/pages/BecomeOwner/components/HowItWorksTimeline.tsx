import React from "react";
import { motion } from "framer-motion";
import { UserPlus, FileText, Upload, ShieldCheck, CheckCircle2, CalendarCheck, Landmark } from "lucide-react";
import { Card } from "../../../components/ui/Card";

interface TimelineStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const STEPS: TimelineStep[] = [
  {
    step: "Step 1",
    title: "Create Account",
    description: "Sign up on the platform as a host in under 2 minutes. Enter basic details to configure your verified profile.",
    icon: UserPlus
  },
  {
    step: "Step 2",
    title: "Add Vehicle Details",
    description: "Provide the vehicle's model, year, registration number, characteristics, and upload high-resolution images.",
    icon: FileText
  },
  {
    step: "Step 3",
    title: "Upload Documents",
    description: "Upload copies of the Registration Certificate (RC), active Insurance policy, and Pollution Certificate (PUC).",
    icon: Upload
  },
  {
    step: "Step 4",
    title: "Vehicle Verification",
    description: "Our operations group checks the submitted paperwork coordinates and matches details for compliance.",
    icon: ShieldCheck
  },
  {
    step: "Step 5",
    title: "Approval",
    description: "Get listing approval within 24 hours. Your vehicle is activated immediately in the search marketplace.",
    icon: CheckCircle2
  },
  {
    step: "Step 6",
    title: "Receive Bookings",
    description: "Accept booking queries, manage availability calendars, and coordinate handovers directly with renters.",
    icon: CalendarCheck
  },
  {
    step: "Step 7",
    title: "Earn Money",
    description: "Collect rental earnings weekly. Platform payments are deposited directly to your bank account every Wednesday.",
    icon: Landmark
  }
];

export const HowItWorksTimeline: React.FC = () => {
  return (
    <section id="onboarding-flow" className="py-20 border-y border-white/5 bg-white/[0.01] relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Onboarding Flow</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 font-heading text-white">
            How It Works
          </h2>
          <p className="text-gray-400 text-xs font-semibold mt-2">
            Follow our step-by-step guideline to convert your vehicle into a live passive asset.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative pl-10"
              >
                {/* Step Marker Node */}
                <span className="absolute -left-5.5 top-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#0a0f1d] border-2 border-yellow-400/80 text-yellow-400 shadow-yellow-glow">
                  <Icon size={16} />
                </span>

                {/* Left Side Label (Desktop Only) */}
                <div className="absolute -left-36 top-2 text-right w-24 hidden md:block select-none">
                  <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                    {s.step}
                  </span>
                </div>

                {/* Card Container */}
                <Card
                  variant="glass"
                  className="bg-[#111827]/40 border border-white/5 p-5 rounded-[20px] text-left hover:border-yellow-400/20 hover:bg-[#111827]/60 transition-all max-w-xl"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400/80 block md:hidden mb-1">
                    {s.step}
                  </span>
                  <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed mt-2.5">
                    {s.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksTimeline;
