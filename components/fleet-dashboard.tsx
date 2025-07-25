"use client";

import { AircraftTable } from "@/components/aircraft-table";
import { AircraftDetailsPanel } from "@/components/aircraft-details-panel";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import { FleetStatsCards } from "./fleet-stats-cards";

export function FleetDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Aircraft Fleet Management</h2>
          <p className="text-muted-foreground">
            Manage your aircraft fleet, maintenance schedules, and operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Aircraft
          </Button>
        </div>
      </div>

      {/* Fleet Statistics */}
      <FleetStatsCards />

      {/* Aircraft Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fleet Overview</h3>
        <AircraftTable />
      </div>

      {/* Aircraft Details Panel (Modal) */}
      <AircraftDetailsPanel />
    </div>
  );
}
