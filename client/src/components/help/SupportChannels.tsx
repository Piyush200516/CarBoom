// src/components/help/SupportChannels.tsx

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone, Clipboard } from "lucide-react";
import { Button } from "../../components/ui/Button";

interface Channel {
  title: string;
  detail: string;
  Icon: React.ElementType;
  cta: string;
  link?: string; // optional, could be mailto or tel
  comingSoon?: boolean;
}

const channels: Channel[] = [
  {
    title: "Live Chat",
    detail: "Coming Soon",
    Icon: MessageSquare,
    cta: "Chat Now",
    comingSoon: true,
  },
  {
    title: "Email Support",
    detail: "support@carboom.in",
    Icon: Mail,
    cta: "Send Email",
    link: "mailto:support@carboom.in",
  },
  {
    title: "Phone Support",
    detail: "+91-9876543210",
    Icon: Phone,
    cta: "Call Us",
    link: "tel:+919876543210",
  },
  {
    title: "WhatsApp",
    detail: "Coming Soon",
    Icon: Clipboard,
    cta: "WhatsApp",
    comingSoon: true,
  },
];

export const SupportChannels: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Support Channels
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((ch, idx) => (
            <motion.article
              key={ch.title}
              className="flex flex-col items-center p-6 text-center glassmorphism-light rounded-xl shadow-lg hover:shadow-yellow-glow-hover transition-shadow"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <ch.Icon className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                {ch.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {ch.detail}
              </p>
              {ch.comingSoon ? (
                <Button variant="outline" size="sm" disabled>
                  {ch.cta} (Soon)
                </Button>
              ) : (
                <a href={ch.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm">
                    {ch.cta}
                  </Button>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
