"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MoreHorizontal,
  Eye,
  Edit,
  MapPin,
  Clock,
  Fuel,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useLiveFlights,
  type LiveFlight,
} from "@/contexts/live-flights-context";

interface LiveFlightTableProps {
  flights: LiveFlight[];
}

const statusColors = {
  Scheduled: "bg-gray-100 text-gray-800",
  Boarding: "bg-blue-100 text-blue-800",
  Departed: "bg-green-100 text-green-800",
  "En Route": "bg-green-100 text-green-800",
  Approaching: "bg-yellow-100 text-yellow-800",
  Landed: "bg-gray-100 text-gray-800",
  Delayed: "bg-red-100 text-red-800",
  Cancelled: "bg-red-100 text-red-800",
};

export function LiveFlightTable({ flights }: LiveFlightTableProps) {
  const { setSelectedFlight } = useLiveFlights();

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Altitude</TableHead>
            <TableHead>Speed</TableHead>
            <TableHead>Delay</TableHead>
            <TableHead>Passengers</TableHead>
            <TableHead>Fuel</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow
              key={flight.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedFlight(flight)}
            >
              <TableCell>
                <div>
                  <div className="font-medium">{flight.flightNumber}</div>
                  <div className="text-sm text-muted-foreground">
                    {flight.airline}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {flight.aircraft}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="font-medium">{flight.departure.code}</div>
                    <div className="text-xs text-muted-foreground">
                      {flight.departure.time}
                    </div>
                    {flight.departure.gate && (
                      <div className="text-xs text-muted-foreground">
                        Gate {flight.departure.gate}
                      </div>
                    )}
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="text-center">
                    <div className="font-medium">{flight.arrival.code}</div>
                    <div className="text-xs text-muted-foreground">
                      {flight.estimatedArrival}
                    </div>
                    {flight.arrival.gate && (
                      <div className="text-xs text-muted-foreground">
                        Gate {flight.arrival.gate}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[flight.status]}
                >
                  {flight.status}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  Updated {flight.lastUpdate.toLocaleTimeString()}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Progress value={flight.progress} className="w-20" />
                  <div className="text-xs text-muted-foreground">
                    {flight.progress}%
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">
                    {flight.position.altitude.toLocaleString()}ft
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{flight.position.speed} mph</div>
                <div className="text-xs text-muted-foreground">
                  Heading {flight.position.heading}°
                </div>
              </TableCell>
              <TableCell>
                {flight.delay > 0 ? (
                  <div className="flex items-center gap-1 text-red-600">
                    <Clock className="h-3 w-3" />
                    <span className="text-sm">+{flight.delay}m</span>
                  </div>
                ) : (
                  <div className="text-sm text-green-600">On Time</div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{flight.passengers}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  +{flight.crew} crew
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Fuel className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{flight.fuel}%</span>
                </div>
                <Progress value={flight.fuel} className="w-12 mt-1" />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedFlight(flight)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Update Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
