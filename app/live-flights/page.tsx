"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, RefreshCw } from "lucide-react"
import { NotificationsProvider } from "@/contexts/notifications-context"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ToastNotifications } from "@/components/toast-notifications"
import { AutomatedAlerts } from "@/components/automated-alerts"
import { LiveFlightsProvider } from "@/contexts/live-flights-context"
import { LiveFlightsDashboard } from "@/components/live-flights-dashboard"

export default function LiveFlightsPage() {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-1 items-center gap-2">
              <h1 className="text-lg font-semibold">Live Flight Tracking</h1>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search flights..." className="pl-8 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <NotificationsDropdown />
              </div>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <LiveFlightsProvider>
              <LiveFlightsDashboard />
            </LiveFlightsProvider>
          </div>
        </SidebarInset>
        <ToastNotifications />
        <AutomatedAlerts />
      </SidebarProvider>
    </NotificationsProvider>
  )
}
