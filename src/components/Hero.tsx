"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {
  onExplore?: () => void;
};

export default function Hero({ onExplore }: Props) {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[80vh] md:min-h-[88vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background image (full bleed) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('hero-gt.png')" }}
        initial={{ scale: 1.02 }}
        animate={{ scale: [1.02, 1.00, 1.02] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/50 to-black/80" />

      {/* drifting soft radial layer (your original effect) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-5"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.02), transparent 30%)",
          mixBlendMode: "overlay",
        }}
        animate={{ x: ["0%", "6%", "0%"], y: ["0%", "-4%", "0%"] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <div className="relative z-10 container px-6">
        {/* Top pill buttons */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-600 text-white rounded-full px-4 py-1 shadow-md">
              <span className="text-sm font-semibold">Events</span>
            </div>

            <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] rounded-full px-4 py-1 border border-gray-700 text-white">
              <span className="text-sm">Dashboard</span>
            </div>
          </div>

          <div className="mt-1">
            <div className="bg-[rgba(255,255,255,0.02)] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.03)] text-gray-200 inline-flex items-center gap-2">
              <span className="text-sm">⚡</span>
              <span className="text-sm">2024 EDITION</span>
            </div>
          </div>
        </div>

        {/* Headline + description */}
        <motion.h1
          initial={{ opacity: 0, y: 50, skewY: 2 }}
          animate={{ opacity: 1, y: 0, skewY: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-12 text-4xl md:text-6xl lg:text-[72px] font-display font-extrabold leading-tight"
        >
          <span className="block tracking-widest text-sm md:text-base uppercase text-white/90">
            CPE FAIR 2024
          </span>

          {/* Rainbow text — inline background required for multi-stop gradient */}
          <span
            className="block bg-clip-text text-transparent"
            style={{
              background:
                "linear-gradient(90deg,#ff3b3b 0%,#ff8a00 18%,#ffd400 34%,#13d54f 50%,#0066ff 68%,#7a2bff 84%)",
              WebkitBackgroundClip: "text",
            }}
          >
            <span className="text-3xl md:text-6xl lg:text-[96px]">THE GRAND PRIX</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-base md:text-lg text-white/75 max-w-3xl mx-auto"
        >
          A high-speed celebration of engineering and competition — ball games, academics,
          board games, talents and e-sports.
        </motion.p>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-white font-medium shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Explore Events
          </button>

          <a
            href="#events"
            className="inline-flex items-center justify-center rounded-md px-5 py-3 text-white/90 bg-white/5 hover:bg-white/6"
          >
            View Events
          </a>
        </motion.div>
      </div>

      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* small down chevron for affordance */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/80">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 16l-6-6h12l-6 6z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
