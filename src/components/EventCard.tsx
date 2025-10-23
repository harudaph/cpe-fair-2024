"use client";
import { motion } from "framer-motion";

export default function EventCard({
  title,
  description,
  subEvents,
  onRegister,
}: {
  title: string;
  description: string;
  subEvents?: string[];
  onRegister?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="card"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="text-xs px-2 py-1 rounded-md bg-white/6 text-white/70">Event</div>
        </div>

        <p className="text-sm text-white/70">{description}</p>

        {subEvents && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {subEvents.map((s) => (
                <span key={s} className="text-xs px-2 py-1 bg-white/6 rounded-md">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <button onClick={onRegister} className="bg-cpeOrange text-black px-3 py-2 rounded-md font-semibold shadow-glow-orange">Register</button>
          <a className="text-xs text-white/60">Learn more →</a>
        </div>
      </div>
    </motion.div>
  );
}
