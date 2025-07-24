"use client";

import {
  Bell,
  AlertTriangle,
  Cloud,
  Clock,
  Shield,
  Wrench,
  Info,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useNotifications,
  type Notification,
} from "@/contexts/notifications-context";
// Remove this line:
// import { formatDistanceToNow } from "date-fns"

// Add this utility function at the top of the file after the imports:
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

const notificationIcons = {
  emergency: AlertTriangle,
  weather: Cloud,
  delay: Clock,
  security: Shield,
  maintenance: Wrench,
  info: Info,
};

const priorityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
};

const typeColors = {
  emergency: "text-red-600 bg-red-50",
  weather: "text-blue-600 bg-blue-50",
  delay: "text-yellow-600 bg-yellow-50",
  security: "text-purple-600 bg-purple-50",
  maintenance: "text-gray-600 bg-gray-50",
  info: "text-green-600 bg-green-50",
};

function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsAcknowledged, clearNotification } = useNotifications();
  const Icon = notificationIcons[notification.type];

  return (
    <div
      className={`p-3 border-l-4 ${priorityColors[notification.priority]} ${
        !notification.read ? "bg-muted/50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${typeColors[notification.type]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.title}</p>
            <div className="flex items-center gap-1">
              {!notification.acknowledged &&
                notification.priority === "critical" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs bg-transparent"
                    onClick={() => markAsAcknowledged(notification.id)}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    ACK
                  </Button>
                )}
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => clearNotification(notification.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {notification.flightNumber && (
                <Badge variant="outline" className="text-xs">
                  {notification.flightNumber}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs capitalize">
                {notification.priority}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(notification.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationsDropdown() {
  const { notifications, unreadCount, clearAllNotifications } =
    useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllNotifications}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
