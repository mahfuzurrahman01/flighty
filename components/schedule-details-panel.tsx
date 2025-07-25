"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Plane,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react";
import { useFlightSchedule } from "@/contexts/flight-schedule-context";

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800",
  Confirmed: "bg-green-100 text-green-800",
  Delayed: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Boarding: "bg-purple-100 text-purple-800",
  Departed: "bg-gray-100 text-gray-800",
};

export function ScheduleDetailsPanel() {
  const { selectedFlight, deleteFlight } = useFlightSchedule();

  if (!selectedFlight) {
    return (
      <Card className="h-[700px]">
        <CardContent className="flex items-center justify-center h-full text-center">
          <div className="space-y-4">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-medium">Select a Flight</h3>
              <p className="text-sm text-muted-foreground">
                Click on a flight in the calendar or table to view schedule
                details
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const loadFactor = Math.round(
    (selectedFlight.passengers.booked / selectedFlight.passengers.capacity) *
      100
  );

  return (
    <Card className="h-[700px] overflow-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {selectedFlight.flightNumber}
          </CardTitle>
          <Badge
            variant="secondary"
            className={statusColors[selectedFlight.status]}
          >
            {selectedFlight.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedFlight.airline}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Route Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Route Details
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Departure</div>
              <div className="text-lg font-bold">
                {selectedFlight.departure.code}
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedFlight.departure.airport}
              </div>
              <div className="text-sm">
                {selectedFlight.departure.scheduledTime}
              </div>
              {selectedFlight.departure.gate && (
                <div className="text-xs text-muted-foreground">
                  Gate {selectedFlight.departure.gate} •{" "}
                  {selectedFlight.departure.terminal}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Arrival</div>
              <div className="text-lg font-bold">
                {selectedFlight.arrival.code}
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedFlight.arrival.airport}
              </div>
              <div className="text-sm">
                {selectedFlight.arrival.scheduledTime}
              </div>
              {selectedFlight.arrival.gate && (
                <div className="text-xs text-muted-foreground">
                  Gate {selectedFlight.arrival.gate} •{" "}
                  {selectedFlight.arrival.terminal}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance:</span>
              <span className="font-medium">
                {selectedFlight.route.distance} miles
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">
                {selectedFlight.route.duration}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Aircraft & Crew */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Aircraft & Crew
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Aircraft:</span>
              <span className="font-medium">{selectedFlight.aircraft}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pilots:</span>
              <span className="font-medium">{selectedFlight.crew.pilots}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Flight Attendants:</span>
              <span className="font-medium">
                {selectedFlight.crew.flightAttendants}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Schedule Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Schedule
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency:</span>
              <span className="font-medium">{selectedFlight.frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days:</span>
              <span className="font-medium">
                {selectedFlight.daysOfWeek.join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Effective:</span>
              <span className="font-medium">
                {selectedFlight.effectiveDate}
              </span>
            </div>
            {selectedFlight.expiryDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires:</span>
                <span className="font-medium">{selectedFlight.expiryDate}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Passenger Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Passenger Load
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Load Factor</span>
              <span className="text-sm font-medium">{loadFactor}%</span>
            </div>
            <Progress value={loadFactor} className="w-full" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-muted/50 rounded">
                <div className="text-lg font-bold">
                  {selectedFlight.passengers.capacity}
                </div>
                <div className="text-xs text-muted-foreground">Capacity</div>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <div className="text-lg font-bold">
                  {selectedFlight.passengers.booked}
                </div>
                <div className="text-xs text-muted-foreground">Booked</div>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <div className="text-lg font-bold">
                  {selectedFlight.passengers.available}
                </div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Pricing Information */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Pricing
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Economy:</span>
              <span className="font-medium">
                ${selectedFlight.pricing.economy}
              </span>
            </div>
            {selectedFlight.pricing.business > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Business:</span>
                <span className="font-medium">
                  ${selectedFlight.pricing.business}
                </span>
              </div>
            )}
            {selectedFlight.pricing.firstClass > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">First Class:</span>
                <span className="font-medium">
                  ${selectedFlight.pricing.firstClass}
                </span>
              </div>
            )}
          </div>
        </div>

        {selectedFlight.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Notes</h4>
              <p className="text-sm text-muted-foreground">
                {selectedFlight.notes}
              </p>
            </div>
          </>
        )}

        <Separator />

        {/* Metadata */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>Created by: {selectedFlight.createdBy}</div>
          <div>
            Last modified: {selectedFlight.lastModified.toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Schedule
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent text-red-600 hover:text-red-700"
            size="sm"
            onClick={() => deleteFlight(selectedFlight.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
