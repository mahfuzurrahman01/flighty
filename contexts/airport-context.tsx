"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  elevation: number;
  runways: Runway[];
  terminals: Terminal[];
  gates: Gate[];
  services: AirportService[];
  weather: WeatherInfo;
  traffic: TrafficInfo;
  status: "Operational" | "Limited" | "Closed" | "Emergency";
  capacity: {
    hourly: number;
    daily: number;
    annual: number;
  };
  statistics: {
    dailyFlights: number;
    dailyPassengers: number;
    onTimePerformance: number;
    averageDelay: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  lastUpdated: Date;
}

export interface Runway {
  id: string;
  name: string;
  length: number;
  width: number;
  surface: string;
  status: "Active" | "Closed" | "Maintenance";
  heading: string;
  lighting: boolean;
  ils: boolean;
}

export interface Terminal {
  id: string;
  name: string;
  gates: number;
  capacity: number;
  services: string[];
  status: "Operational" | "Limited" | "Closed";
}

export interface Gate {
  id: string;
  number: string;
  terminal: string;
  type: "Domestic" | "International" | "Both";
  status: "Available" | "Occupied" | "Maintenance" | "Closed";
  currentFlight?: string;
  aircraft?: string;
  scheduledDeparture?: string;
}

export interface AirportService {
  id: string;
  name: string;
  category:
    | "Passenger"
    | "Cargo"
    | "Ground"
    | "Maintenance"
    | "Security"
    | "Other";
  provider: string;
  status: "Active" | "Inactive";
  hours: string;
}

export interface WeatherInfo {
  conditions: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  pressure: number;
  ceiling: number;
  lastUpdated: Date;
}

export interface TrafficInfo {
  arrivals: number;
  departures: number;
  delays: number;
  cancellations: number;
  groundStops: boolean;
  averageDelay: number;
}

interface AirportContextType {
  airports: Airport[];
  selectedAirport: Airport | null;
  setSelectedAirport: (airport: Airport | null) => void;
  updateAirportStatus: (airportId: string, status: Airport["status"]) => void;
  updateRunwayStatus: (
    airportId: string,
    runwayId: string,
    status: Runway["status"]
  ) => void;
  updateGateStatus: (
    airportId: string,
    gateId: string,
    status: Gate["status"]
  ) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const AirportContext = createContext<AirportContextType | undefined>(undefined);

export function useAirports() {
  const context = useContext(AirportContext);
  if (!context) {
    throw new Error("useAirports must be used within an AirportProvider");
  }
  return context;
}

// Sample airport data
const initialAirports: Airport[] = [
  {
    id: "1",
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "United States",
    timezone: "EST",
    coordinates: {
      latitude: 40.6413,
      longitude: -73.7781,
    },
    elevation: 13,
    runways: [
      {
        id: "1",
        name: "04L/22R",
        length: 12079,
        width: 200,
        surface: "Asphalt",
        status: "Active",
        heading: "04/22",
        lighting: true,
        ils: true,
      },
      {
        id: "2",
        name: "04R/22L",
        length: 8400,
        width: 200,
        surface: "Asphalt",
        status: "Active",
        heading: "04/22",
        lighting: true,
        ils: true,
      },
      {
        id: "3",
        name: "08L/26R",
        length: 10000,
        width: 150,
        surface: "Asphalt",
        status: "Maintenance",
        heading: "08/26",
        lighting: true,
        ils: false,
      },
    ],
    terminals: [
      {
        id: "1",
        name: "Terminal 1",
        gates: 11,
        capacity: 8000,
        services: ["Customs", "Immigration", "Duty Free", "Restaurants"],
        status: "Operational",
      },
      {
        id: "4",
        name: "Terminal 4",
        gates: 48,
        capacity: 15000,
        services: [
          "Customs",
          "Immigration",
          "Duty Free",
          "Restaurants",
          "Lounges",
        ],
        status: "Operational",
      },
      {
        id: "8",
        name: "Terminal 8",
        gates: 30,
        capacity: 12000,
        services: ["Domestic Check-in", "Restaurants", "Shops"],
        status: "Operational",
      },
    ],
    gates: [
      {
        id: "1",
        number: "A12",
        terminal: "Terminal 8",
        type: "Domestic",
        status: "Occupied",
        currentFlight: "AA1234",
        aircraft: "Boeing 737",
        scheduledDeparture: "08:30",
      },
      {
        id: "2",
        number: "B7",
        terminal: "Terminal 4",
        type: "International",
        status: "Available",
      },
      {
        id: "3",
        number: "C3",
        terminal: "Terminal 1",
        type: "International",
        status: "Maintenance",
      },
    ],
    services: [
      {
        id: "1",
        name: "Ground Handling",
        category: "Ground",
        provider: "Swissport",
        status: "Active",
        hours: "24/7",
      },
      {
        id: "2",
        name: "Aircraft Maintenance",
        category: "Maintenance",
        provider: "American Airlines",
        status: "Active",
        hours: "24/7",
      },
      {
        id: "3",
        name: "Customs & Border Protection",
        category: "Security",
        provider: "CBP",
        status: "Active",
        hours: "24/7",
      },
    ],
    weather: {
      conditions: "Clear",
      temperature: 72,
      humidity: 65,
      windSpeed: 8,
      windDirection: 270,
      visibility: 10,
      pressure: 30.15,
      ceiling: 25000,
      lastUpdated: new Date(),
    },
    traffic: {
      arrivals: 156,
      departures: 142,
      delays: 8,
      cancellations: 2,
      groundStops: false,
      averageDelay: 12,
    },
    status: "Operational",
    capacity: {
      hourly: 90,
      daily: 1200,
      annual: 62000000,
    },
    statistics: {
      dailyFlights: 298,
      dailyPassengers: 45000,
      onTimePerformance: 87,
      averageDelay: 12,
    },
    contact: {
      phone: "+1-718-244-4444",
      email: "info@jfkairport.com",
      website: "https://www.jfkairport.com",
    },
    lastUpdated: new Date(),
  },
  {
    id: "2",
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    country: "United States",
    timezone: "PST",
    coordinates: {
      latitude: 33.9425,
      longitude: -118.4081,
    },
    elevation: 125,
    runways: [
      {
        id: "1",
        name: "06L/24R",
        length: 10285,
        width: 200,
        surface: "Asphalt",
        status: "Active",
        heading: "06/24",
        lighting: true,
        ils: true,
      },
      {
        id: "2",
        name: "06R/24L",
        length: 12091,
        width: 200,
        surface: "Asphalt",
        status: "Active",
        heading: "06/24",
        lighting: true,
        ils: true,
      },
    ],
    terminals: [
      {
        id: "1",
        name: "Terminal 1",
        gates: 18,
        capacity: 10000,
        services: ["Check-in", "Restaurants", "Shops"],
        status: "Operational",
      },
      {
        id: "2",
        name: "Terminal 2",
        gates: 11,
        capacity: 8000,
        services: ["Check-in", "Restaurants", "Shops"],
        status: "Operational",
      },
      {
        id: "TBIT",
        name: "Tom Bradley International Terminal",
        gates: 18,
        capacity: 15000,
        services: [
          "Customs",
          "Immigration",
          "Duty Free",
          "Restaurants",
          "Lounges",
        ],
        status: "Operational",
      },
    ],
    gates: [
      {
        id: "1",
        number: "B7",
        terminal: "Tom Bradley International Terminal",
        type: "International",
        status: "Available",
      },
      {
        id: "2",
        number: "1A",
        terminal: "Terminal 1",
        type: "Domestic",
        status: "Occupied",
        currentFlight: "SW3456",
        aircraft: "Boeing 737",
        scheduledDeparture: "16:45",
      },
    ],
    services: [
      {
        id: "1",
        name: "Ground Handling",
        category: "Ground",
        provider: "Menzies Aviation",
        status: "Active",
        hours: "24/7",
      },
      {
        id: "2",
        name: "Cargo Operations",
        category: "Cargo",
        provider: "FedEx",
        status: "Active",
        hours: "24/7",
      },
    ],
    weather: {
      conditions: "Partly Cloudy",
      temperature: 68,
      humidity: 72,
      windSpeed: 6,
      windDirection: 250,
      visibility: 8,
      pressure: 29.92,
      ceiling: 15000,
      lastUpdated: new Date(),
    },
    traffic: {
      arrivals: 189,
      departures: 201,
      delays: 15,
      cancellations: 1,
      groundStops: false,
      averageDelay: 18,
    },
    status: "Operational",
    capacity: {
      hourly: 120,
      daily: 1800,
      annual: 88000000,
    },
    statistics: {
      dailyFlights: 390,
      dailyPassengers: 67000,
      onTimePerformance: 82,
      averageDelay: 18,
    },
    contact: {
      phone: "+1-855-463-5252",
      email: "info@lawa.org",
      website: "https://www.flylax.com",
    },
    lastUpdated: new Date(),
  },
  {
    id: "3",
    code: "ORD",
    name: "Chicago O'Hare International Airport",
    city: "Chicago",
    country: "United States",
    timezone: "CST",
    coordinates: {
      latitude: 41.9742,
      longitude: -87.9073,
    },
    elevation: 672,
    runways: [
      {
        id: "1",
        name: "04L/22R",
        length: 7500,
        width: 150,
        surface: "Asphalt",
        status: "Active",
        heading: "04/22",
        lighting: true,
        ils: true,
      },
      {
        id: "2",
        name: "10L/28R",
        length: 13000,
        width: 200,
        surface: "Asphalt",
        status: "Active",
        heading: "10/28",
        lighting: true,
        ils: true,
      },
      {
        id: "3",
        name: "14R/32L",
        length: 10801,
        width: 200,
        surface: "Asphalt",
        status: "Closed",
        heading: "14/32",
        lighting: true,
        ils: false,
      },
    ],
    terminals: [
      {
        id: "1",
        name: "Terminal 1",
        gates: 50,
        capacity: 18000,
        services: ["Check-in", "Restaurants", "Shops", "Lounges"],
        status: "Limited",
      },
      {
        id: "2",
        name: "Terminal 2",
        gates: 60,
        capacity: 20000,
        services: ["Check-in", "Restaurants", "Shops", "Lounges"],
        status: "Operational",
      },
      {
        id: "3",
        name: "Terminal 3",
        gates: 75,
        capacity: 25000,
        services: ["Check-in", "Restaurants", "Shops", "Lounges"],
        status: "Operational",
      },
    ],
    gates: [
      {
        id: "1",
        number: "C3",
        terminal: "Terminal 1",
        type: "Domestic",
        status: "Available",
      },
      {
        id: "2",
        number: "B15",
        terminal: "Terminal 2",
        type: "Both",
        status: "Occupied",
        currentFlight: "UA5678",
        aircraft: "Airbus A320",
        scheduledDeparture: "14:15",
      },
    ],
    services: [
      {
        id: "1",
        name: "Ground Handling",
        category: "Ground",
        provider: "United Ground Express",
        status: "Active",
        hours: "24/7",
      },
      {
        id: "2",
        name: "De-icing Services",
        category: "Ground",
        provider: "Airport Authority",
        status: "Active",
        hours: "Seasonal",
      },
    ],
    weather: {
      conditions: "Rain",
      temperature: 45,
      humidity: 85,
      windSpeed: 15,
      windDirection: 180,
      visibility: 3,
      pressure: 29.85,
      ceiling: 2000,
      lastUpdated: new Date(),
    },
    traffic: {
      arrivals: 234,
      departures: 198,
      delays: 45,
      cancellations: 8,
      groundStops: true,
      averageDelay: 35,
    },
    status: "Limited",
    capacity: {
      hourly: 150,
      daily: 2400,
      annual: 84000000,
    },
    statistics: {
      dailyFlights: 432,
      dailyPassengers: 78000,
      onTimePerformance: 68,
      averageDelay: 35,
    },
    contact: {
      phone: "+1-800-832-6352",
      email: "info@flychicago.com",
      website: "https://www.flychicago.com",
    },
    lastUpdated: new Date(),
  },
];

export function AirportProvider({ children }: { children: React.ReactNode }) {
  const [airports, setAirports] = useState<Airport[]>(initialAirports);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const updateAirportStatus = useCallback(
    (airportId: string, status: Airport["status"]) => {
      setAirports((prev) =>
        prev.map((airport) =>
          airport.id === airportId
            ? { ...airport, status, lastUpdated: new Date() }
            : airport
        )
      );
    },
    []
  );

  const updateRunwayStatus = useCallback(
    (airportId: string, runwayId: string, status: Runway["status"]) => {
      setAirports((prev) =>
        prev.map((airport) =>
          airport.id === airportId
            ? {
                ...airport,
                runways: airport.runways.map((runway) =>
                  runway.id === runwayId ? { ...runway, status } : runway
                ),
                lastUpdated: new Date(),
              }
            : airport
        )
      );
    },
    []
  );

  const updateGateStatus = useCallback(
    (airportId: string, gateId: string, status: Gate["status"]) => {
      setAirports((prev) =>
        prev.map((airport) =>
          airport.id === airportId
            ? {
                ...airport,
                gates: airport.gates.map((gate) =>
                  gate.id === gateId ? { ...gate, status } : gate
                ),
                lastUpdated: new Date(),
              }
            : airport
        )
      );
    },
    []
  );

  return (
    <AirportContext.Provider
      value={{
        airports,
        selectedAirport,
        setSelectedAirport,
        updateAirportStatus,
        updateRunwayStatus,
        updateGateStatus,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
      }}
    >
      {children}
    </AirportContext.Provider>
  );
}
