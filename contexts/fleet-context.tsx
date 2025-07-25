"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface Aircraft {
  id: string;
  registration: string;
  model: string;
  manufacturer: string;
  type: "Commercial" | "Cargo" | "Private";
  capacity: number;
  status: "Active" | "Maintenance" | "Grounded" | "Retired";
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  flightHours: number;
  cycles: number;
  yearManufactured: number;
  owner: string;
  operator: string;
  engines: string;
  maxRange: number;
  cruiseSpeed: number;
  fuelCapacity: number;
  notes?: string;
}

export interface MaintenanceRecord {
  id: string;
  aircraftId: string;
  type: "Scheduled" | "Unscheduled" | "Inspection" | "Repair";
  description: string;
  date: string;
  duration: number;
  cost: number;
  technician: string;
  status: "Completed" | "In Progress" | "Scheduled";
  priority: "Low" | "Medium" | "High" | "Critical";
}

interface FleetContextType {
  aircraft: Aircraft[];
  maintenanceRecords: MaintenanceRecord[];
  selectedAircraft: Aircraft | null;
  setSelectedAircraft: (aircraft: Aircraft | null) => void;
  addAircraft: (aircraft: Omit<Aircraft, "id">) => void;
  updateAircraft: (id: string, aircraft: Partial<Aircraft>) => void;
  deleteAircraft: (id: string) => void;
  addMaintenanceRecord: (record: Omit<MaintenanceRecord, "id">) => void;
  getMaintenanceByAircraft: (aircraftId: string) => MaintenanceRecord[];
  getFleetStats: () => {
    total: number;
    active: number;
    maintenance: number;
    grounded: number;
    avgAge: number;
    totalFlightHours: number;
  };
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function useFleet() {
  const context = useContext(FleetContext);
  if (context === undefined) {
    throw new Error("useFleet must be used within a FleetProvider");
  }
  return context;
}

export function FleetProvider({ children }: { children: React.ReactNode }) {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<
    MaintenanceRecord[]
  >([]);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(
    null
  );

  // Initialize with sample data
  useEffect(() => {
    const sampleAircraft: Aircraft[] = [
      {
        id: "1",
        registration: "N123AA",
        model: "Boeing 737-800",
        manufacturer: "Boeing",
        type: "Commercial",
        capacity: 162,
        status: "Active",
        location: "JFK Airport",
        lastMaintenance: "2024-01-15",
        nextMaintenance: "2024-04-15",
        flightHours: 45230,
        cycles: 28450,
        yearManufactured: 2018,
        owner: "American Airlines",
        operator: "American Airlines",
        engines: "CFM56-7B",
        maxRange: 3383,
        cruiseSpeed: 453,
        fuelCapacity: 6875,
        notes: "Recently upgraded avionics",
      },
      {
        id: "2",
        registration: "N456UA",
        model: "Airbus A320",
        manufacturer: "Airbus",
        type: "Commercial",
        capacity: 150,
        status: "Maintenance",
        location: "ORD Maintenance Hangar",
        lastMaintenance: "2024-01-20",
        nextMaintenance: "2024-02-20",
        flightHours: 38920,
        cycles: 24680,
        yearManufactured: 2019,
        owner: "United Airlines",
        operator: "United Airlines",
        engines: "V2500",
        maxRange: 3300,
        cruiseSpeed: 447,
        fuelCapacity: 6400,
        notes: "Engine inspection in progress",
      },
      {
        id: "3",
        registration: "N789DL",
        model: "Boeing 757-200",
        manufacturer: "Boeing",
        type: "Commercial",
        capacity: 200,
        status: "Active",
        location: "ATL Airport",
        lastMaintenance: "2024-01-10",
        nextMaintenance: "2024-03-10",
        flightHours: 67890,
        cycles: 42350,
        yearManufactured: 2015,
        owner: "Delta Air Lines",
        operator: "Delta Air Lines",
        engines: "RB211-535E4",
        maxRange: 4488,
        cruiseSpeed: 459,
        fuelCapacity: 11276,
        notes: "High utilization aircraft",
      },
      {
        id: "4",
        registration: "N321SW",
        model: "Boeing 737-700",
        manufacturer: "Boeing",
        type: "Commercial",
        capacity: 143,
        status: "Grounded",
        location: "DAL Maintenance Base",
        lastMaintenance: "2024-01-05",
        nextMaintenance: "2024-02-05",
        flightHours: 52340,
        cycles: 35670,
        yearManufactured: 2016,
        owner: "Southwest Airlines",
        operator: "Southwest Airlines",
        engines: "CFM56-7B",
        maxRange: 3010,
        cruiseSpeed: 453,
        fuelCapacity: 6875,
        notes: "Awaiting parts for repair",
      },
      {
        id: "5",
        registration: "N555FX",
        model: "Boeing 767-300F",
        manufacturer: "Boeing",
        type: "Cargo",
        capacity: 0,
        status: "Active",
        location: "MEM Airport",
        lastMaintenance: "2024-01-12",
        nextMaintenance: "2024-04-12",
        flightHours: 41250,
        cycles: 18920,
        yearManufactured: 2017,
        owner: "FedEx",
        operator: "FedEx",
        engines: "CF6-80C2",
        maxRange: 6025,
        cruiseSpeed: 459,
        fuelCapacity: 16700,
        notes: "Cargo conversion completed 2020",
      },
    ];

    const sampleMaintenance: MaintenanceRecord[] = [
      {
        id: "1",
        aircraftId: "1",
        type: "Scheduled",
        description: "A-Check maintenance",
        date: "2024-01-15",
        duration: 8,
        cost: 25000,
        technician: "John Smith",
        status: "Completed",
        priority: "Medium",
      },
      {
        id: "2",
        aircraftId: "2",
        type: "Unscheduled",
        description: "Engine inspection",
        date: "2024-01-20",
        duration: 24,
        cost: 45000,
        technician: "Mike Johnson",
        status: "In Progress",
        priority: "High",
      },
      {
        id: "3",
        aircraftId: "3",
        type: "Inspection",
        description: "Annual inspection",
        date: "2024-01-10",
        duration: 16,
        cost: 35000,
        technician: "Sarah Wilson",
        status: "Completed",
        priority: "Medium",
      },
    ];

    setAircraft(sampleAircraft);
    setMaintenanceRecords(sampleMaintenance);
  }, []);

  const addAircraft = (newAircraft: Omit<Aircraft, "id">) => {
    const aircraft: Aircraft = {
      ...newAircraft,
      id: Date.now().toString(),
    };
    setAircraft((prev) => [...prev, aircraft]);
  };

  const updateAircraft = (id: string, updates: Partial<Aircraft>) => {
    setAircraft((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteAircraft = (id: string) => {
    setAircraft((prev) => prev.filter((a) => a.id !== id));
    setMaintenanceRecords((prev) => prev.filter((r) => r.aircraftId !== id));
  };

  const addMaintenanceRecord = (newRecord: Omit<MaintenanceRecord, "id">) => {
    const record: MaintenanceRecord = {
      ...newRecord,
      id: Date.now().toString(),
    };
    setMaintenanceRecords((prev) => [...prev, record]);
  };

  const getMaintenanceByAircraft = (aircraftId: string) => {
    return maintenanceRecords.filter((r) => r.aircraftId === aircraftId);
  };

  const getFleetStats = () => {
    const total = aircraft.length;
    const active = aircraft.filter((a) => a.status === "Active").length;
    const maintenance = aircraft.filter(
      (a) => a.status === "Maintenance"
    ).length;
    const grounded = aircraft.filter((a) => a.status === "Grounded").length;

    const currentYear = new Date().getFullYear();
    const avgAge =
      aircraft.length > 0
        ? aircraft.reduce(
            (sum, a) => sum + (currentYear - a.yearManufactured),
            0
          ) / aircraft.length
        : 0;

    const totalFlightHours = aircraft.reduce(
      (sum, a) => sum + a.flightHours,
      0
    );

    return {
      total,
      active,
      maintenance,
      grounded,
      avgAge: Math.round(avgAge * 10) / 10,
      totalFlightHours,
    };
  };

  return (
    <FleetContext.Provider
      value={{
        aircraft,
        maintenanceRecords,
        selectedAircraft,
        setSelectedAircraft,
        addAircraft,
        updateAircraft,
        deleteAircraft,
        addMaintenanceRecord,
        getMaintenanceByAircraft,
        getFleetStats,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
}
