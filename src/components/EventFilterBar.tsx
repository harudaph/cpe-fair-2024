"use client";
import { motion } from "framer-motion";
import classNames from "classnames";
import React from "react";

export type Category = "all" | "ball" | "academics" | "board" | "talents" | "esports";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ball", label: "Ball Games" },
  { key: "academics", label: "Academics" },
  { key: "board", label: "Board Games" },
  { key: "talents", label: "Talents" },
  { key: "esports", label: "E-sports" },
];

export default function EventFilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void; }) {
  return (
    <div className="my-6">
      <div className="flex gap-3 flex-wrap">
        {CATEGORIES.map((c) => {
          const activeCls = active === c.key;
          return (
            <motion.button
              key={c.key}
              onClick={() => onChange(c.key)}
              whileTap={{ scale: 0.98 }}
              className={classNames("px-4 py-2 rounded-full text-sm font-medium", {
                "bg-cpeRed text-black shadow-glow-red": activeCls,
                "bg-white/6 text-white/80": !activeCls,
              })}
            >
              {c.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
