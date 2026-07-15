import React from "react";
import { motion } from "framer-motion";
import { Tag, Check, Copy } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { useToast } from "../../../components/ui/Toast";

interface OfferItem {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  gradient: string;
  badge: string;
}

const OFFERS: OfferItem[] = [
  {
    id: "off1",
    title: "Monsoon Drive Special",
    description: "Get flat 15% off on your first SUV rental of the season. Valid this month.",
    code: "MONSOON15",
    discount: "15% OFF",
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    badge: "Limited Time"
  },
  {
    id: "off2",
    title: "Weekend Electric Charge",
    description: "Zero charging fees and 20% off all high-end electric vehicles for Saturday trips.",
    code: "ELECTRIC20",
    discount: "20% OFF",
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    badge: "Weekend Only"
  },
  {
    id: "off3",
    title: "Invite a Friend Reward",
    description: "Refer your friend. They get ₹500 off, and you earn ₹500 credits after their first trip.",
    code: "BOOMREFER",
    discount: "₹500 FREE",
    gradient: "from-blue-500/20 via-indigo-600/10 to-transparent",
    badge: "Referral"
  }
];

export const SpecialOffers: React.FC = () => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast("Coupon Copied!", {
      description: `Promo code ${code} is copied to your clipboard.`,
      type: "success"
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="border-b border-white/5 pb-4 mb-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Exclusive Deals</span>
        <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-0.5">Special Offers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS.map((offer, idx) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group"
          >
            <Card
              variant="glass"
              className={`relative overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all duration-300 p-6 bg-gradient-to-br ${offer.gradient} h-full flex flex-col justify-between`}
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-yellow-400 text-black font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    {offer.badge}
                  </span>
                  <span className="text-2xl font-black text-white">{offer.discount}</span>
                </div>

                {/* Info */}
                <h3 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-yellow-400 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Promo Code Copy Action */}
              <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl p-2.5">
                <div className="flex items-center gap-2">
                  <Tag size={13} className="text-yellow-400" />
                  <span className="text-xs font-black tracking-widest text-white/90 font-mono">
                    {offer.code}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(offer.code, offer.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-yellow-400 hover:text-black text-gray-400 transition cursor-pointer"
                  title="Copy code"
                >
                  {copiedId === offer.id ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
