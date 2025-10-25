"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import RegistrationDialog from "./components/RegistrationDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Trophy, LayoutDashboard } from "lucide-react";

// Types
export interface SubEvent {
  name: string;
  description?: string;
  emoji?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  subEvents: SubEvent[];
  icon?: React.ComponentType;
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  subEvent: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearLevel: string;
  registeredAt?: string; // optional for dashboard compatibility
}

// Sample event data
const DATA: Event[] = [
  {
    id: "ball",
    title: "Ball Games",
    description: "Competitive team-based ball games representing speed and teamwork.",
    category: "sports",
    subEvents: [{ name: "Basketball" }, { name: "Volleyball" }, { name: "Badminton" }],
  },
  {
    id: "academics",
    title: "Academics",
    description: "Intellectual competitions and quizzes to test knowledge.",
    category: "academics",
    subEvents: [
      { name: "Quiz Bee (General Info & History)" },
      { name: "Quiz Bee (General Engineering & Sciences)" },
      { name: "Quiz Bee (Programming)" },
      { name: "Quiz Bee (Circuits & Design)" },
    ],
  },
  {
    id: "board",
    title: "Board Games",
    description: "Strategic board and tabletop games.",
    category: "games",
    subEvents: [{ name: "Game of the General" }, { name: "Chess" }, { name: "Rubik's Cube" }, { name: "Scrabble" }],
  },
  {
    id: "talents",
    title: "Talents",
    description: "Showcase your talents on stage — music, dance, and more.",
    category: "talents",
    subEvents: [
      { name: "The Clash" },
      { name: "Battle of the Bands" },
      { name: "CpE Best Dance Crew" },
      { name: "Mr. & Ms. CpE" },
    ],
  },
  {
    id: "esports",
    title: "E-sports",
    description: "Competitive gaming tournaments across top titles.",
    category: "esports",
    subEvents: [{ name: "Mobile Legends" }, { name: "League of Legends" }, { name: "Valorant" }],
  },
];

type TabValue = "events" | "dashboard";

export default function Page() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState<TabValue>("events");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");

  // Safe scroll function using direct DOM query
  const handleExploreClick = useCallback(() => {
    const element = document.getElementById("events");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Open modal for sub-event registration
  const handleRegister = (event: Event, subEventName: string) => {
    setModalTitle(`${event.title} - ${subEventName}`);
    setModalOpen(true);
  };

  return React.createElement(
    "div",
    { className: "min-h-screen bg-black text-white" },

    // Tabs
    React.createElement(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v as TabValue),
        className: "w-full",
      },

      // Tabs header
      React.createElement(
        "div",
        { className: "fixed top-4 left-1/2 -translate-x-1/2 z-50" },
        React.createElement(
          TabsList,
          { className: "bg-black/80 backdrop-blur-md border border-white/10 rounded-md" },
          React.createElement(
            TabsTrigger,
            { value: "events", className: "flex items-center gap-2 px-3 py-1 hover:bg-red-500 transition-colors" },
            React.createElement(Trophy, { className: "w-4 h-4" }),
            "Events"
          ),
          React.createElement(
            TabsTrigger,
            { value: "dashboard", className: "flex items-center gap-2 px-3 py-1 hover:bg-red-500 transition-colors" },
            React.createElement(LayoutDashboard, { className: "w-4 h-4" }),
            "Dashboard",
            registrations.length > 0 &&
              React.createElement(
                "span",
                { className: "ml-1 px-2 py-0.5 bg-red-600 rounded-full text-xs" },
                registrations.length
              )
          )
        )
      ),

      // Events tab content
      React.createElement(
        TabsContent,
        { value: "events", className: "mt-0 pt-20" },
        React.createElement(Hero, { onExplore: handleExploreClick }),
        React.createElement(
          "div",
          { id: "events", className: "container mx-auto px-6 py-12" },
          React.createElement(
            "div",
            { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
            DATA.map((ev) =>
              React.createElement(
                "div",
                {
                  key: ev.id,
                  className:
                    "bg-zinc-900 border border-white/10 rounded-lg p-4 flex flex-col justify-between hover:border-red-500 transition",
                },
                React.createElement(
                  "div",
                  null,
                  React.createElement("h3", { className: "text-xl text-white font-semibold mb-2" }, ev.title),
                  React.createElement("p", { className: "text-gray-400 text-sm mb-2" }, ev.description),
                  React.createElement(
                    "p",
                    { className: "text-gray-500 text-xs uppercase tracking-wide" },
                    ev.subEvents.length,
                    " Sub-Events"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "mt-4 flex flex-col gap-2" },
                  ev.subEvents.map((sub) =>
                    React.createElement(
                      "button",
                      {
                        key: sub.name,
                        className: "w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded",
                        onClick: () => handleRegister(ev, sub.name),
                      },
                      "Register ",
                      sub.name
                    )
                  )
                )
              )
            )
          )
        )
      ),

      // Dashboard tab content
      React.createElement(
        TabsContent,
        { value: "dashboard", className: "mt-0 pt-20" },
        React.createElement(Dashboard, {
          registrations,
          setRegistrations: (regs: Registration[]) => setRegistrations(regs),
        })
      )
    ),

    // Registration dialog
    React.createElement(RegistrationDialog, {
      event: {
        id: "modal",
        title: modalTitle,
        description: "",
        subEvents: [],
        category: "",
        icon: "",
      },
      isOpen: modalOpen,
      onClose: () => setModalOpen(false),
      onSubmit: (data: Registration) => {
        setRegistrations((prev) => [...prev, data]);
        setModalOpen(false);
      },
    })
  );
}
