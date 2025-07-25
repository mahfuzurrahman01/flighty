"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Plane,
  AlertTriangle,
  Settings,
  Eye,
  Cloud,
} from "lucide-react";
import { useAirports, type Airport } from "@/contexts/airport-context";

interface AirportOverviewGridProps {
  airports: Airport[];
}

const statusColors = {
  Operational: "bg-green-100 text-green-800",
  Limited: "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
  Emergency: "bg-red-100 text-red-800",
};

const weatherIcons = {
  Clear: Cloud,
  "Partly Cloudy": Cloud,
  Cloudy: Cloud,
  Rain: Cloud,
  Snow: Cloud,
  Fog: Cloud,
};

export function AirportOverviewGrid({ airports }: AirportOverviewGridProps) {
  const { setSelectedAirport } = useAirports();

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {airports.map((airport) => {
          const activeRunways = airport.runways.filter(
            (r) => r.status === "Active"
          ).length;
          const occupiedGates = airport.gates.filter(
            (g) => g.status === "Occupied"
          ).length;
          const gateUtilization = Math.round(
            (occupiedGates / airport.gates.length) * 100
          );
          const WeatherIcon =
            weatherIcons[
              airport.weather.conditions as keyof typeof weatherIcons
            ] || Cloud;

          return (
            <Card
              key={airport.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedAirport(airport)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{airport.code}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {airport.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {airport.city}, {airport.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={statusColors[airport.status]}
                    >
                      {airport.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {airport.statistics.dailyFlights}
                    </div>
                    <div className="text-xs text-muted-foreground">Flights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {(airport.statistics.dailyPassengers / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Passengers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {airport.statistics.onTimePerformance}%
                    </div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {airport.statistics.averageDelay}m
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Avg Delay
                    </div>
                  </div>
                </div>

                {/* Infrastructure Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Runways</span>
                      <span className="font-medium">
                        {activeRunways}/{airport.runways.length} Active
                      </span>
                    </div>
                    <Progress
                      value={(activeRunways / airport.runways.length) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Gates</span>
                      <span className="font-medium">
                        {gateUtilization}% Occupied
                      </span>
                    </div>
                    <Progress value={gateUtilization} className="h-2" />
                  </div>
                </div>

                {/* Weather & Traffic */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <WeatherIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="font-medium">
                        {airport.weather.conditions}
                      </div>
                      <div className="text-muted-foreground">
                        {airport.weather.temperature}°F •{" "}
                        {airport.weather.windSpeed} mph
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="font-medium">
                        {airport.traffic.arrivals + airport.traffic.departures}{" "}
                        Movements
                      </div>
                      <div className="text-muted-foreground">
                        {airport.traffic.delays} delays •{" "}
                        {airport.traffic.cancellations} cancelled
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {(airport.status === "Limited" ||
                  airport.status === "Emergency" ||
                  airport.traffic.groundStops) && (
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="text-sm">
                      {airport.status === "Emergency" && (
                        <span className="text-red-600 font-medium">
                          Emergency Status
                        </span>
                      )}
                      {airport.status === "Limited" && (
                        <span className="text-yellow-600 font-medium">
                          Limited Operations
                        </span>
                      )}
                      {airport.traffic.groundStops && (
                        <span className="text-orange-600 font-medium">
                          Ground Stop Active
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedAirport(airport)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
