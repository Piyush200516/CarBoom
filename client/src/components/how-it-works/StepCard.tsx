import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { cn } from '../../utils/cn';

export interface StepCardProps {
  number: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  colorFrom: string; // Tailwind gradient start (e.g., 'from-yellow-400')
  colorTo: string;   // Tailwind gradient end (e.g., 'to-amber-500')
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, description, Icon, colorFrom, colorTo }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true }}
    >
      <Card variant="glass" hoverEffect className={cn('p-8 text-center flex flex-col items-center')}>
        <div
          className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center mb-6',
            `bg-gradient-to-r ${colorFrom} ${colorTo}`,
            'text-white'
          )}
        >
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-wider text-[#FACC15] mb-2">
          Step {number}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 text-xs font-semibold leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
};

export default StepCard;
