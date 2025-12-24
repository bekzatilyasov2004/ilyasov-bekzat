"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiC,
} from "react-icons/si";

const ICONS = [
  { id: "js", Icon: SiJavascript, color: "#f0db4f" },
  { id: "ts", Icon: SiTypescript, color: "#3178c6" },
  { id: "py", Icon: SiPython, color: "#3776ab" },
  { id: "react", Icon: SiReact, color: "#61dafb" },
  { id: "html", Icon: SiHtml5, color: "#e34f26" },
  { id: "css", Icon: SiCss3, color: "#1572b6" },
  { id: "node", Icon: SiNodedotjs, color: "#3c873a" },
  { id: "c", Icon: SiC, color: "#283593" },
];

export default function RotatingLanguages() {
  return (
    <div className="w-[400px] h-[400px] relative flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full border border-white/20" />

      {ICONS.map((item, index) => {
        const angle = (index / ICONS.length) * Math.PI * 2;
        const radius = 150;

        return (
          <motion.div
            key={item.id}
            initial={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              scale: 1,
            }}
            animate={{
              x: Math.cos(angle + Math.PI * 2) * radius,
              y: Math.sin(angle + Math.PI * 2) * radius,

              // ⭐ KETMA-KET kattalashib-kichrayish
              scale: [1, 1.6, 0.7, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",

              // har bir icon navbatma-navbat animatsiya bo‘lishi
              scale: {
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: index * 0.3, // ⭐ ICONLAR KETMA-KET puls effekti
              },
            }}
            className="absolute"
          >
            <item.Icon size={42} color={item.color} />
          </motion.div>
        );
      })}
    </div>
  );
}
