"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Map, List, Plane } from "lucide-react"
import { useLiveFlights } from "@/contexts/live-flights-context"
import { LiveFlightMap } from "@/components/live-flight-map"
import { LiveFlightTable } from "@/components/live-flight-table"
import { FlightDetailsPanel } from "@/components/flight-details-panel"
import { LiveFlightStats } from "@/components/live-flight-stats"

export function LiveFlightsDashboard() {
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredFlights, selectedFlight } = useLiveFlights()

  const [viewMode, setViewMode] = useState<"map" | "table">("map")

  return (
    <div className="space-y-6">
      {/* Live Flight Statistics */}
      <LiveFlightStats />

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Live Flight Tracking
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search flights, airlines, airports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="departed">Departed</SelectItem>
                  <SelectItem value="en route">En Route</SelectItem>
                  <SelectItem value="approaching">Approaching</SelectItem>
                  <SelectItem value="landed">Landed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="rounded-r-none"
                >
                  <Map className="h-4 w-4 mr-2" />
                  Map
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4 mr-2" />
                  Table
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Showing {filteredFlights.length} flights</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {filteredFlights.filter((f) => f.status === "En Route").length} En Route
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filteredFlights.filter((f) => f.status === "Boarding").length} Boarding
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {filteredFlights.filter((f) => f.status === "Delayed").length} Delayed
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {filteredFlights.filter((f) => f.status === "Cancelled").length} Cancelled
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Flight Tracking View */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              {viewMode === "map" ? (
                <LiveFlightMap flights={filteredFlights} />
              ) : (
                <LiveFlightTable flights={filteredFlights} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Flight Details Panel */}
        <div className="lg:col-span-1">
          <FlightDetailsPanel flight={selectedFlight} />
        </div>
      </div>
    </div>
  )
}
