"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Zap } from "lucide-react";
import {
  useLiveFlights,
  type LiveFlight,
} from "@/contexts/live-flights-context";

interface LiveFlightMapProps {
  flights: LiveFlight[];
}

const statusColors = {
  Scheduled: "bg-gray-500",
  Boarding: "bg-blue-500",
  Departed: "bg-green-500",
  "En Route": "bg-green-600",
  Approaching: "bg-yellow-500",
  Landed: "bg-gray-600",
  Delayed: "bg-red-500",
  Cancelled: "bg-red-700",
};

export function LiveFlightMap({ flights }: LiveFlightMapProps) {
  const { selectedFlight, setSelectedFlight } = useLiveFlights();
  const mapRef = useRef<HTMLDivElement>(null);
  console.log("mapRef", mapRef);
  // Simulate a map view with flight positions
  return (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-blue-200">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Button size="sm" variant="outline" className="bg-white/90">
          <Zap className="h-4 w-4 mr-2" />
          Live Mode
        </Button>
        <div className="bg-white/90 rounded-lg p-3 text-xs">
          <div className="font-medium mb-2">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span>En Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Boarding</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Approaching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Delayed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Markers */}
      {flights.map((flight, index) => {
        // Simulate positions across the map
        const x = 100 + ((index * 150) % 600);
        const y = 100 + ((index * 100) % 400);
        const isSelected = selectedFlight?.id === flight.id;

        return (
          <div
            key={flight.id}
            className={`absolute cursor-pointer transition-all duration-300 ${
              isSelected ? "scale-125 z-20" : "z-10"
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `rotate(${flight.position.heading}deg)`,
            }}
            onClick={() => setSelectedFlight(flight)}
          >
            {/* Flight Icon */}
            <div
              className={`relative p-2 rounded-full ${
                statusColors[flight.status]
              } text-white shadow-lg`}
            >
              <Plane className="h-4 w-4" />
              {flight.status === "En Route" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Flight Info Popup */}
            {isSelected && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] border">
                <div className="text-sm font-medium">{flight.flightNumber}</div>
                <div className="text-xs text-muted-foreground">
                  {flight.airline}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span>{flight.departure.code}</span>
                  <Plane className="h-3 w-3" />
                  <span>{flight.arrival.code}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      statusColors[flight.status]
                    } text-white`}
                  >
                    {flight.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {flight.position.altitude.toLocaleString()}ft
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Speed: {flight.position.speed} mph
                </div>
                {flight.delay > 0 && (
                  <div className="text-xs text-red-600 mt-1">
                    Delayed: {flight.delay} min
                  </div>
                )}
              </div>
            )}

            {/* Flight Path Trail (for en route flights) */}
            {flight.status === "En Route" && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-20 h-1 bg-green-400 opacity-50 rounded-full"></div>
              </div>
            )}
          </div>
        );
      })}

      {/* Airport Markers */}
      <div className="absolute bottom-20 left-20">
        <div className="flex items-center gap-2 bg-white/90 rounded-lg p-2 shadow">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">JFK</span>
        </div>
      </div>

      <div className="absolute top-20 right-20">
        <div className="flex items-center gap-2 bg-white/90 rounded-lg p-2 shadow">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">LAX</span>
        </div>
      </div>

      <div className="absolute bottom-40 right-40">
        <div className="flex items-center gap-2 bg-white/90 rounded-lg p-2 shadow">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">ORD</span>
        </div>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 text-xs">
        <div className="font-medium">Live Flight Tracking</div>
        <div className="text-muted-foreground">
          {flights.length} flights • Updated {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
