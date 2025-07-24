"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, AlertTriangle, CheckCircle, Users } from "lucide-react"
import { useLiveFlights } from "@/contexts/live-flights-context"

export function LiveFlightStats() {
  const { flights } = useLiveFlights()

  const stats = {
    total: flights.length,
    enRoute: flights.filter((f) => f.status === "En Route").length,
    onTime: flights.filter((f) => f.delay <= 5).length,
    delayed: flights.filter((f) => f.delay > 5).length,
    cancelled: flights.filter((f) => f.status === "Cancelled").length,
    totalPassengers: flights.reduce((sum, f) => sum + f.passengers, 0),
    avgDelay: Math.round(flights.reduce((sum, f) => sum + f.delay, 0) / flights.length),
    onTimePercentage: Math.round((flights.filter((f) => f.delay <= 5).length / flights.length) * 100),
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Flights</CardTitle>
          <Plane className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {stats.enRoute} En Route
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.onTimePercentage}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.onTime} of {stats.total} flights on time
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Delays & Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.delayed}</div>
          <p className="text-xs text-muted-foreground">Avg delay: {stats.avgDelay} minutes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPassengers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Across all active flights</p>
        </CardContent>
      </Card>
    </div>
  )
}
