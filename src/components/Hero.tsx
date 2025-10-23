"use client";
import { motion } from "framer-motion";

export default function Hero({ onExplore }: { onExplore?: () => void }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden track-lines">
      {/* drifting gradient / speed lines */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02), transparent 30%)" }}
        animate={{ x: ["0%", "6%", "0%"], y: ["0%", "-4%", "0%"] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <div className="relative z-10 container px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50, skewY: 2 }}
          animate={{ opacity: 1, y: 0, skewY: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl font-display font-extrabold leading-tight"
        >
          <span className="block heading-accent text-white">CpE Fair 2024</span>
          <span className="block text-cpeRed">THE GRAND PRIX</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-5 text-lg text-white/75 max-w-2xl mx-auto">
          A high-speed celebration of engineering and competition — ball games, academics, board games, talents and e-sports.
        </motion.p>

        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onExplore} className="btn-primary">
            Explore Events
          </button>
          <a href="#events" className="btn-ghost text-white/90">View Events</a>
        </motion.div>
      </div>

      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
