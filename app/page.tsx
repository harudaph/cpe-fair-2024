"use client";

import React from "react";
import Hero from "../src/components/Hero";
import EventListing from "../src/components/EventListing";
import EventSection from "../src/components/EventSection";
import RegistrationDialog from "../src/components/RegistrationDialog";
import { Category } from "../src/types";

const DATA = [
  {
    id: "ball",
    title: "Ball Games",
    description: "Competitive team-based ball games representing speed and teamwork.",
    subs: ["Basketball", "Volleyball", "Badminton"],
  },
  {
    id: "academics",
    title: "Academics",
    description: "Intellectual competitions and quizzes to test knowledge.",
    subs: [
      "Quiz Bee (General Info & History)",
      "Quiz Bee (General Engineering & Sciences)",
      "Quiz Bee (Programming)",
      "Quiz Bee (Circuits & Design)",
    ],
  },
  {
    id: "board",
    title: "Board Games",
    description: "Strategic board and tabletop games.",
    subs: ["Game of the General", "Chess", "Rubik's Cube", "Scrabble"],
  },
  {
    id: "talents",
    title: "Talents",
    description: "Showcase your talents on stage — music, dance, and more.",
    subs: ["The Clash", "Battle of the Bands", "CpE Best Dance Crew", "Mr. & Ms. CpE"],
  },
  {
    id: "esports",
    title: "E-sports",
    description: "Competitive gaming tournaments across top titles.",
    subs: ["Mobile Legends", "League of Legends", "Valorant"],
  },
];

export default function Page() {
  const [filter, setFilter] = React.useState<Category>("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");

  const handleRegister = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const itemsToShow = React.useMemo(
    () => (filter === "all" ? DATA : DATA.filter((d) => d.id === filter)),
    [filter]
  );

  return (
    <>
      {/* Hero Section */}
      <Hero
        onExplore={() => {
          const el = document.getElementById("events");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      {/* Event Listing Section */}
      <section id="events" className="pt-12 pb-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold heading-accent mb-2">Events Lineup</h2>
          <p className="text-sm text-white/70 mb-4">
            Select a category to filter — think of this like the race grid.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full ${
                filter === "all" ? "bg-red-600 text-white" : "bg-zinc-800 text-gray-400"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            {DATA.map((d) => (
              <button
                key={d.id}
                className={`px-4 py-2 rounded-full ${
                  filter === d.id ? "bg-red-600 text-white" : "bg-zinc-800 text-gray-400"
                }`}
                onClick={() => setFilter(d.id as Category)}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {itemsToShow.map((ev) => (
              <div
                key={ev.id}
                className="bg-zinc-900 border border-white/10 rounded-lg p-4 flex flex-col justify-between hover:border-red-500 transition"
              >
                <div>
                  <h3 className="text-xl text-white font-semibold mb-2 cursor-pointer" onClick={() => setFilter(ev.id as Category)}>
                    {ev.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{ev.description}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    {ev.subs.length} Sub-Events
                  </p>
                </div>
                <button
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                  onClick={() => handleRegister(ev.title)}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 border-t border-white/6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-white/70">
            Front-end prototype for “CpE Fair 2024: The Grand Prix”. Backend integrations can be
            connected later.
          </p>
        </div>
      </section>

      {/* Registration Dialog */}
      <RegistrationDialog
        event={{
          id: "modal",
          title: modalTitle,
          description: "",
          subEvents: [],
          category: "",
          icon: "",
        }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          console.log("Registered:", data);
          setModalOpen(false);
        }}
      />
    </>
  );
}
