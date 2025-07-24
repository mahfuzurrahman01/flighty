import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const flights = [
  {
    id: "AA1234",
    airline: "American Airlines",
    route: "JFK → LAX",
    departure: "08:30",
    arrival: "11:45",
    status: "On Time",
    gate: "A12",
    aircraft: "Boeing 737",
  },
  {
    id: "UA5678",
    airline: "United Airlines",
    route: "ORD → SFO",
    departure: "14:15",
    arrival: "16:30",
    status: "Delayed",
    gate: "B7",
    aircraft: "Airbus A320",
  },
  {
    id: "DL9012",
    airline: "Delta Air Lines",
    route: "ATL → MIA",
    departure: "10:00",
    arrival: "12:15",
    status: "Boarding",
    gate: "C3",
    aircraft: "Boeing 757",
  },
  {
    id: "SW3456",
    airline: "Southwest Airlines",
    route: "DEN → PHX",
    departure: "16:45",
    arrival: "18:20",
    status: "Departed",
    gate: "D15",
    aircraft: "Boeing 737",
  },
  {
    id: "JB7890",
    airline: "JetBlue Airways",
    route: "BOS → FLL",
    departure: "12:30",
    arrival: "15:45",
    status: "On Time",
    gate: "E8",
    aircraft: "Airbus A321",
  },
]

const statusColors = {
  "On Time": "bg-green-100 text-green-800",
  Delayed: "bg-red-100 text-red-800",
  Boarding: "bg-blue-100 text-blue-800",
  Departed: "bg-purple-100 text-purple-800",
  Arrived: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
}

export function FlightTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Flight</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gate</TableHead>
            <TableHead>Aircraft</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell className="font-medium">{flight.id}</TableCell>
              <TableCell>{flight.airline}</TableCell>
              <TableCell>{flight.route}</TableCell>
              <TableCell>{flight.departure}</TableCell>
              <TableCell>{flight.arrival}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusColors[flight.status as keyof typeof statusColors]}>
                  {flight.status}
                </Badge>
              </TableCell>
              <TableCell>{flight.gate}</TableCell>
              <TableCell>{flight.aircraft}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Flight
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
