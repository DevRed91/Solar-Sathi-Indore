'use client';
import React, { useEffect, useState } from 'react';

type NumberAnimationProps = {
  value: string;
};

const CHARS = '0123456789'.split('');

const NumberAnimation: React.FC<NumberAnimationProps> = ({ value }) => {
  const [display, setDisplay] = useState<string[]>(() =>
    Array(value.length).fill(' ')
  );

  useEffect(() => {
    let intervals: NodeJS.Timeout[] = [];
    let timeout: NodeJS.Timeout;
    const replayInterval: NodeJS.Timeout = setInterval(startAnimation, 120000);

    function startAnimation() {
      setDisplay(Array(value.length).fill(' '));

      intervals.forEach(clearInterval);
      clearTimeout(timeout);
      intervals = [];

      value.split('').forEach((_, index) => {
        const interval = setInterval(
          () => {
            setDisplay((prev) => {
              const copy = [...prev];
              copy[index] = CHARS[Math.floor(Math.random() * CHARS.length)];
              return copy;
            });
          },
          100 + index * 30
        );
        intervals.push(interval);
      });

      timeout = setTimeout(() => {
        intervals.forEach(clearInterval);
        setDisplay(value.split(''));
      }, 5000);
    }

    startAnimation();

    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(timeout);
      clearInterval(replayInterval);
    };
  }, [value, value.length]);

  return (
    <div className="relative flex justify-center space-x-2 before:absolute before:top-1/2 before:h-1.5 before:w-full before:bg-[#020319]">
      {display.map((char, i) => (
        <div
          key={i}
          className="font-barlow-condensed flex h-[200px] w-[160px] items-center justify-center bg-[linear-gradient(180deg,_#020319_0%,_#373B86_50%,_#020319_100%)] text-[140px] font-bold text-white"
        >
          <span className="animate-flip">{char}</span>
        </div>
      ))}
    </div>
  );
};

export default NumberAnimation;
