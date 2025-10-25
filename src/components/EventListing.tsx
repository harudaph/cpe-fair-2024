"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import RegistrationDialog from "./RegistrationDialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Event, Registration } from "../types";

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2025",
    date: "2025-11-15",
    time: "09:00 AM",
    location: "San Francisco Convention Center",
    description: "Join industry leaders and innovators for a day of inspiring talks, networking, and hands-on workshops about the future of technology.",
    category: "Technology",
    capacity: 500,
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    subEvents: [],
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    date: "2025-11-22",
    time: "10:00 AM",
    location: "New York Hilton Midtown",
    description: "Learn cutting-edge digital marketing strategies from industry experts. Perfect for marketers looking to elevate their skills.",
    category: "Marketing",
    capacity: 200,
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    subEvents: [],
  },
  // ...other events, same structure
];

interface EventListingProps {
  onRegister: (registration: Registration) => void;
}

export default function EventListing({ onRegister }: EventListingProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(mockEvents.map((e) => e.category)))];

  const filteredEvents =
    selectedCategory === "All" ? mockEvents : mockEvents.filter((e) => e.category === selectedCategory);

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleRegistrationComplete = (registration: Registration) => {
    onRegister(registration);
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-gray-900 text-3xl font-bold">Upcoming Events</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and register for amazing events. Network with professionals, learn new skills, and grow your career.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={event.imageUrl ?? ""}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="secondary">{event.category}</Badge>
                <div className="flex items-center gap-1 text-blue-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${event.price ?? 0}</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2">{event.title}</CardTitle>
              <CardDescription className="line-clamp-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {event.date
                    ? new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "TBA"}{" "}
                  at {event.time ?? "TBA"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{event.location ?? "TBA"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{event.capacity ?? 0} spots available</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleRegisterClick(event)}>
                Register Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Registration Dialog */}
      {selectedEvent && (
        <RegistrationDialog
          event={selectedEvent}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedEvent(null);
          }}
          onSubmit={handleRegistrationComplete}
        />
      )}
    </div>
  );
}
