"use client"

import { useEffect } from "react"
import { useNotifications } from "@/contexts/notifications-context"

// Simulated flight monitoring system
export function AutomatedAlerts() {
  const { addNotification } = useNotifications()

  useEffect(() => {
    // Simulate automated alert generation
    const interval = setInterval(() => {
      const alertTypes = [
        {
          type: "weather" as const,
          title: "Weather Update",
          message: "Visibility reduced to 2 miles at LAX due to fog",
          priority: "medium" as const,
        },
        {
          type: "delay" as const,
          title: "Traffic Congestion",
          message: "Ground stop implemented at ORD due to air traffic congestion",
          priority: "high" as const,
        },
        {
          type: "maintenance" as const,
          title: "Runway Maintenance",
          message: "Runway 24L at JFK closed for emergency maintenance",
          priority: "high" as const,
        },
      ]

      // Randomly generate an alert (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
        addNotification(randomAlert)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [addNotification])

  return null
}
