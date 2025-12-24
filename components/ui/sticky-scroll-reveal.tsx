"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    id?: number;
    title: string;
    description: string;
    badges?: string[];
    level?: number;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  // ID bo'yicha tartiblash
  const sortedContent = [...content].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  const cardLength = sortedContent.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = sortedContent.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "rgba(15,23,42,0.6)",
    "rgba(30,27,75,0.6)",
    "rgba(31,41,55,0.6)",
    "rgba(17,24,39,0.6)",
    "rgba(15,76,129,0.6)",
    "rgba(225,29,72,0.6)",
    "rgba(245,158,11,0.6)",
    "rgba(16,185,129,0.6)",
    "rgba(99,102,241,0.6)",
    "rgba(139,92,246,0.6)",
    "rgba(244,114,182,0.6)",
    "rgba(20,184,166,0.6)",
    "rgba(249,115,22,0.6)",
    "rgba(34,211,238,0.6)",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: 'transparent',
      }}
      className="relative flex h-[30rem] justify-center no-scrollbar space-x-10 overflow-y-auto rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {sortedContent.map((item, index) => (
            <div key={item.id ?? index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg mt-4 text-slate-300 whitespace-pre-line"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-20 hidden h-60 w-96 overflow-hidden rounded-md bg-white lg:block",
          contentClassName,
        )}
      >
        
        {sortedContent[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};
