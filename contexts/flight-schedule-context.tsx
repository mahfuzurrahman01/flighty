"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";

export interface ScheduledFlight {
  id: string;
  flightNumber: string;
  airline: string;
  aircraft: string;
  departure: {
    airport: string;
    code: string;
    scheduledTime: string;
    gate?: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    code: string;
    scheduledTime: string;
    gate?: string;
    terminal?: string;
  };
  status:
    | "Scheduled"
    | "Confirmed"
    | "Delayed"
    | "Cancelled"
    | "Boarding"
    | "Departed";
  frequency: "Daily" | "Weekly" | "Bi-weekly" | "Monthly" | "One-time";
  daysOfWeek: string[]; // ["Mon", "Tue", "Wed", etc.]
  effectiveDate: string;
  expiryDate?: string;
  passengers: {
    capacity: number;
    booked: number;
    available: number;
  };
  crew: {
    pilots: number;
    flightAttendants: number;
  };
  route: {
    distance: number;
    duration: string;
    flightTime: string;
  };
  pricing: {
    economy: number;
    business: number;
    firstClass: number;
  };
  notes?: string;
  lastModified: Date;
  createdBy: string;
}

interface FlightScheduleContextType {
  flights: ScheduledFlight[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedFlight: ScheduledFlight | null;
  setSelectedFlight: (flight: ScheduledFlight | null) => void;
  addFlight: (flight: Omit<ScheduledFlight, "id" | "lastModified">) => void;
  updateFlight: (id: string, updates: Partial<ScheduledFlight>) => void;
  deleteFlight: (id: string) => void;
  getFlightsByDate: (date: Date) => ScheduledFlight[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  airlineFilter: string;
  setAirlineFilter: (airline: string) => void;
}

const FlightScheduleContext = createContext<
  FlightScheduleContextType | undefined
>(undefined);

export function useFlightSchedule() {
  const context = useContext(FlightScheduleContext);
  if (!context) {
    throw new Error(
      "useFlightSchedule must be used within a FlightScheduleProvider"
    );
  }
  return context;
}

// Sample scheduled flights data
const initialFlights: ScheduledFlight[] = [
  {
    id: "1",
    flightNumber: "AA1001",
    airline: "American Airlines",
    aircraft: "Boeing 737-800",
    departure: {
      airport: "John F. Kennedy International",
      code: "JFK",
      scheduledTime: "06:00",
      gate: "A12",
      terminal: "Terminal 8",
    },
    arrival: {
      airport: "Los Angeles International",
      code: "LAX",
      scheduledTime: "09:30",
      gate: "B7",
      terminal: "Terminal 6",
    },
    status: "Scheduled",
    frequency: "Daily",
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    passengers: {
      capacity: 160,
      booked: 142,
      available: 18,
    },
    crew: {
      pilots: 2,
      flightAttendants: 4,
    },
    route: {
      distance: 2475,
      duration: "5h 30m",
      flightTime: "5h 15m",
    },
    pricing: {
      economy: 299,
      business: 899,
      firstClass: 1599,
    },
    notes: "Popular morning route",
    lastModified: new Date(),
    createdBy: "John Smith",
  },
  {
    id: "2",
    flightNumber: "UA2002",
    airline: "United Airlines",
    aircraft: "Airbus A320",
    departure: {
      airport: "Chicago O'Hare International",
      code: "ORD",
      scheduledTime: "14:15",
      gate: "C3",
      terminal: "Terminal 1",
    },
    arrival: {
      airport: "San Francisco International",
      code: "SFO",
      scheduledTime: "16:45",
      gate: "D15",
      terminal: "Terminal 3",
    },
    status: "Confirmed",
    frequency: "Daily",
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    effectiveDate: "2024-01-01",
    passengers: {
      capacity: 150,
      booked: 128,
      available: 22,
    },
    crew: {
      pilots: 2,
      flightAttendants: 4,
    },
    route: {
      distance: 1846,
      duration: "4h 30m",
      flightTime: "4h 15m",
    },
    pricing: {
      economy: 249,
      business: 749,
      firstClass: 1299,
    },
    lastModified: new Date(),
    createdBy: "Sarah Johnson",
  },
  {
    id: "3",
    flightNumber: "DL3003",
    airline: "Delta Air Lines",
    aircraft: "Boeing 757-200",
    departure: {
      airport: "Hartsfield-Jackson Atlanta International",
      code: "ATL",
      scheduledTime: "10:00",
      gate: "E8",
      terminal: "Terminal S",
    },
    arrival: {
      airport: "Miami International",
      code: "MIA",
      scheduledTime: "12:15",
      gate: "F12",
      terminal: "Terminal N",
    },
    status: "Scheduled",
    frequency: "Weekly",
    daysOfWeek: ["Mon", "Wed", "Fri"],
    effectiveDate: "2024-01-01",
    expiryDate: "2024-06-30",
    passengers: {
      capacity: 200,
      booked: 175,
      available: 25,
    },
    crew: {
      pilots: 2,
      flightAttendants: 6,
    },
    route: {
      distance: 594,
      duration: "2h 15m",
      flightTime: "2h 00m",
    },
    pricing: {
      economy: 179,
      business: 549,
      firstClass: 999,
    },
    notes: "Seasonal route",
    lastModified: new Date(),
    createdBy: "Mike Davis",
  },
  {
    id: "4",
    flightNumber: "SW4004",
    airline: "Southwest Airlines",
    aircraft: "Boeing 737-700",
    departure: {
      airport: "Denver International",
      code: "DEN",
      scheduledTime: "16:45",
      gate: "A25",
      terminal: "Terminal A",
    },
    arrival: {
      airport: "Phoenix Sky Harbor International",
      code: "PHX",
      scheduledTime: "18:20",
      gate: "B18",
      terminal: "Terminal 4",
    },
    status: "Delayed",
    frequency: "Daily",
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    effectiveDate: "2024-01-01",
    passengers: {
      capacity: 143,
      booked: 134,
      available: 9,
    },
    crew: {
      pilots: 2,
      flightAttendants: 3,
    },
    route: {
      distance: 602,
      duration: "1h 35m",
      flightTime: "1h 25m",
    },
    pricing: {
      economy: 129,
      business: 0, // Southwest doesn't have business class
      firstClass: 0,
    },
    lastModified: new Date(),
    createdBy: "Lisa Wilson",
  },
];

export function FlightScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flights, setFlights] = useState<ScheduledFlight[]>(initialFlights);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedFlight, setSelectedFlight] = useState<ScheduledFlight | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [airlineFilter, setAirlineFilter] = useState("all");

  const addFlight = useCallback(
    (flight: Omit<ScheduledFlight, "id" | "lastModified">) => {
      const newFlight: ScheduledFlight = {
        ...flight,
        id: Date.now().toString(),
        lastModified: new Date(),
      };
      setFlights((prev) => [...prev, newFlight]);
    },
    []
  );

  const updateFlight = useCallback(
    (id: string, updates: Partial<ScheduledFlight>) => {
      setFlights((prev) =>
        prev.map((flight) =>
          flight.id === id
            ? { ...flight, ...updates, lastModified: new Date() }
            : flight
        )
      );
    },
    []
  );

  const deleteFlight = useCallback(
    (id: string) => {
      setFlights((prev) => prev.filter((flight) => flight.id !== id));
      if (selectedFlight?.id === id) {
        setSelectedFlight(null);
      }
    },
    [selectedFlight]
  );

  const getFlightsByDate = useCallback(
    (date: Date) => {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      return flights.filter((flight) => {
        // Check if flight operates on this day of week
        const operatesOnDay = flight.daysOfWeek.includes(dayName);

        // Check if date is within effective period
        const effectiveDate = new Date(flight.effectiveDate);
        const expiryDate = flight.expiryDate
          ? new Date(flight.expiryDate)
          : new Date("2099-12-31");
        const isWithinPeriod = date >= effectiveDate && date <= expiryDate;

        return operatesOnDay && isWithinPeriod;
      });
    },
    [flights]
  );

  return (
    <FlightScheduleContext.Provider
      value={{
        flights,
        selectedDate,
        setSelectedDate,
        selectedFlight,
        setSelectedFlight,
        addFlight,
        updateFlight,
        deleteFlight,
        getFlightsByDate,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        airlineFilter,
        setAirlineFilter,
      }}
    >
      {children}
    </FlightScheduleContext.Provider>
  );
}
