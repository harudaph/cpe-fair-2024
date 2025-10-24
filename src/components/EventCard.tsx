"use client";
import { motion } from "framer-motion";

export default function EventCard({
  title,
  description,
  subEvents,
  onRegister,
  learnMoreHref,
}: {
  title: string;
  description: string;
  subEvents?: string[];
  onRegister?: () => void;
  learnMoreHref?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="card"
      role="group"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="text-xs px-2 py-1 rounded-md bg-white/6 text-white/70">
            Event
          </div>
        </div>

        <p className="text-sm text-white/70">{description}</p>

        {subEvents && subEvents.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {subEvents.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-1 bg-white/6 rounded-md text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onRegister}
            className="bg-cpeOrange text-black px-3 py-2 rounded-md font-semibold shadow-glow-orange transition-transform hover:scale-[1.03]"
          >
            Register
          </button>

          {learnMoreHref ? (
            <a
              href={learnMoreHref}
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Learn more →
            </a>
          ) : (
            <span className="text-xs text-white/40 cursor-not-allowed">
              Learn more →
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
