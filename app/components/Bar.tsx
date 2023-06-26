'use client';

import { useEffect, useRef, useState } from 'react';
import { MediaQuery } from '../types';

interface BarProps {
  height?: number;
  barCount: number;
  isSwaping: boolean;
  isComparing: boolean;
  activeMediaQuery: MediaQuery;
}

const getMarginBasedOnBarCount = (barCount: number): number => {
  if (barCount <= 20) return 0.3;
  if (barCount <= 30) return 0.2;
  if (barCount <= 40) return 0.1;
  if (barCount <= 60) return 0.1;
  if (barCount <= 70) return 0.1;
  return 0.05;
};

export default function Bar({
  height = 5,
  barCount,
  isSwaping = false,
  isComparing = false,
  activeMediaQuery,
}: BarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [marginx, setMarginx] = useState<number>(0);
  const barColors = {
    swaping: 'hsl(315.75 70.196% 50%)',
    comparing: 'hsl(262.35 80.315% 50%)',
    neutral: 'hsl(174 70% 40%)',
  };
  const bgColor = isSwaping ? barColors.swaping : isComparing ? barColors.comparing : barColors.neutral;

  useEffect(() => {
    const marginBasedOnBarCount = getMarginBasedOnBarCount(barCount);
    const marginx =
      marginBasedOnBarCount +
        {
          'smaller than sm': 0,
          sm: 0.02,
          md: 0.04,
          lg: 0.08,
          xl: 0.08,
          xxl: 0.08,
        }[activeMediaQuery ?? 'smaller than sm'] ?? 0;

    setMarginx(barCount < 170 ? marginx : 0.07);
  }, [activeMediaQuery, barCount]);

  return (
    <div
      className={`w-3 bg-accent rounded-md`}
      style={{
        height: `${height}rem`,
        margin: `0 ${marginx}rem`,
        backgroundColor: bgColor,
      }}
      ref={barRef}
    ></div>
  );
}
