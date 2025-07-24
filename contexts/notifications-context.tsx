"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface Notification {
  id: string
  type: "emergency" | "weather" | "delay" | "security" | "maintenance" | "info"
  title: string
  message: string
  flightNumber?: string
  timestamp: Date
  priority: "low" | "medium" | "high" | "critical"
  read: boolean
  acknowledged: boolean
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read" | "acknowledged">) => void
  markAsRead: (id: string) => void
  markAsAcknowledged: (id: string) => void
  clearNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "emergency",
      title: "Emergency Landing",
      message: "Flight UA1234 requesting emergency landing due to engine failure",
      flightNumber: "UA1234",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: "critical",
      read: false,
      acknowledged: false,
    },
    {
      id: "2",
      type: "weather",
      title: "Severe Weather Alert",
      message: "Thunderstorms approaching JFK Airport. Expect delays.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      priority: "high",
      read: false,
      acknowledged: false,
    },
    {
      id: "3",
      type: "delay",
      title: "Flight Delay",
      message: "AA5678 delayed by 45 minutes due to air traffic congestion",
      flightNumber: "AA5678",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: "medium",
      read: true,
      acknowledged: true,
    },
    {
      id: "4",
      type: "security",
      title: "Security Alert",
      message: "Unattended baggage reported at Gate B12",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      priority: "high",
      read: false,
      acknowledged: false,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read" | "acknowledged">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
        acknowledged: false,
      }
      setNotifications((prev) => [newNotification, ...prev])
    },
    [],
  )

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAsAcknowledged = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, acknowledged: true, read: true } : n)))
  }, [])

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAsAcknowledged,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
