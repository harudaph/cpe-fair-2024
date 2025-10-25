"use client";

import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Event, Registration } from "../types";
import { Zap } from "lucide-react";

interface RegistrationDialogProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (registration: Registration) => void;
  preSelectedSubEvent?: string;
}

export default function RegistrationDialog({
  event,
  isOpen,
  onClose,
  onSubmit,
  preSelectedSubEvent,
}: RegistrationDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    yearLevel: "1st Year",
    subEvent: preSelectedSubEvent || "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.subEvent) {
      alert("Please select a sub-event");
      return;
    }

    const registration: Registration = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: event.id,
      eventTitle: event.title,
      ...formData,
      registeredAt: new Date().toISOString(),
    };

    onSubmit(registration);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      yearLevel: "1st Year",
      subEvent: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-orange-500 uppercase tracking-wide">Event Registration</span>
          </div>
          <DialogTitle className="text-2xl text-white">Register for {event.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete the form below to secure your spot in the competition.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 p-4 rounded-lg border border-red-500/30">
            <h3 className="text-white mb-2">{event.title}</h3>
            <p className="text-sm text-gray-300">{event.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sub-Event Select */}
            <div className="space-y-2">
              <Label htmlFor="subEvent" className="text-white">
                Select Sub-Event *
              </Label>
              <Select
                value={formData.subEvent}
                onValueChange={(value) => handleChange("subEvent", value)}
              >
                <SelectTrigger id="subEvent" className="bg-zinc-800 border-white/10 text-white">
                  <SelectValue placeholder="Choose a sub-event" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-white/10 text-white">
                  {event.subEvents.map((subEvent, idx) => (
                    <SelectItem key={idx} value={subEvent.name} className="focus:bg-red-600/20">
                      <div className="flex flex-col">
                        <span>{subEvent.name}</span>
                        {subEvent.description && (
                          <span className="text-xs text-gray-400">{subEvent.description}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                  placeholder="John"
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                  placeholder="Doe"
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                placeholder="john.doe@example.com"
                className="bg-zinc-800 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                placeholder="+63 912 345 6789"
                className="bg-zinc-800 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Year Level */}
            <div className="space-y-2">
              <Label htmlFor="yearLevel" className="text-white">Year Level *</Label>
              <Select
                value={formData.yearLevel}
                onValueChange={(value) => handleChange("yearLevel", value)}
              >
                <SelectTrigger id="yearLevel" className="bg-zinc-800 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-white/10 text-white">
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                  <SelectItem value="5th Year">5th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                Complete Registration
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
