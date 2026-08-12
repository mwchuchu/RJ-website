import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatThousands?: boolean;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
  formatThousands = true,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out formula for smooth luxury deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * value;
      
      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  const formattedNumber = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toString();

  const finalFormatted = formatThousands
    ? formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : formattedNumber;

  return (
    <span className={`animated-num-counter ${className}`}>
      {prefix}{finalFormatted}{suffix}
    </span>
  );
};
