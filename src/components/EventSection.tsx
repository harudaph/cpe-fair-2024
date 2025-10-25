"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Trophy,
  Brain,
  Dices,
  Music,
  Gamepad2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import RegistrationDialog from "./RegistrationDialog";
import { Event, Registration, SubEvent } from "../types";

// Event data
const eventData: Event[] = [
  {
    id: "1",
    title: "Ball Games",
    description:
      "Test your athletic prowess in classic ball sports with fast-paced matches.",
    category: "Sports",
    subEvents: [
      {
        name: "Basketball",
        description:
          "Experience intense 5v5 court action where teamwork and precision drive victory.",
        emoji: "🏀",
      },
      {
        name: "Volleyball",
        description:
          "Spike, block, and dig your way to glory in thrilling 6v6 team battles.",
        emoji: "🏐",
      },
      {
        name: "Badminton",
        description:
          "Master agility and finesse in fast-paced singles and doubles matches.",
        emoji: "🏸",
      },
    ],
    icon: "trophy",
  },
  {
    id: "2",
    title: "Academics",
    description:
      "Challenge your intellect in our comprehensive Quiz Bee covering multiple domains.",
    category: "Academic",
    subEvents: [
      {
        name: "General Info and History",
        description:
          "Test your knowledge of world events, culture, and historical milestones.",
        emoji: "📚",
      },
      {
        name: "General Engineering and Sciences",
        description:
          "Dive into engineering principles, physics, and scientific breakthroughs.",
        emoji: "⚙️",
      },
      {
        name: "Programming",
        description: "Solve algorithm challenges and showcase your coding expertise.",
        emoji: "💻",
      },
      {
        name: "Circuits and Design",
        description:
          "Demonstrate mastery in electronics, circuits, and system design concepts.",
        emoji: "🔌",
      },
    ],
    icon: "brain",
  },
  {
    id: "3",
    title: "Board Games",
    description:
      "Strategic thinking meets competitive gameplay in classic board games.",
    category: "Strategy",
    subEvents: [
      {
        name: "Game of the General",
        description:
          "Command your army in this tactical military strategy board game.",
        emoji: "⚔️",
      },
      {
        name: "Chess",
        description:
          "Outsmart your opponent in the ultimate game of strategy and intellect.",
        emoji: "♟️",
      },
      {
        name: "Rubik's Cube",
        description:
          "Race against time to solve the iconic 3D puzzle in record speed.",
        emoji: "🧩",
      },
      {
        name: "Scrabble",
        description:
          "Build words and maximize points in this classic vocabulary challenge.",
        emoji: "🔤",
      },
    ],
    icon: "dices",
  },
  {
    id: "4",
    title: "Talents",
    description: "Take center stage and showcase your unique talents to the world.",
    category: "Entertainment",
    subEvents: [
      {
        name: "The Clash",
        description: "Belt out your best performance in this solo singing showdown.",
        emoji: "🎤",
      },
      {
        name: "Battle of the Bands",
        description: "Rock the stage with your band and electrify the crowd.",
        emoji: "🎸",
      },
      {
        name: "CpE Best Dance Crew",
        description:
          "Showcase synchronized moves and creative choreography with your crew.",
        emoji: "💃",
      },
      {
        name: "Mr. and Ms. CpE",
        description:
          "Compete for the crown in this prestigious beauty and talent pageant.",
        emoji: "👑",
      },
    ],
    icon: "music",
  },
  {
    id: "5",
    title: "E-sports",
    description:
      "Enter the digital arena and prove your gaming dominance in top titles.",
    category: "Gaming",
    subEvents: [
      {
        name: "Mobile Legends",
        description:
          "Dominate the battlefield in this popular mobile MOBA tournament.",
        emoji: "📱",
      },
      {
        name: "League of Legends",
        description:
          "Prove your skills in the legendary PC MOBA championship.",
        emoji: "🎮",
      },
      {
        name: "Valorant",
        description:
          "Strategize and execute in this tactical 5v5 first-person shooter.",
        emoji: "🔫",
      },
    ],
    icon: "gamepad",
  },
];

// Icon helper
const getIcon = (iconName?: string) => {
  const icons: Record<string, typeof Trophy> = {
    trophy: Trophy,
    brain: Brain,
    dices: Dices,
    music: Music,
    gamepad: Gamepad2,
  };
  return icons[iconName ?? "trophy"] ?? Trophy;
};

// Category color helper
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Sports: "bg-gradient-to-br from-red-600 to-orange-600",
    Academic: "bg-gradient-to-br from-orange-600 to-amber-600",
    Strategy: "bg-gradient-to-br from-red-700 to-orange-700",
    Entertainment: "bg-gradient-to-br from-orange-500 to-red-500",
    Gaming: "bg-gradient-to-br from-red-500 to-orange-400",
  };
  return colors[category] ?? "bg-red-600";
};

interface EventSectionProps {
  onRegister: (registration: Registration) => void;
}

export default function EventSection({ onRegister }: EventSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleRegisterClick = (event: Event, subEvent?: SubEvent) => {
    setSelectedEvent(event);
    setSelectedSubEvent(subEvent ?? null);
    setIsDialogOpen(true);
  };

  const handleRegistrationComplete = (registration: Registration) => {
    onRegister(registration);
    setSelectedEvent(null);
    setSelectedSubEvent(null);
    setIsDialogOpen(false);
  };

  const filteredEvent =
    selectedCategory !== "All"
      ? eventData.find((e) => e.title === selectedCategory) ?? null
      : null;

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-white tracking-wide">COMPETE & CONQUER</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Event Categories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose your battlefield and register for the events that match your skills and passion
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 p-2 bg-zinc-900 border border-white/10 rounded-lg">
            <Button
              variant={selectedCategory === "All" ? "default" : "ghost"}
              onClick={() => setSelectedCategory("All")}
              className={
                selectedCategory === "All"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }
            >
              All
            </Button>
            {eventData.map((event) => (
              <Button
                key={event.id}
                variant={selectedCategory === event.title ? "default" : "ghost"}
                onClick={() => setSelectedCategory(event.title)}
                className={
                  selectedCategory === event.title
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              >
                {event.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        {selectedCategory === "All" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {eventData.map((event) => {
              const Icon = getIcon(event.icon);
              return (
                <Card
                  key={event.id}
                  className="bg-gradient-to-b from-zinc-900 to-black border-white/10 hover:border-red-500/50 transition-all duration-300 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-b from-zinc-900 to-black m-[1px] h-full flex flex-col">
                    <div className={`${getCategoryColor(event.category)} p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      </div>
                      <Icon className="w-12 h-12 text-white relative z-10" />
                    </div>
                    <CardHeader>
                      <Badge className="bg-red-600/20 text-red-400 border-red-500/30">{event.category}</Badge>
                      <CardTitle
                        onClick={() => setSelectedCategory(event.title)}
                        className="text-white group-hover:text-red-400 transition-colors cursor-pointer"
                      >
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-justify">{event.description}</CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          filteredEvent && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 ${getCategoryColor(
                    filteredEvent.category
                  )} rounded-full mb-4`}
                >
                  {(() => {
                    const Icon = getIcon(filteredEvent.icon);
                    return <Icon className="w-10 h-10 text-white" />;
                  })()}
                </div>
                <h3 className="text-white mb-2">{filteredEvent.title}</h3>
                <p className="text-gray-400 max-w-2xl mx-auto">{filteredEvent.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {(filteredEvent.subEvents || []).map((subEvent, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-b from-zinc-900 to-black border-white/10 hover:border-red-500/50 transition-all duration-300 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-b from-zinc-900 to-black m-[1px] h-full flex flex-col">
                      <div className={`${getCategoryColor(filteredEvent.category)} p-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                        <div className="relative z-10 flex items-center justify-center">
                          <span className="text-5xl">{subEvent.emoji ?? "🏆"}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white group-hover:text-red-400 transition-colors">{subEvent.name}</CardTitle>
                        {subEvent.description && (
                          <CardDescription className="text-gray-400 text-justify">{subEvent.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardFooter className="mt-auto">
                        <Button
                          onClick={() => handleRegisterClick(filteredEvent, subEvent)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white group/btn relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Register Now <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Registration Dialog */}
      {selectedEvent && (
        <RegistrationDialog
          event={selectedEvent}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedEvent(null);
            setSelectedSubEvent(null);
          }}
          onSubmit={handleRegistrationComplete}
          preSelectedSubEvent={selectedSubEvent?.name ?? ""}
        />
      )}
    </section>
  );
}
