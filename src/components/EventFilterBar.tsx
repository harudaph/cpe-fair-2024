"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

export type Category = "all" | "ball" | "academics" | "board" | "talents" | "esports";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ball", label: "Ball Games" },
  { key: "academics", label: "Academics" },
  { key: "board", label: "Board Games" },
  { key: "talents", label: "Talents" },
  { key: "esports", label: "E-sports" },
];

type Props = {
  active: Category;
  onChange: (c: Category) => void;
};

export default function EventFilterBar({ active, onChange }: Props) {
  // typed ref array for buttons
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    // ensure the refs array length doesn't grow indefinitely
    buttonRefs.current = buttonRefs.current.slice(0, CATEGORIES.length);
  }, []);

  const handleKeyActivate = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, key: Category) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(key);
      }
    },
    [onChange]
  );

  const handleKeyNavigation = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const max = CATEGORIES.length - 1;
    let nextIndex: number | null = null;

    if (e.key === "ArrowRight") nextIndex = idx === max ? 0 : idx + 1;
    else if (e.key === "ArrowLeft") nextIndex = idx === 0 ? max : idx - 1;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = max;

    if (nextIndex !== null) {
      e.preventDefault();
      const btn = buttonRefs.current[nextIndex];
      btn?.focus();
    }
  }, []);

  return (
    <div className="flex justify-center mb-10">
      <div
        role="tablist"
        aria-label="Event categories"
        className="relative inline-flex items-center rounded-xl bg-[rgba(255,255,255,0.02)] px-3 py-2 border border-[rgba(255,255,255,0.03)] shadow-sm gap-2"
      >
        {CATEGORIES.map((c, idx) => {
          const isActive = active === c.key;

          return (
            <div key={c.key} className="relative">
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-red-600 z-0 pointer-events-none"
                  aria-hidden
                />
              )}

              <motion.button
                /* --- FIXED ref callback: block body -> returns void --- */
                ref={(el: HTMLButtonElement | null) => {
                  buttonRefs.current[idx] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={isActive ? `panel-${c.key}` : undefined}
                id={`tab-${c.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(c.key)}
                onKeyDown={(e) => {
                  handleKeyActivate(e, c.key);
                  handleKeyNavigation(e, idx);
                }}
                whileTap={{ scale: 0.98 }}
                className={classNames(
                  "relative z-10 px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-red-400 transition",
                  {
                    "text-black": isActive,
                    "text-white/90 hover:bg-white/5": !isActive,
                  }
                )}
              >
                {c.label}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
