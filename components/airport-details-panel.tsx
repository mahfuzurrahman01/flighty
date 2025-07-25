"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Users,
  Settings,
  Phone,
  Mail,
  Globe,
  Cloud,
  Wind,
  Thermometer,
  Eye,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { useAirports } from "@/contexts/airport-context";

const statusColors = {
  Operational: "bg-green-100 text-green-800",
  Limited: "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
  Emergency: "bg-red-100 text-red-800",
};

const runwayStatusColors = {
  Active: "bg-green-100 text-green-800",
  Closed: "bg-red-100 text-red-800",
  Maintenance: "bg-yellow-100 text-yellow-800",
};

const gateStatusColors = {
  Available: "bg-green-100 text-green-800",
  Occupied: "bg-blue-100 text-blue-800",
  Maintenance: "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
};

export function AirportDetailsPanel() {
  const { selectedAirport } = useAirports();

  if (!selectedAirport) {
    return (
      <Card className="h-[700px]">
        <CardContent className="flex items-center justify-center h-full text-center">
          <div className="space-y-4">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-medium">Select an Airport</h3>
              <p className="text-sm text-muted-foreground">
                Click on an airport to view detailed information and management
                options
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeRunways = selectedAirport.runways.filter(
    (r) => r.status === "Active"
  ).length;
  const occupiedGates = selectedAirport.gates.filter(
    (g) => g.status === "Occupied"
  ).length;
  const gateUtilization = Math.round(
    (occupiedGates / selectedAirport.gates.length) * 100
  );

  return (
    <Card className="h-[700px] overflow-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{selectedAirport.code}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedAirport.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedAirport.city}, {selectedAirport.country}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={statusColors[selectedAirport.status]}
          >
            {selectedAirport.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="runways">Runways</TabsTrigger>
            <TabsTrigger value="gates">Gates</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location & Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="font-medium">
                    {selectedAirport.coordinates.latitude.toFixed(4)},{" "}
                    {selectedAirport.coordinates.longitude.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Elevation:</span>
                  <span className="font-medium">
                    {selectedAirport.elevation} ft
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="font-medium">
                    {selectedAirport.timezone}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Daily Statistics */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Today&apos;s Operations
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {selectedAirport.statistics.dailyFlights}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Flights
                  </div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {(
                      selectedAirport.statistics.dailyPassengers / 1000
                    ).toFixed(0)}
                    K
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Passengers
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>On-Time Performance</span>
                  <span className="font-medium">
                    {selectedAirport.statistics.onTimePerformance}%
                  </span>
                </div>
                <Progress
                  value={selectedAirport.statistics.onTimePerformance}
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            {/* Capacity Information */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Capacity
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hourly:</span>
                  <span className="font-medium">
                    {selectedAirport.capacity.hourly} flights
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily:</span>
                  <span className="font-medium">
                    {selectedAirport.capacity.daily.toLocaleString()} flights
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual:</span>
                  <span className="font-medium">
                    {(selectedAirport.capacity.annual / 1000000).toFixed(0)}M
                    passengers
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{selectedAirport.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span>{selectedAirport.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span className="text-blue-600">
                    {selectedAirport.contact.website}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="runways" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">
                Runway Status ({activeRunways}/{selectedAirport.runways.length}{" "}
                Active)
              </h4>
              <div className="space-y-3">
                {selectedAirport.runways.map((runway) => (
                  <div key={runway.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{runway.name}</div>
                      <Badge
                        variant="secondary"
                        className={runwayStatusColors[runway.status]}
                      >
                        {runway.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>Length: {runway.length.toLocaleString()} ft</div>
                      <div>Width: {runway.width} ft</div>
                      <div>Surface: {runway.surface}</div>
                      <div>Heading: {runway.heading}</div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      {runway.lighting && (
                        <span className="text-green-600">✓ Lighting</span>
                      )}
                      {runway.ils && (
                        <span className="text-green-600">✓ ILS</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gates" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">
                Gate Status ({occupiedGates}/{selectedAirport.gates.length}{" "}
                Occupied - {gateUtilization}%)
              </h4>
              <Progress value={gateUtilization} className="w-full" />
              <div className="space-y-3">
                {selectedAirport.gates.map((gate) => (
                  <div key={gate.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">Gate {gate.number}</div>
                        <div className="text-sm text-muted-foreground">
                          {gate.terminal}
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={gateStatusColors[gate.status]}
                      >
                        {gate.status}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Type: {gate.type}
                      </div>
                      {gate.currentFlight && (
                        <div className="mt-1">
                          <div className="font-medium">
                            Current: {gate.currentFlight}
                          </div>
                          <div className="text-muted-foreground">
                            {gate.aircraft} • Departure:{" "}
                            {gate.scheduledDeparture}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Current Weather Conditions
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold">
                    {selectedAirport.weather.temperature}°F
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Temperature
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Wind className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">
                    {selectedAirport.weather.windSpeed}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Wind Speed (mph)
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conditions:</span>
                  <span className="font-medium">
                    {selectedAirport.weather.conditions}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Humidity:</span>
                  <span className="font-medium">
                    {selectedAirport.weather.humidity}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Wind Direction:</span>
                  <span className="font-medium">
                    {selectedAirport.weather.windDirection}°
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Visibility:</span>
                  <span className="font-medium">
                    {selectedAirport.weather.visibility} miles
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pressure:</span>
                  <span className="font-medium">
                    {selectedAirport.weather.pressure} inHg
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ceiling:</span>
                  <span className="font-medium">
                    {selectedAirport.weather.ceiling.toLocaleString()} ft
                  </span>
                </div>
              </div>

              {/* Traffic Impact */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">
                  Weather Impact on Operations
                </h5>
                <div className="text-sm text-blue-700">
                  {selectedAirport.weather.visibility < 5 && (
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Low visibility may cause delays</span>
                    </div>
                  )}
                  {selectedAirport.weather.windSpeed > 20 && (
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>High winds may affect operations</span>
                    </div>
                  )}
                  {selectedAirport.weather.visibility >= 5 &&
                    selectedAirport.weather.windSpeed <= 20 && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">
                          ✓ Weather conditions are favorable for operations
                        </span>
                      </div>
                    )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Last updated:{" "}
                {selectedAirport.weather.lastUpdated.toLocaleString()}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="space-y-2 mt-6">
          <Button className="w-full" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage Airport
          </Button>
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Live Operations
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center mt-4">
          Last updated: {selectedAirport.lastUpdated.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
