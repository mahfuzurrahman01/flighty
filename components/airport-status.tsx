import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirportStatusProps {
  className?: string;
}

const airports = [
  {
    code: "JFK",
    name: "John F. Kennedy International",
    status: "Normal",
    weather: "Clear",
    temperature: "72°F",
    delays: 0,
    icon: Sun,
  },
  {
    code: "LAX",
    name: "Los Angeles International",
    status: "Normal",
    weather: "Partly Cloudy",
    temperature: "68°F",
    delays: 2,
    icon: Cloud,
  },
  {
    code: "ORD",
    name: "Chicago O'Hare International",
    status: "Delayed",
    weather: "Rain",
    temperature: "45°F",
    delays: 12,
    icon: CloudRain,
  },
  {
    code: "DFW",
    name: "Dallas/Fort Worth International",
    status: "Normal",
    weather: "Windy",
    temperature: "78°F",
    delays: 1,
    icon: Wind,
  },
];

const statusColors = {
  Normal: "bg-green-100 text-green-800",
  Delayed: "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
};

export function AirportStatus({ className }: AirportStatusProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {airports.map((airport) => (
        <Card key={airport.code}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{airport.code}</CardTitle>
                <p className="text-sm text-muted-foreground">{airport.name}</p>
              </div>
              <Badge
                variant="secondary"
                className={
                  statusColors[airport.status as keyof typeof statusColors]
                }
              >
                {airport.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <airport.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{airport.weather}</span>
              </div>
              <span className="text-sm font-medium">{airport.temperature}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {airport.delays > 0
                ? `${airport.delays} delayed flights`
                : "No delays"}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
