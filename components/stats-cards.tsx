import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Active Flights",
      value: "247",
      change: "+12 from yesterday",
      icon: Plane,
      color: "text-blue-600",
    },
    {
      title: "On Time Performance",
      value: "94.2%",
      change: "+2.1% from last week",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Delayed Flights",
      value: "18",
      change: "-5 from yesterday",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Critical Alerts",
      value: "3",
      change: "2 weather, 1 technical",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
