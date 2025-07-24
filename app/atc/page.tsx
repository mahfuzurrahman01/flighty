"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio } from "lucide-react"
import { NotificationsProvider } from "@/contexts/notifications-context"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { ToastNotifications } from "@/components/toast-notifications"
import { AutomatedAlerts } from "@/components/automated-alerts"

export default function ATCPage() {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-1 items-center gap-2">
              <h1 className="text-lg font-semibold">Air Traffic Control</h1>
              <div className="ml-auto flex items-center gap-2">
                <NotificationsDropdown />
              </div>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Air Traffic Control Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">ATC Operations</h3>
                  <p className="text-muted-foreground">
                    Air traffic control interface and communication systems will be implemented here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
        <ToastNotifications />
        <AutomatedAlerts />
      </SidebarProvider>
    </NotificationsProvider>
  )
}
