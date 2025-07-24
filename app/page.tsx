"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { StatsCards } from "@/components/stats-cards";
import { FlightTable } from "@/components/flight-table";
import { AirportStatus } from "@/components/airport-status";
import { FlightStatusCard } from "@/components/flight-status-card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw } from "lucide-react";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ToastNotifications } from "@/components/toast-notifications";
import { AutomatedAlerts } from "@/components/automated-alerts";

const recentFlights = [
  {
    flightNumber: "AA1234",
    airline: "American Airlines",
    departure: "JFK",
    arrival: "LAX",
    departureTime: "08:30",
    arrivalTime: "11:45",
    status: "On Time" as const,
    gate: "A12",
    aircraft: "Boeing 737",
  },
  {
    flightNumber: "UA5678",
    airline: "United Airlines",
    departure: "ORD",
    arrival: "SFO",
    departureTime: "14:15",
    arrivalTime: "16:30",
    status: "Delayed" as const,
    gate: "B7",
    aircraft: "Airbus A320",
  },
  {
    flightNumber: "DL9012",
    airline: "Delta Air Lines",
    departure: "ATL",
    arrival: "MIA",
    departureTime: "10:00",
    arrivalTime: "12:15",
    status: "Boarding" as const,
    gate: "C3",
    aircraft: "Boeing 757",
  },
];

export default function Dashboard() {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-1 items-center gap-2">
              <h1 className="text-lg font-semibold">
                Flight Control Dashboard - Overview
              </h1>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search flights..."
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <NotificationsDropdown />
              </div>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            {/* Stats Overview */}
            <StatsCards />

            {/* Recent Flight Updates */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Flight Updates</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentFlights.map((flight) => (
                  <FlightStatusCard key={flight.flightNumber} {...flight} />
                ))}
              </div>
            </div>

            {/* Airport Status */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Airport Status</h2>
              <AirportStatus />
            </div>

            {/* All Flights Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Flights</h2>
              <FlightTable />
            </div>
          </div>
        </SidebarInset>
        <ToastNotifications />
        <AutomatedAlerts />
      </SidebarProvider>
    </NotificationsProvider>
  );
}
