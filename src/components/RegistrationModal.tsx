"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function RegistrationModal({ open, title, onClose }: { open: boolean; title?: string; onClose: () => void; }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative w-full max-w-md bg-cpeBlack/95 p-6 rounded-xl border border-white/6">
        <h3 className="text-lg font-semibold mb-2">Register for {title}</h3>
        <p className="text-sm text-white/70 mb-4">Fill in your details to register.</p>

        <div className="flex flex-col gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-md px-3 py-2 bg-white/5 text-white" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-md px-3 py-2 bg-white/5 text-white" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded-md border border-white/10 text-white/80">Cancel</button>
          <button onClick={() => { console.log("Register payload:", { event: title, name, email }); alert("Registration submitted (frontend-only)."); onClose(); }} className="px-4 py-2 rounded-md bg-cpeRed text-white font-semibold">Submit</button>
        </div>
      </motion.div>
    </div>
  );
}
