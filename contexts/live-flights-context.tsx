"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface LiveFlight {
  id: string
  flightNumber: string
  airline: string
  aircraft: string
  departure: {
    airport: string
    code: string
    time: string
    gate?: string
    terminal?: string
  }
  arrival: {
    airport: string
    code: string
    time: string
    gate?: string
    terminal?: string
  }
  status: "Scheduled" | "Boarding" | "Departed" | "En Route" | "Approaching" | "Landed" | "Delayed" | "Cancelled"
  position: {
    latitude: number
    longitude: number
    altitude: number
    speed: number
    heading: number
  }
  progress: number // 0-100 percentage of flight completion
  estimatedArrival: string
  delay: number // minutes
  passengers: number
  crew: number
  fuel: number // percentage
  weather: {
    conditions: string
    temperature: number
    windSpeed: number
    visibility: number
  }
  lastUpdate: Date
}

interface LiveFlightsContextType {
  flights: LiveFlight[]
  selectedFlight: LiveFlight | null
  setSelectedFlight: (flight: LiveFlight | null) => void
  updateFlightStatus: (flightId: string, status: LiveFlight["status"]) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  filteredFlights: LiveFlight[]
}

const LiveFlightsContext = createContext<LiveFlightsContextType | undefined>(undefined)

export function useLiveFlights() {
  const context = useContext(LiveFlightsContext)
  if (!context) {
    throw new Error("useLiveFlights must be used within a LiveFlightsProvider")
  }
  return context
}

// Sample flight data
const initialFlights: LiveFlight[] = [
  {
    id: "1",
    flightNumber: "AA1234",
    airline: "American Airlines",
    aircraft: "Boeing 737-800",
    departure: {
      airport: "John F. Kennedy International",
      code: "JFK",
      time: "08:30",
      gate: "A12",
      terminal: "Terminal 8",
    },
    arrival: {
      airport: "Los Angeles International",
      code: "LAX",
      time: "11:45",
      gate: "B7",
      terminal: "Terminal 6",
    },
    status: "En Route",
    position: {
      latitude: 39.8283,
      longitude: -98.5795,
      altitude: 35000,
      speed: 485,
      heading: 245,
    },
    progress: 65,
    estimatedArrival: "11:52",
    delay: 7,
    passengers: 156,
    crew: 6,
    fuel: 68,
    weather: {
      conditions: "Clear",
      temperature: -45,
      windSpeed: 25,
      visibility: 10,
    },
    lastUpdate: new Date(),
  },
  {
    id: "2",
    flightNumber: "UA5678",
    airline: "United Airlines",
    aircraft: "Airbus A320",
    departure: {
      airport: "Chicago O'Hare International",
      code: "ORD",
      time: "14:15",
      gate: "C3",
      terminal: "Terminal 1",
    },
    arrival: {
      airport: "San Francisco International",
      code: "SFO",
      time: "16:30",
      gate: "D15",
      terminal: "Terminal 3",
    },
    status: "Delayed",
    position: {
      latitude: 41.9742,
      longitude: -87.9073,
      altitude: 0,
      speed: 0,
      heading: 0,
    },
    progress: 0,
    estimatedArrival: "17:15",
    delay: 45,
    passengers: 142,
    crew: 5,
    fuel: 95,
    weather: {
      conditions: "Rain",
      temperature: 12,
      windSpeed: 15,
      visibility: 3,
    },
    lastUpdate: new Date(),
  },
  {
    id: "3",
    flightNumber: "DL9012",
    airline: "Delta Air Lines",
    aircraft: "Boeing 757-200",
    departure: {
      airport: "Hartsfield-Jackson Atlanta International",
      code: "ATL",
      time: "10:00",
      gate: "E8",
      terminal: "Terminal S",
    },
    arrival: {
      airport: "Miami International",
      code: "MIA",
      time: "12:15",
      gate: "F12",
      terminal: "Terminal N",
    },
    status: "Approaching",
    position: {
      latitude: 25.7617,
      longitude: -80.1918,
      altitude: 8000,
      speed: 320,
      heading: 180,
    },
    progress: 95,
    estimatedArrival: "12:18",
    delay: 3,
    passengers: 189,
    crew: 7,
    fuel: 22,
    weather: {
      conditions: "Partly Cloudy",
      temperature: 28,
      windSpeed: 8,
      visibility: 8,
    },
    lastUpdate: new Date(),
  },
  {
    id: "4",
    flightNumber: "SW3456",
    airline: "Southwest Airlines",
    aircraft: "Boeing 737-700",
    departure: {
      airport: "Denver International",
      code: "DEN",
      time: "16:45",
      gate: "A25",
      terminal: "Terminal A",
    },
    arrival: {
      airport: "Phoenix Sky Harbor International",
      code: "PHX",
      time: "18:20",
      gate: "B18",
      terminal: "Terminal 4",
    },
    status: "Boarding",
    position: {
      latitude: 39.8561,
      longitude: -104.6737,
      altitude: 0,
      speed: 0,
      heading: 0,
    },
    progress: 0,
    estimatedArrival: "18:20",
    delay: 0,
    passengers: 134,
    crew: 5,
    fuel: 98,
    weather: {
      conditions: "Clear",
      temperature: 22,
      windSpeed: 12,
      visibility: 10,
    },
    lastUpdate: new Date(),
  },
]

export function LiveFlightsProvider({ children }: { children: React.ReactNode }) {
  const [flights, setFlights] = useState<LiveFlight[]>(initialFlights)
  const [selectedFlight, setSelectedFlight] = useState<LiveFlight | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prevFlights) =>
        prevFlights.map((flight) => {
          // Simulate position updates for en route flights
          if (flight.status === "En Route") {
            const newProgress = Math.min(flight.progress + Math.random() * 2, 100)
            return {
              ...flight,
              progress: newProgress,
              position: {
                ...flight.position,
                // Simulate movement
                latitude: flight.position.latitude + (Math.random() - 0.5) * 0.1,
                longitude: flight.position.longitude + (Math.random() - 0.5) * 0.1,
                altitude: flight.position.altitude + (Math.random() - 0.5) * 1000,
                speed: flight.position.speed + (Math.random() - 0.5) * 20,
              },
              fuel: Math.max(flight.fuel - Math.random() * 0.5, 10),
              lastUpdate: new Date(),
            }
          }
          return flight
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const updateFlightStatus = useCallback((flightId: string, status: LiveFlight["status"]) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) => (flight.id === flightId ? { ...flight, status, lastUpdate: new Date() } : flight)),
    )
  }, [])

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || flight.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <LiveFlightsContext.Provider
      value={{
        flights,
        selectedFlight,
        setSelectedFlight,
        updateFlightStatus,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        filteredFlights,
      }}
    >
      {children}
    </LiveFlightsContext.Provider>
  )
}
