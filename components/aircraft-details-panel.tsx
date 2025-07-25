"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Plane,
  MapPin,
  Clock,
  Wrench,
  FileText,
  TrendingUp,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFleet } from "@/contexts/fleet-context";

export function AircraftDetailsPanel() {
  const { selectedAircraft, setSelectedAircraft, getMaintenanceByAircraft } =
    useFleet();

  if (!selectedAircraft) return null;

  const maintenanceRecords = getMaintenanceByAircraft(selectedAircraft.id);

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "default",
      Maintenance: "secondary",
      Grounded: "destructive",
      Retired: "outline",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status}
      </Badge>
    );
  };

  const getMaintenanceStatusBadge = (status: string) => {
    const variants = {
      Completed: "default",
      "In Progress": "secondary",
      Scheduled: "outline",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      Low: "outline",
      Medium: "secondary",
      High: "default",
      Critical: "destructive",
    } as const;

    return (
      <Badge variant={variants[priority as keyof typeof variants] || "default"}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedAircraft.registration}
            </h2>
            <p className="text-muted-foreground">{selectedAircraft.model}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedAircraft(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Aircraft Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Registration
                    </label>
                    <p className="font-medium">
                      {selectedAircraft.registration}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedAircraft.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Model
                    </label>
                    <p className="font-medium">{selectedAircraft.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Manufacturer
                    </label>
                    <p className="font-medium">
                      {selectedAircraft.manufacturer}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Type
                    </label>
                    <p className="font-medium">{selectedAircraft.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Year
                    </label>
                    <p className="font-medium">
                      {selectedAircraft.yearManufactured}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Current Location
                    </label>
                    <p className="font-medium">{selectedAircraft.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Capacity
                    </label>
                    <p className="font-medium">
                      {selectedAircraft.capacity} passengers
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Owner
                    </label>
                    <p className="font-medium">{selectedAircraft.owner}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Operator
                    </label>
                    <p className="font-medium">{selectedAircraft.operator}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Technical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Engines
                  </label>
                  <p className="font-medium">{selectedAircraft.engines}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Max Range
                  </label>
                  <p className="font-medium">
                    {selectedAircraft.maxRange.toLocaleString()} nm
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Cruise Speed
                  </label>
                  <p className="font-medium">
                    {selectedAircraft.cruiseSpeed} kts
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Fuel Capacity
                  </label>
                  <p className="font-medium">
                    {selectedAircraft.fuelCapacity.toLocaleString()} lbs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Utilization & Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Flight Hours
                  </label>
                  <p className="font-medium">
                    {selectedAircraft.flightHours.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Cycles
                  </label>
                  <p className="font-medium">
                    {selectedAircraft.cycles.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Maintenance
                  </label>
                  <p className="font-medium">
                    {new Date(
                      selectedAircraft.lastMaintenance
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Next Maintenance
                  </label>
                  <p className="font-medium">
                    {new Date(
                      selectedAircraft.nextMaintenance
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Recent Maintenance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {maintenanceRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceRecords.slice(0, 5).map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>
                          {getMaintenanceStatusBadge(record.status)}
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(record.priority)}
                        </TableCell>
                        <TableCell>${record.cost.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">
                  No maintenance records found.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {selectedAircraft.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedAircraft.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
