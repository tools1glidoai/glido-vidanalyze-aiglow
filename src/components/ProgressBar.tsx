
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const ProgressBar = ({ 
  progress, 
  className, 
  showPercentage = false,
  size = 'md',
  animate = true
}: ProgressBarProps) => {
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-3';
      case 'md':
      default: return 'h-2';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('progress-container', getHeight())}>
        <Progress
          value={progress}
          className={cn(
            'h-full',
            animate && 'transition-all duration-500 ease-out',
            size === 'sm' ? 'h-1' : size === 'lg' ? 'h-3' : 'h-2'
          )}
        />
      </div>
      {showPercentage && (
        <p className="text-xs text-right mt-1 text-glido-charcoal/70 font-medium">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
