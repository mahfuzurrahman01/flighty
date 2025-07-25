"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export interface ATCCommunication {
  id: string;
  flightNumber: string;
  callSign: string;
  type: "takeoff" | "landing" | "altitude" | "course" | "general";
  status: "pending" | "approved" | "denied" | "completed";
  request: string;
  response?: string;
  timestamp: Date;
  priority: "low" | "medium" | "high" | "emergency";
  controller: string;
  frequency: string;
}

export interface FlightContact {
  flightNumber: string;
  callSign: string;
  aircraft: string;
  altitude: number;
  speed: number;
  heading: number;
  position: { lat: number; lng: number };
  destination: string;
  origin: string;
  status: "airborne" | "taxiing" | "holding" | "approach" | "departed";
  frequency: string;
  lastContact: Date;
}

interface ATCContextType {
  communications: ATCCommunication[];
  activeFlights: FlightContact[];
  selectedFlight: FlightContact | null;
  addCommunication: (
    communication: Omit<ATCCommunication, "id" | "timestamp">
  ) => void;
  updateCommunication: (id: string, updates: Partial<ATCCommunication>) => void;
  selectFlight: (flight: FlightContact | null) => void;
  approveClearance: (id: string, response: string) => void;
  denyClearance: (id: string, response: string) => void;
}

const ATCContext = createContext<ATCContextType | undefined>(undefined);

export function useATC() {
  const context = useContext(ATCContext);
  if (!context) {
    throw new Error("useATC must be used within an ATCProvider");
  }
  return context;
}

export function ATCProvider({ children }: { children: React.ReactNode }) {
  const [communications, setCommunications] = useState<ATCCommunication[]>([
    {
      id: "1",
      flightNumber: "AA123",
      callSign: "American 123",
      type: "takeoff",
      status: "pending",
      request: "Request takeoff clearance, runway 24L",
      timestamp: new Date(Date.now() - 5 * 60000),
      priority: "medium",
      controller: "Tower",
      frequency: "118.1",
    },
    {
      id: "2",
      flightNumber: "UA456",
      callSign: "United 456",
      type: "landing",
      status: "approved",
      request: "Request landing clearance, runway 06R",
      response: "United 456, cleared to land runway 06R, wind 070 at 8",
      timestamp: new Date(Date.now() - 10 * 60000),
      priority: "high",
      controller: "Approach",
      frequency: "119.9",
    },
    {
      id: "3",
      flightNumber: "DL789",
      callSign: "Delta 789",
      type: "altitude",
      status: "pending",
      request: "Request climb to FL350",
      timestamp: new Date(Date.now() - 2 * 60000),
      priority: "medium",
      controller: "Center",
      frequency: "124.5",
    },
  ]);

  const [activeFlights] = useState<FlightContact[]>([
    {
      flightNumber: "AA123",
      callSign: "American 123",
      aircraft: "Boeing 737-800",
      altitude: 0,
      speed: 0,
      heading: 240,
      position: { lat: 40.6413, lng: -73.7781 },
      destination: "LAX",
      origin: "JFK",
      status: "taxiing",
      frequency: "118.1",
      lastContact: new Date(Date.now() - 5 * 60000),
    },
    {
      flightNumber: "UA456",
      callSign: "United 456",
      aircraft: "Airbus A320",
      altitude: 3500,
      speed: 180,
      heading: 60,
      position: { lat: 40.6892, lng: -73.837 },
      destination: "JFK",
      origin: "ORD",
      status: "approach",
      frequency: "119.9",
      lastContact: new Date(Date.now() - 1 * 60000),
    },
    {
      flightNumber: "DL789",
      callSign: "Delta 789",
      aircraft: "Boeing 757-200",
      altitude: 31000,
      speed: 480,
      heading: 90,
      position: { lat: 41.2033, lng: -77.2945 },
      destination: "ATL",
      origin: "JFK",
      status: "airborne",
      frequency: "124.5",
      lastContact: new Date(Date.now() - 2 * 60000),
    },
  ]);

  const [selectedFlight, setSelectedFlight] = useState<FlightContact | null>(
    null
  );

  const addCommunication = (
    communication: Omit<ATCCommunication, "id" | "timestamp">
  ) => {
    const newCommunication: ATCCommunication = {
      ...communication,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setCommunications((prev) => [newCommunication, ...prev]);
  };

  const updateCommunication = (
    id: string,
    updates: Partial<ATCCommunication>
  ) => {
    setCommunications((prev) =>
      prev.map((comm) => (comm.id === id ? { ...comm, ...updates } : comm))
    );
  };

  const selectFlight = (flight: FlightContact | null) => {
    setSelectedFlight(flight);
  };

  const approveClearance = (id: string, response: string) => {
    updateCommunication(id, { status: "approved", response });
  };

  const denyClearance = (id: string, response: string) => {
    updateCommunication(id, { status: "denied", response });
  };

  return (
    <ATCContext.Provider
      value={{
        communications,
        activeFlights,
        selectedFlight,
        addCommunication,
        updateCommunication,
        selectFlight,
        approveClearance,
        denyClearance,
      }}
    >
      {children}
    </ATCContext.Provider>
  );
}
