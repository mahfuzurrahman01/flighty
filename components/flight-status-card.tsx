import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlightStatusCardProps {
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  status:
    | "On Time"
    | "Delayed"
    | "Boarding"
    | "Departed"
    | "Arrived"
    | "Cancelled";
  gate?: string;
  aircraft?: string;
  className?: string;
}

const statusColors = {
  "On Time": "bg-green-500",
  Delayed: "bg-red-500",
  Boarding: "bg-blue-500",
  Departed: "bg-purple-500",
  Arrived: "bg-gray-500",
  Cancelled: "bg-red-600",
};

export function FlightStatusCard({
  flightNumber,
  airline,
  departure,
  arrival,
  departureTime,
  arrivalTime,
  status,
  gate,
  aircraft,
  className,
}: FlightStatusCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {flightNumber}
          </CardTitle>
          <Badge
            variant="secondary"
            className={`text-white ${statusColors[status]}`}
          >
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{airline}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{departure}</p>
              <p className="text-sm text-muted-foreground">{departureTime}</p>
            </div>
          </div>
          <Plane className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="font-medium">{arrival}</p>
              <p className="text-sm text-muted-foreground">{arrivalTime}</p>
            </div>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        {(gate || aircraft) && (
          <div className="flex justify-between text-sm">
            {gate && (
              <span className="text-muted-foreground">
                Gate: <span className="font-medium">{gate}</span>
              </span>
            )}
            {aircraft && (
              <span className="text-muted-foreground">
                Aircraft: <span className="font-medium">{aircraft}</span>
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
