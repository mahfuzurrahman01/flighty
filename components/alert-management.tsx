/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Plus, Search } from "lucide-react";
import { useNotifications } from "@/contexts/notifications-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AlertManagement() {
  const { notifications, addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [newAlert, setNewAlert] = useState({
    type: "info" as const,
    title: "",
    message: "",
    flightNumber: "",
    priority: "medium" as const,
  });

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.flightNumber &&
        n.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateAlert = () => {
    if (newAlert.title && newAlert.message) {
      addNotification({
        type: newAlert.type,
        title: newAlert.title,
        message: newAlert.message,
        flightNumber: newAlert.flightNumber || undefined,
        priority: newAlert.priority,
      });
      setNewAlert({
        type: "info",
        title: "",
        message: "",
        flightNumber: "",
        priority: "medium",
      });
    }
  };

  const criticalAlerts = notifications.filter(
    (n) => n.priority === "critical" && !n.acknowledged
  );
  const highPriorityAlerts = notifications.filter(
    (n) => n.priority === "high" && !n.read
  );

  console.log("highPriorityAlerts", highPriorityAlerts);

  return (
    <div className="space-y-6">
      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-800">
                Critical Alerts Requiring Acknowledgment
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-2 bg-white rounded border"
                >
                  <div>
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.message}
                    </p>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter((n) => n.priority === "critical").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {notifications.filter((n) => !n.read).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Acknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {notifications.filter((n) => n.acknowledged).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alert Management</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Alert</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="alert-type">Alert Type</Label>
                    <Select
                      value={newAlert.type}
                      onValueChange={(value: any) =>
                        setNewAlert({ ...newAlert, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="weather">Weather</SelectItem>
                        <SelectItem value="delay">Delay</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="info">Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="alert-priority">Priority</Label>
                    <Select
                      value={newAlert.priority}
                      onValueChange={(value: any) =>
                        setNewAlert({ ...newAlert, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="alert-title">Title</Label>
                    <Input
                      id="alert-title"
                      value={newAlert.title}
                      onChange={(e) =>
                        setNewAlert({ ...newAlert, title: e.target.value })
                      }
                      placeholder="Alert title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alert-flight">
                      Flight Number (Optional)
                    </Label>
                    <Input
                      id="alert-flight"
                      value={newAlert.flightNumber}
                      onChange={(e) =>
                        setNewAlert({
                          ...newAlert,
                          flightNumber: e.target.value,
                        })
                      }
                      placeholder="e.g., AA1234"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alert-message">Message</Label>
                    <Textarea
                      id="alert-message"
                      value={newAlert.message}
                      onChange={(e) =>
                        setNewAlert({ ...newAlert, message: e.target.value })
                      }
                      placeholder="Alert message"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleCreateAlert} className="w-full">
                    Create Alert
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          notification.priority === "critical"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {notification.priority}
                      </Badge>
                      <Badge variant="outline">{notification.type}</Badge>
                      {notification.flightNumber && (
                        <Badge variant="outline">
                          {notification.flightNumber}
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Badge variant="secondary" className="text-xs">
                        Unread
                      </Badge>
                    )}
                    {notification.priority === "critical" &&
                      !notification.acknowledged && (
                        <Badge variant="destructive" className="text-xs">
                          Needs ACK
                        </Badge>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
