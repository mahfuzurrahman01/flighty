"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useATC } from "@/contexts/atc-context";
import { Plane, Navigation, Radio } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function ATCRadar() {
  const { activeFlights, selectedFlight, selectFlight } = useATC();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "airborne":
        return "bg-blue-500";
      case "approach":
        return "bg-orange-500";
      case "taxiing":
        return "bg-yellow-500";
      case "holding":
        return "bg-purple-500";
      case "departed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Active Flights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeFlights.map((flight) => (
              <div
                key={flight.flightNumber}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedFlight?.flightNumber === flight.flightNumber
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => selectFlight(flight)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    <span className="font-semibold">{flight.callSign}</span>
                    <Badge className={getStatusColor(flight.status)}>
                      {flight.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {flight.frequency}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    Route: {flight.origin} → {flight.destination}
                  </div>
                  <div>Aircraft: {flight.aircraft}</div>
                  <div>Altitude: {flight.altitude.toLocaleString()} ft</div>
                  <div>Speed: {flight.speed} kts</div>
                  <div>Heading: {flight.heading}°</div>
                  <div className="text-muted-foreground">
                    Last Contact:{" "}
                    {formatDistanceToNow(flight.lastContact, {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedFlight && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5" />
              Flight Details - {selectedFlight.callSign}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Flight Number</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedFlight.flightNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Call Sign</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedFlight.callSign}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Aircraft Type</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedFlight.aircraft}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge className={getStatusColor(selectedFlight.status)}>
                    {selectedFlight.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Flight Parameters</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Altitude</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.altitude.toLocaleString()} ft
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Ground Speed</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.speed} kts
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Heading</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.heading}°
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Frequency</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.frequency}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Route Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Origin</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.origin}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Destination</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.destination}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedFlight.position.lat.toFixed(4)},{" "}
                      {selectedFlight.position.lng.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Contact</label>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(selectedFlight.lastContact, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
