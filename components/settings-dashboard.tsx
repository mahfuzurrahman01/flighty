"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import {
  Settings,
  Bell,
  Shield,
  Monitor,
  Radio,
  Database,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import { useSettings } from "@/contexts/settings-context";

export function SettingsDashboard() {
  const { settings, updateSettings, resetSettings, exportSettings } =
    useSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">
            Configure your FlightControl dashboard preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    className="mt-2"
                    id="systemName"
                    value={settings.general.systemName}
                    onChange={(e) =>
                      updateSettings("general", { systemName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) =>
                      updateSettings("general", { timezone: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.general.dateFormat}
                    onValueChange={(value) =>
                      updateSettings("general", { dateFormat: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select
                    value={settings.general.timeFormat}
                    onValueChange={(value) =>
                      updateSettings("general", { timeFormat: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) =>
                      updateSettings("general", { language: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.general.theme}
                    onValueChange={(value: "light" | "dark" | "system") =>
                      updateSettings("general", { theme: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => resetSettings("general")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("notifications", {
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("notifications", {
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("notifications", {
                        smsNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="alertSounds">Alert Sounds</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for alerts
                    </p>
                  </div>
                  <Switch
                    id="alertSounds"
                    checked={settings.notifications.alertSounds}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("notifications", { alertSounds: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="criticalAlertsOnly">
                      Critical Alerts Only
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Only receive critical priority alerts
                    </p>
                  </div>
                  <Switch
                    id="criticalAlertsOnly"
                    checked={settings.notifications.criticalAlertsOnly}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("notifications", {
                        criticalAlertsOnly: checked,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="notificationFrequency">
                    Notification Frequency
                  </Label>
                  <Select
                    value={settings.notifications.notificationFrequency}
                    onValueChange={(value: "immediate" | "hourly" | "daily") =>
                      updateSettings("notifications", {
                        notificationFrequency: value,
                      })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => resetSettings("notifications")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    className="mt-2"
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      updateSettings("security", {
                        sessionTimeout: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    className="mt-2"
                    id="passwordExpiry"
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) =>
                      updateSettings("security", {
                        passwordExpiry: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input
                    className="mt-2"
                    id="loginAttempts"
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) =>
                      updateSettings("security", {
                        loginAttempts: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all logins
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("security", { twoFactorAuth: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auditLogging">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all user actions
                    </p>
                  </div>
                  <Switch
                    id="auditLogging"
                    checked={settings.security.auditLogging}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("security", { auditLogging: checked })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea
                  className="mt-2"
                  id="ipWhitelist"
                  placeholder="Enter IP addresses, one per line"
                  value={settings.security.ipWhitelist.join("\n")}
                  onChange={(e) =>
                    updateSettings("security", {
                      ipWhitelist: e.target.value
                        .split("\n")
                        .filter((ip) => ip.trim()),
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => resetSettings("security")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="refreshRate">Refresh Rate (seconds)</Label>
                  <Input
                    className="mt-2"
                    id="refreshRate"
                    type="number"
                    value={settings.display.refreshRate}
                    onChange={(e) =>
                      updateSettings("display", {
                        refreshRate: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="itemsPerPage">Items Per Page</Label>
                  <Select
                    value={settings.display.itemsPerPage.toString()}
                    onValueChange={(value) =>
                      updateSettings("display", {
                        itemsPerPage: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="defaultView">Default View</Label>
                  <Select
                    value={settings.display.defaultView}
                    onValueChange={(value: "table" | "grid" | "map") =>
                      updateSettings("display", { defaultView: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="map">Map</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoRefresh">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh data
                    </p>
                  </div>
                  <Switch
                    id="autoRefresh"
                    checked={settings.display.autoRefresh}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("display", { autoRefresh: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use compact layout
                    </p>
                  </div>
                  <Switch
                    id="compactMode"
                    checked={settings.display.compactMode}
                    onCheckedChange={(checked: boolean) =>
                      updateSettings("display", { compactMode: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showGrid">Show Grid Lines</Label>
                    <p className="text-sm text-muted-foreground">
                      Display grid lines in tables
                    </p>
                  </div>
                  <Switch
                    id="showGrid"
                    checked={settings.display.showGrid}
                    onCheckedChange={(checked) =>
                      updateSettings("display", { showGrid: checked })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => resetSettings("display")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                Communication Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="defaultFrequency">Default Frequency</Label>
                  <Input
                    className="mt-2"
                    id="defaultFrequency"
                    value={settings.communication.defaultFrequency}
                    onChange={(e) =>
                      updateSettings("communication", {
                        defaultFrequency: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyFrequency">
                    Emergency Frequency
                  </Label>
                  <Input
                    className="mt-2"
                    id="emergencyFrequency"
                    value={settings.communication.emergencyFrequency}
                    onChange={(e) =>
                      updateSettings("communication", {
                        emergencyFrequency: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Input
                    className="mt-2"
                    id="backupFrequency"
                    value={settings.communication.backupFrequency}
                    onChange={(e) =>
                      updateSettings("communication", {
                        backupFrequency: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="recordCommunications">
                      Record Communications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Record all radio communications
                    </p>
                  </div>
                  <Switch
                    id="recordCommunications"
                    checked={settings.communication.recordCommunications}
                    onCheckedChange={(checked) =>
                      updateSettings("communication", {
                        recordCommunications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoTranscription">
                      Auto Transcription
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically transcribe communications
                    </p>
                  </div>
                  <Switch
                    id="autoTranscription"
                    checked={settings.communication.autoTranscription}
                    onCheckedChange={(checked) =>
                      updateSettings("communication", {
                        autoTranscription: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="voiceAlerts">Voice Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Use voice for critical alerts
                    </p>
                  </div>
                  <Switch
                    id="voiceAlerts"
                    checked={settings.communication.voiceAlerts}
                    onCheckedChange={(checked) =>
                      updateSettings("communication", { voiceAlerts: checked })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => resetSettings("communication")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="retentionPeriod">
                    Retention Period (days)
                  </Label>
                  <Input
                    className="mt-2"
                    id="retentionPeriod"
                    type="number"
                    value={settings.backup.retentionPeriod}
                    onChange={(e) =>
                      updateSettings("backup", {
                        retentionPeriod: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="backupLocation">Backup Location</Label>
                  <Input
                    className="mt-2"
                    id="backupLocation"
                    value={settings.backup.backupLocation}
                    onChange={(e) =>
                      updateSettings("backup", {
                        backupLocation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backup.backupFrequency}
                    onValueChange={(value: "daily" | "weekly" | "monthly") =>
                      updateSettings("backup", { backupFrequency: value })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackup">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable automatic backups
                    </p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={settings.backup.autoBackup}
                    onCheckedChange={(checked) =>
                      updateSettings("backup", { autoBackup: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="encryptBackups">Encrypt Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Encrypt backup files
                    </p>
                  </div>
                  <Switch
                    id="encryptBackups"
                    checked={settings.backup.encryptBackups}
                    onCheckedChange={(checked) =>
                      updateSettings("backup", { encryptBackups: checked })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore Backup
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => resetSettings("backup")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
