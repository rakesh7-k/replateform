'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
}

export default function AnimatedCounter({ endValue, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current!);
  }, [endValue, duration]);

  return <span>{count.toLocaleString()}</span>;
}
