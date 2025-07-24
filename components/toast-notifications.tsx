"use client";

import { useEffect } from "react";
import { useNotifications } from "@/contexts/notifications-context";

// import {
//   AlertTriangle,
//   Cloud,
//   Clock,
//   Shield,
//   Wrench,
//   Info,
// } from "lucide-react";
import { toast } from "sonner";

// const notificationIcons = {
//   emergency: AlertTriangle,
//   weather: Cloud,
//   delay: Clock,
//   security: Shield,
//   maintenance: Wrench,
//   info: Info,
// };

export function ToastNotifications() {
  const { notifications } = useNotifications();

  useEffect(() => {
    const latestNotification = notifications[0];
    if (latestNotification && !latestNotification.read) {
      // const Icon = notificationIcons[latestNotification.type];

      toast(latestNotification.title, {
        description: latestNotification.message,
        action: {
          label: "View",
          onClick: () => {
            console.log("View notification");
          },
        },
        duration: latestNotification.priority === "critical" ? 0 : 5000,
      });

      // Play sound for critical alerts
      if (latestNotification.priority === "critical") {
        // In a real app, you'd play an actual sound file
        console.log("🚨 CRITICAL ALERT SOUND");
      }
    }
  }, [notifications, toast]);

  return null;
}
