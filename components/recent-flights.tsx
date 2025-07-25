import { FlightStatusCard } from "@/components/flight-status-card";
import { cn } from "@/lib/utils";

interface RecentFlightsProps {
  className?: string;
}

const recentFlights = [
  {
    flightNumber: "AA1234",
    airline: "American Airlines",
    departure: "JFK",
    arrival: "LAX",
    departureTime: "08:30",
    arrivalTime: "11:45",
    status: "On Time" as const,
    gate: "A12",
    aircraft: "Boeing 737",
  },
  {
    flightNumber: "UA5678",
    airline: "United Airlines",
    departure: "ORD",
    arrival: "SFO",
    departureTime: "14:15",
    arrivalTime: "16:30",
    status: "Delayed" as const,
    gate: "B7",
    aircraft: "Airbus A320",
  },
  {
    flightNumber: "DL9012",
    airline: "Delta Air Lines",
    departure: "ATL",
    arrival: "MIA",
    departureTime: "10:00",
    arrivalTime: "12:15",
    status: "Boarding" as const,
    gate: "C3",
    aircraft: "Boeing 757",
  },
];

export function RecentFlights({ className }: RecentFlightsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold">Recent Flight Updates</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentFlights.map((flight) => (
          <FlightStatusCard key={flight.flightNumber} {...flight} />
        ))}
      </div>
    </div>
  );
}
