import * as React from 'react';
import { cn } from '../../utils/cn';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** optional additional classes */
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        'max-w-7xl mx-auto px-6 py-12 md:py-20',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
