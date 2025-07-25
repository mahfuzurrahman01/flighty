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
  Edit,
  Eye,
  Trash2,
  Users,
  Clock,
  Plane,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFlightSchedule } from "@/contexts/flight-schedule-context";

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800",
  Confirmed: "bg-green-100 text-green-800",
  Delayed: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Boarding: "bg-purple-100 text-purple-800",
  Departed: "bg-gray-100 text-gray-800",
};

export function ScheduleTableView() {
  const {
    flights,
    searchTerm,
    statusFilter,
    airlineFilter,
    setSelectedFlight,
    deleteFlight,
  } = useFlightSchedule();

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      flight.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesAirline =
      airlineFilter === "all" || flight.airline === airlineFilter;

    return matchesSearch && matchesStatus && matchesAirline;
  });

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aircraft</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Load Factor</TableHead>
            <TableHead>Pricing</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFlights.map((flight) => {
            const loadFactor = Math.round(
              (flight.passengers.booked / flight.passengers.capacity) * 100
            );

            return (
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
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="font-medium">{flight.departure.code}</div>
                      <div className="text-xs text-muted-foreground">
                        {flight.departure.scheduledTime}
                      </div>
                      {flight.departure.gate && (
                        <div className="text-xs text-muted-foreground">
                          Gate {flight.departure.gate}
                        </div>
                      )}
                    </div>
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <div className="text-center">
                      <div className="font-medium">{flight.arrival.code}</div>
                      <div className="text-xs text-muted-foreground">
                        {flight.arrival.scheduledTime}
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
                  <div className="text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{flight.route.duration}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {flight.route.distance} miles
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
                    {flight.lastModified.toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{flight.aircraft}</div>
                  <div className="text-xs text-muted-foreground">
                    {flight.crew.pilots}P + {flight.crew.flightAttendants}FA
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{flight.frequency}</div>
                  <div className="text-xs text-muted-foreground">
                    {flight.daysOfWeek.join(", ")}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{loadFactor}%</span>
                    </div>
                    <Progress value={loadFactor} className="w-16" />
                    <div className="text-xs text-muted-foreground">
                      {flight.passengers.booked}/{flight.passengers.capacity}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Eco: ${flight.pricing.economy}</div>
                    {flight.pricing.business > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Bus: ${flight.pricing.business}
                      </div>
                    )}
                    {flight.pricing.firstClass > 0 && (
                      <div className="text-xs text-muted-foreground">
                        First: ${flight.pricing.firstClass}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedFlight(flight)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Schedule
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFlight(flight.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
