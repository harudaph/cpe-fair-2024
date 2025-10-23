"use client";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-14 rounded-xl border-2 border-white/60 flex items-start justify-center p-1">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-2 h-2 rounded-full bg-white" />
        </div>
        <span className="text-xs text-white/70">Scroll</span>
      </div>
    </div>
  );
}
