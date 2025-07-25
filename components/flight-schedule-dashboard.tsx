"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Search,
  Filter,
  Plus,
  List,
  CalendarDays,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFlightSchedule } from "@/contexts/flight-schedule-context";
import { ScheduleStatsCards } from "./schedule-stats-card";
import { FlightScheduleForm } from "./flight-schedule-form";
import { ScheduleCalendarView } from "./schedule-calendar-view";
import { ScheduleTableView } from "./schedule-table-view";
import { ScheduleDetailsPanel } from "./schedule-details-panel";

export function FlightScheduleDashboard() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    airlineFilter,
    setAirlineFilter,
    flights,
  } = useFlightSchedule();

  const [viewMode, setViewMode] = useState<"calendar" | "table">("calendar");
  const [showAddForm, setShowAddForm] = useState(false);

  const airlines = Array.from(new Set(flights.map((f) => f.airline)));

  return (
    <div className="space-y-6">
      {/* Schedule Statistics */}
      <ScheduleStatsCards />

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Flight Schedule Management
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search flights, routes, airlines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={airlineFilter} onValueChange={setAirlineFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Airline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Airlines</SelectItem>
                  {airlines.map((airline) => (
                    <SelectItem key={airline} value={airline}>
                      {airline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="rounded-r-none"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4 mr-2" />
                  Table
                </Button>
              </div>
              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Flight
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Schedule New Flight</DialogTitle>
                  </DialogHeader>
                  <FlightScheduleForm onClose={() => setShowAddForm(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              {
                flights.filter((f) => {
                  const matchesSearch =
                    f.flightNumber
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    f.airline.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesStatus =
                    statusFilter === "all" ||
                    f.status.toLowerCase() === statusFilter;
                  const matchesAirline =
                    airlineFilter === "all" || f.airline === airlineFilter;
                  return matchesSearch && matchesStatus && matchesAirline;
                }).length
              }{" "}
              scheduled flights
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Schedule View */}
        <div className="lg:col-span-3 ">
          <Card className="h-[700px]  overflow-y-auto">
            <CardContent className="p-0 h-full">
              {viewMode === "calendar" ? (
                <ScheduleCalendarView />
              ) : (
                <ScheduleTableView />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Schedule Details Panel */}
        <div className="lg:col-span-1">
          <ScheduleDetailsPanel />
        </div>
      </div>
    </div>
  );
}
