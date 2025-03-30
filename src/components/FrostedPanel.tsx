
import React from 'react';
import { cn } from '@/lib/utils';

interface FrostedPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

const FrostedPanel = ({ 
  children, 
  className, 
  intensity = 'medium',
  ...props 
}: FrostedPanelProps) => {
  const getBlurIntensity = () => {
    switch (intensity) {
      case 'light': return 'backdrop-blur-sm bg-white/30';
      case 'heavy': return 'backdrop-blur-xl bg-white/50';
      case 'medium':
      default: return 'backdrop-blur-lg bg-white/40';
    }
  };

  return (
    <div 
      className={cn(
        getBlurIntensity(),
        'border border-white/30 shadow-lg rounded-2xl transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default FrostedPanel;
