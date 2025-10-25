"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Trash2, Search, Trophy, Users, Calendar, Mail, Phone, Flag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

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
}

interface DashboardProps {
  registrations: Registration[];
  setRegistrations: (registrations: Registration[]) => void;
}

export default function Dashboard({ registrations, setRegistrations }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.subEvent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setRegistrations(registrations.filter((reg) => reg.id !== id));
    setDeleteId(null);
  };

  const totalRegistrations = registrations.length;
  const uniqueEvents = new Set(registrations.map((r) => r.eventId)).size;
  const uniqueSubEvents = new Set(registrations.map((r) => r.subEvent)).size;

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Registration Dashboard
          </h2>
          <p className="text-gray-400">Manage and view all your event registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm text-white">Total Registrations</CardTitle>
              <Trophy className="w-4 h-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-white">{totalRegistrations}</div>
              <p className="text-xs text-gray-400 mt-1">Across all events</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm text-white">Event Categories</CardTitle>
              <Flag className="w-4 h-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-white">{uniqueEvents}</div>
              <p className="text-xs text-gray-400 mt-1">Different categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm text-white">Sub-Events</CardTitle>
              <Users className="w-4 h-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-white">{uniqueSubEvents}</div>
              <p className="text-xs text-gray-400 mt-1">Competitions entered</p>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">My Registrations</CardTitle>
            <CardDescription className="text-gray-400">
              View and manage all your event registrations
            </CardDescription>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-800 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredRegistrations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                <p>
                  {searchTerm
                    ? "No registrations found matching your search."
                    : "No registrations yet. Register for an event to get started!"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-gray-400">Event Category</TableHead>
                        <TableHead className="text-gray-400">Sub-Event</TableHead>
                        <TableHead className="text-gray-400">Participant</TableHead>
                        <TableHead className="text-gray-400">Contact</TableHead>
                        <TableHead className="text-gray-400">Year Level</TableHead>
                        <TableHead className="text-right text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((registration) => (
                        <TableRow key={registration.id} className="border-white/10 hover:bg-white/5">
                          <TableCell>
                            <div className="max-w-[150px] truncate text-white">{registration.eventTitle}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-red-600/20 text-red-400 border-red-500/30">{registration.subEvent}</Badge>
                          </TableCell>
                          <TableCell className="text-white">{registration.firstName} {registration.lastName}</TableCell>
                          <TableCell className="text-gray-300">
                            <div className="truncate max-w-[180px]">{registration.email}</div>
                            <div className="text-gray-500">{registration.phone}</div>
                          </TableCell>
                          <TableCell className="text-gray-300">{registration.yearLevel}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setDeleteId(registration.id)} className="hover:bg-red-600/20">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {filteredRegistrations.map((registration) => (
                    <Card key={registration.id} className="bg-zinc-800 border-white/10">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <CardTitle className="text-base text-white">{registration.eventTitle}</CardTitle>
                            <Badge className="bg-red-600/20 text-red-400 border-red-500/30">{registration.subEvent}</Badge>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(registration.id)} className="hover:bg-red-600/20">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{registration.firstName} {registration.lastName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="truncate">{registration.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{registration.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Flag className="w-4 h-4 text-gray-500" />
                          <span>{registration.yearLevel}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-zinc-900 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Cancel Registration</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to cancel this registration? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-white/10 text-white hover:bg-zinc-700">
              Keep Registration
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} className="bg-red-600 hover:bg-red-700 text-white">
              Cancel Registration
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
