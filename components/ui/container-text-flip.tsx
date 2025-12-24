"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { motion } from "framer-motion"; // motion/react o‘rniga framer-motion ishlatish tavsiya qilinadi
import { cn } from "../../lib/utils";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export const ContainerTextFlip: React.FC<ContainerTextFlipProps> = ({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}) => {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30; // 30px padding
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.p
      layout
      animate={{ width }}
      transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center font-bold text-black md:text-5xl dark:text-white",
        "bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db] dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        className
      )}
      key={currentWordIndex}
    >
      <motion.div
        className={cn("inline-block", textClassName)}
        ref={textRef}
      >
        {words[currentWordIndex].split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.p>
  );
};
