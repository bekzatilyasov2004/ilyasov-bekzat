// app/not-found.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
     <div className="min-h-screen w-full flex items-center justify-center bg-black text-white py-20 relative overflow-hidden px-4">

      {/* Background soft blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center text-center p-8  rounded-3xl shadow-xl max-w-xl"
      >

        <div>
          <img
            src="/404.svg"
            alt="Not Found Illustration"
            height={350}
            width={350}
            className="mx-auto mb-6"
          />
        </div>

       <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Link
    href="/"
    className="relative inline-block px-6 py-3 font-semibold text-white rounded-lg overflow-hidden group"
  >
    {/* Background gradient slide */}
    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-70 group-hover:opacity-100 transition-all duration-500 blur-lg"></span>
    
    {/* Link text */}
    <span className="relative z-10">Go Back Home</span>

    {/* Glow effect */}
    <span className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(131, 58, 180,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
  </Link>
</motion.div>
      </motion.div>
    </div>
  );
}
