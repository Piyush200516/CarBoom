// src/components/safety/SafetyFeatures.tsx
import React from "react";
import { 
  UserCheck, 
  Fingerprint, 
  CreditCard, 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  QrCode,
  ShieldQuestion
} from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { safetyFeatures } from "../../data/safety";

// Dynamic icon mapper
const iconMap: Record<string, React.ComponentType<any>> = {
  UserCheck,
  Fingerprint,
  CreditCard,
  ShieldAlert,
  PhoneCall,
  MapPin,
  QrCode
};

export const SafetyFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-4 py-2 rounded-full">
            Our Shield
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Why CarBoom is Safe
          </h2>
          <p className="text-gray-500 font-semibold text-xs sm:text-sm">
            We've integrated state-of-the-art security measures at every touchpoint. 
            From initial registration to the end of the trip, you are protected.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feat, idx) => {
            const IconComponent = iconMap[feat.icon] || ShieldQuestion;
            
            return (
              <Card
                key={idx}
                variant="glass-light"
                hoverEffect
                className="relative overflow-hidden border border-gray-100 flex flex-col justify-between h-full p-8 text-left transition-all hover:border-yellow-400/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {/* Coming Soon indicator */}
                {feat.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-700 border-yellow-400/20 text-[9px] font-black py-0.5 px-2 uppercase tracking-wider">
                      Coming Soon
                    </Badge>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-[16px] bg-yellow-400/10 flex items-center justify-center text-yellow-600 shadow-sm border border-yellow-400/25">
                    <IconComponent className="w-6 h-6" strokeWidth={2} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-gray-900 text-base leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SafetyFeatures;
