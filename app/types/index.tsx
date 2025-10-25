// src/types.ts

// Sub-events within an event
export interface SubEvent {
  name: string;
  description?: string;
  emoji?: string;
}

// Main event structure
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  subEvents: SubEvent[];
  icon?: string;

  // Optional fields for EventListing usage
  date?: string;       // e.g., "2025-11-15"
  time?: string;       // e.g., "09:00 AM"
  location?: string;   // e.g., "San Francisco Convention Center"
  price?: number;      // e.g., 299
  imageUrl?: string;   // e.g., URL to event image
  capacity?: number;   // e.g., 500
}

// Registration data submitted by a user
export interface Registration {
  id: string; // unique registration ID
  eventId: string;
  eventTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearLevel: string;
  subEvent: string;
  registeredAt: string; // ISO date string
}

// Optional: category type for filtering EventSection
export type Category =
  | "all"
  | "ball"
  | "academics"
  | "board"
  | "talents"
  | "esports"
  | "Technology"
  | "Marketing"
  | "Networking"
  | "Design"
  | "Business"
  | "Sports"
  | "Academic"
  | "Strategy"
  | "Entertainment"
  | "Gaming";
