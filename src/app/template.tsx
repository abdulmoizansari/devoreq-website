"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#0EA5E9] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />
      
      <motion.div
        className="fixed inset-0 z-[101] bg-[#F8FAFC] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
