"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Aircraft, useFleet } from "@/contexts/fleet-context";

export function AircraftTable() {
  const { aircraft, setSelectedAircraft, deleteAircraft } = useFleet();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAircraft = aircraft.filter((aircraft: Aircraft) => {
    const matchesSearch =
      aircraft.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || aircraft.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Aircraft["status"]) => {
    const variants = {
      Active: "default",
      Maintenance: "secondary",
      Grounded: "destructive",
      Retired: "outline",
    } as const;

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getTypeBadge = (type: Aircraft["type"]) => {
    const colors = {
      Commercial: "bg-blue-100 text-blue-800",
      Cargo: "bg-green-100 text-green-800",
      Private: "bg-purple-100 text-purple-800",
    };

    return <Badge className={colors[type]}>{type}</Badge>;
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this aircraft?")) {
      deleteAircraft(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search aircraft..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Status: {statusFilter === "all" ? "All" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Maintenance")}>
              Maintenance
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Grounded")}>
              Grounded
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Retired")}>
              Retired
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registration</TableHead>
              <TableHead>Aircraft</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Flight Hours</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAircraft.map((aircraft) => (
              <TableRow key={aircraft.id}>
                <TableCell className="font-medium">
                  {aircraft.registration}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{aircraft.model}</div>
                    <div className="text-sm text-muted-foreground">
                      {aircraft.manufacturer}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(aircraft.type)}</TableCell>
                <TableCell>{getStatusBadge(aircraft.status)}</TableCell>
                <TableCell>{aircraft.location}</TableCell>
                <TableCell>{aircraft.flightHours.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(aircraft.nextMaintenance).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedAircraft(aircraft)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(aircraft.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
