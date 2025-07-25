"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plane, CheckCircle, Activity } from "lucide-react";
import { useAirports } from "@/contexts/airport-context";

export function AirportStatsCards() {
  const { airports } = useAirports();

  const stats = {
    totalAirports: airports.length,
    operational: airports.filter((a) => a.status === "Operational").length,
    limited: airports.filter((a) => a.status === "Limited").length,
    closed: airports.filter((a) => a.status === "Closed").length,
    emergency: airports.filter((a) => a.status === "Emergency").length,
    totalRunways: airports.reduce((sum, a) => sum + a.runways.length, 0),
    activeRunways: airports.reduce(
      (sum, a) => sum + a.runways.filter((r) => r.status === "Active").length,
      0
    ),
    totalGates: airports.reduce((sum, a) => sum + a.gates.length, 0),
    occupiedGates: airports.reduce(
      (sum, a) => sum + a.gates.filter((g) => g.status === "Occupied").length,
      0
    ),
    totalFlights: airports.reduce(
      (sum, a) => sum + a.statistics.dailyFlights,
      0
    ),
    totalPassengers: airports.reduce(
      (sum, a) => sum + a.statistics.dailyPassengers,
      0
    ),
    avgOnTime: Math.round(
      airports.reduce((sum, a) => sum + a.statistics.onTimePerformance, 0) /
        airports.length
    ),
    avgDelay: Math.round(
      airports.reduce((sum, a) => sum + a.statistics.averageDelay, 0) /
        airports.length
    ),
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Airports</CardTitle>
          <MapPin className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAirports}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 text-xs"
            >
              {stats.operational} Operational
            </Badge>
            {stats.limited > 0 && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800 text-xs"
              >
                {stats.limited} Limited
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Infrastructure</CardTitle>
          <Activity className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.activeRunways}/{stats.totalRunways}
          </div>
          <p className="text-xs text-muted-foreground">Active runways</p>
          <div className="text-sm mt-1">
            <span className="text-muted-foreground">Gates: </span>
            <span className="font-medium">
              {stats.occupiedGates}/{stats.totalGates} occupied
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Daily Operations
          </CardTitle>
          <Plane className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalFlights.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total flights today</p>
          <div className="text-sm mt-1">
            <span className="text-muted-foreground">Passengers: </span>
            <span className="font-medium">
              {stats.totalPassengers.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Performance</CardTitle>
          <CheckCircle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgOnTime}%</div>
          <p className="text-xs text-muted-foreground">
            Average on-time performance
          </p>
          <div className="text-sm mt-1">
            <span className="text-muted-foreground">Avg delay: </span>
            <span className="font-medium">{stats.avgDelay} min</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
