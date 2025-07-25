"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ToastNotifications } from "@/components/toast-notifications";
import { FleetProvider } from "@/contexts/fleet-context";
import { FleetDashboard } from "@/components/fleet-dashboard";

export default function FleetPage() {
  return (
    <NotificationsProvider>
      <FleetProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex flex-1 items-center gap-2">
                <h1 className="text-lg font-semibold">
                  Aircraft Fleet Management
                </h1>
                <div className="ml-auto flex items-center gap-2">
                  <NotificationsDropdown />
                </div>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4">
              <FleetDashboard />
            </div>
          </SidebarInset>
          <ToastNotifications />
        </SidebarProvider>
      </FleetProvider>
    </NotificationsProvider>
  );
}
