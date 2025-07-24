"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Plane, MapPin, Clock, Users, Fuel, Thermometer, Wind, Eye, AlertTriangle, Navigation } from "lucide-react"
import type { LiveFlight } from "@/contexts/live-flights-context"

interface FlightDetailsPanelProps {
  flight: LiveFlight | null
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
}

export function FlightDetailsPanel({ flight }: FlightDetailsPanelProps) {
  if (!flight) {
    return (
      <Card className="h-[600px]">
        <CardContent className="flex items-center justify-center h-full text-center">
          <div className="space-y-4">
            <Plane className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-medium">Select a Flight</h3>
              <p className="text-sm text-muted-foreground">
                Click on a flight in the map or table to view detailed information
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-[600px] overflow-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{flight.flightNumber}</CardTitle>
          <Badge variant="secondary" className={statusColors[flight.status]}>
            {flight.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{flight.airline}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Route Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Route
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Departure</div>
              <div className="text-lg font-bold">{flight.departure.code}</div>
              <div className="text-xs text-muted-foreground">{flight.departure.airport}</div>
              <div className="text-sm">{flight.departure.time}</div>
              {flight.departure.gate && (
                <div className="text-xs text-muted-foreground">
                  Gate {flight.departure.gate} • {flight.departure.terminal}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Arrival</div>
              <div className="text-lg font-bold">{flight.arrival.code}</div>
              <div className="text-xs text-muted-foreground">{flight.arrival.airport}</div>
              <div className="text-sm">{flight.estimatedArrival}</div>
              {flight.arrival.gate && (
                <div className="text-xs text-muted-foreground">
                  Gate {flight.arrival.gate} • {flight.arrival.terminal}
                </div>
              )}
            </div>
          </div>

          {/* Flight Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Flight Progress</span>
              <span>{flight.progress}%</span>
            </div>
            <Progress value={flight.progress} className="w-full" />
          </div>
        </div>

        <Separator />

        {/* Aircraft Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Aircraft
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{flight.aircraft}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Altitude:</span>
              <span className="font-medium">{flight.position.altitude.toLocaleString()} ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Speed:</span>
              <span className="font-medium">{flight.position.speed} mph</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heading:</span>
              <span className="font-medium flex items-center gap-1">
                <Navigation className="h-3 w-3" />
                {flight.position.heading}°
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Passengers & Crew */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Passengers & Crew
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{flight.passengers}</div>
              <div className="text-muted-foreground">Passengers</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">{flight.crew}</div>
              <div className="text-muted-foreground">Crew</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Fuel Status */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            Fuel Status
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Fuel Level</span>
              <span className={flight.fuel < 30 ? "text-red-600 font-medium" : ""}>{flight.fuel}%</span>
            </div>
            <Progress value={flight.fuel} className={`w-full ${flight.fuel < 30 ? "text-red-600" : ""}`} />
            {flight.fuel < 30 && (
              <div className="flex items-center gap-2 text-xs text-red-600">
                <AlertTriangle className="h-3 w-3" />
                Low fuel warning
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Weather Conditions */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Weather
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conditions:</span>
              <span className="font-medium">{flight.weather.conditions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature:</span>
              <span className="font-medium">{flight.weather.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wind Speed:</span>
              <span className="font-medium flex items-center gap-1">
                <Wind className="h-3 w-3" />
                {flight.weather.windSpeed} mph
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visibility:</span>
              <span className="font-medium">{flight.weather.visibility} miles</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Delay Information */}
        {flight.delay > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2 text-red-600">
              <Clock className="h-4 w-4" />
              Delay Information
            </h4>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm">
                <div className="font-medium text-red-800">Delayed by {flight.delay} minutes</div>
                <div className="text-red-600 text-xs mt-1">New estimated arrival: {flight.estimatedArrival}</div>
              </div>
            </div>
          </div>
        )}

        {/* Last Update */}
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {flight.lastUpdate.toLocaleString()}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Track Flight
          </Button>
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            Contact Aircraft
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
