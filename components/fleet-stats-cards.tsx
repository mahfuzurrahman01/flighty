"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFleet } from "@/contexts/fleet-context";
import {
  Plane,
  Wrench,
  AlertTriangle,
  Clock,
  TrendingUp,
  Fuel,
} from "lucide-react";

export function FleetStatsCards() {
  const { getFleetStats } = useFleet();
  const stats = getFleetStats();

  const cards = [
    {
      title: "Total Aircraft",
      value: stats.total.toString(),
      icon: Plane,
      description: "Active fleet size",
      color: "text-blue-600",
    },
    {
      title: "Active Aircraft",
      value: stats.active.toString(),
      icon: TrendingUp,
      description: "Currently operational",
      color: "text-green-600",
    },
    {
      title: "In Maintenance",
      value: stats.maintenance.toString(),
      icon: Wrench,
      description: "Undergoing maintenance",
      color: "text-yellow-600",
    },
    {
      title: "Grounded",
      value: stats.grounded.toString(),
      icon: AlertTriangle,
      description: "Out of service",
      color: "text-red-600",
    },
    {
      title: "Average Age",
      value: `${stats.avgAge} years`,
      icon: Clock,
      description: "Fleet average age",
      color: "text-purple-600",
    },
    {
      title: "Total Flight Hours",
      value: stats.totalFlightHours.toLocaleString(),
      icon: Fuel,
      description: "Cumulative hours",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
