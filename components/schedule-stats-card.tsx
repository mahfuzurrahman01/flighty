"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plane, Users, Clock } from "lucide-react";
import { useFlightSchedule } from "@/contexts/flight-schedule-context";

export function ScheduleStatsCards() {
  const { flights, getFlightsByDate, selectedDate } = useFlightSchedule();

  const todayFlights = getFlightsByDate(new Date());
  const selectedDateFlights = getFlightsByDate(selectedDate);

  const stats = {
    totalScheduled: flights.length,
    todayFlights: todayFlights.length,
    selectedDateFlights: selectedDateFlights.length,
    totalCapacity: flights.reduce((sum, f) => sum + f.passengers.capacity, 0),
    totalBooked: flights.reduce((sum, f) => sum + f.passengers.booked, 0),
    avgLoadFactor: Math.round(
      (flights.reduce((sum, f) => sum + f.passengers.booked, 0) /
        flights.reduce((sum, f) => sum + f.passengers.capacity, 0)) *
        100
    ),
    activeRoutes: new Set(
      flights.map((f) => `${f.departure.code}-${f.arrival.code}`)
    ).size,
    airlines: new Set(flights.map((f) => f.airline)).size,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Scheduled</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalScheduled}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 text-xs"
            >
              {stats.airlines} Airlines
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today&apos;s Flights
          </CardTitle>
          <Plane className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayFlights}</div>
          <p className="text-xs text-muted-foreground">
            {stats.selectedDateFlights} on selected date
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Load Factor</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgLoadFactor}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalBooked.toLocaleString()} /{" "}
            {stats.totalCapacity.toLocaleString()} seats
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeRoutes}</div>
          <p className="text-xs text-muted-foreground">
            Unique route combinations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
