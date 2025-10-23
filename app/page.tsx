"use client";
import React from "react";
import Hero from "../src/components/Hero";
import EventFilterBar, { Category } from "../src/components/EventFilterBar";
import EventCard from "../src/components/EventCard";
import RegistrationModal from "../src/components/RegistrationModal";

const DATA = [
  { id: "ball", title: "Ball Games", description: "Competitive team-based ball games representing speed and teamwork.", subs: ["Basketball","Volleyball","Badminton"] },
  { id: "academics", title: "Academics", description: "Intellectual competitions and quizzes to test knowledge.", subs: ["Quiz Bee (General Info & History)","Quiz Bee (General Engineering & Sciences)","Quiz Bee (Programming)","Quiz Bee (Circuits & Design)"] },
  { id: "board", title: "Board Games", description: "Strategic board and tabletop games.", subs: ["Game of the General","Chess","Rubik's Cube","Scrabble"] },
  { id: "talents", title: "Talents", description: "Showcase your talents on stage — music, dance, and more.", subs: ["The Clash","Battle of the Bands","CpE Best Dance Crew","Mr. & Ms. CpE"] },
  { id: "esports", title: "E-sports", description: "Competitive gaming tournaments across top titles.", subs: ["Mobile Legends","League of Legends","Valorant"] },
];

export default function Page() {
  const [filter, setFilter] = React.useState<Category>("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");

  const handleRegister = (title: string) => { setModalTitle(title); setModalOpen(true); };

  const itemsToShow = React.useMemo(() => filter === "all" ? DATA : DATA.filter(d => d.id === filter), [filter]);

  return (
    <>
      <Hero onExplore={() => window.scrollTo({ top: 700, behavior: "smooth" })} />
      <section id="events" className="pt-12 pb-24">
        <div className="container">
          <h2 className="text-3xl font-semibold heading-accent mb-2">Events Lineup</h2>
          <p className="text-sm text-white/70 mb-4">Select a category to filter — think of this like the race grid.</p>

          <EventFilterBar active={filter} onChange={(c) => setFilter(c)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {itemsToShow.map(ev => (
              <EventCard key={ev.id} title={ev.title} description={ev.description} subEvents={ev.subs} onRegister={() => handleRegister(ev.title)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-white/6">
        <div className="container text-center">
          <p className="text-sm text-white/70">Front-end prototype for “CpE Fair 2024: The Grand Prix”. Backend integrations can be connected later.</p>
        </div>
      </section>

      <RegistrationModal open={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)} />
    </>
  );
}
