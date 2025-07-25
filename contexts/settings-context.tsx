"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export interface SystemSettings {
  general: {
    systemName: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    language: string;
    theme: "light" | "dark" | "system";
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    alertSounds: boolean;
    notificationFrequency: "immediate" | "hourly" | "daily";
    criticalAlertsOnly: boolean;
  };
  security: {
    sessionTimeout: number;
    passwordExpiry: number;
    twoFactorAuth: boolean;
    loginAttempts: number;
    ipWhitelist: string[];
    auditLogging: boolean;
  };
  display: {
    refreshRate: number;
    autoRefresh: boolean;
    compactMode: boolean;
    showGrid: boolean;
    defaultView: "table" | "grid" | "map";
    itemsPerPage: number;
  };
  communication: {
    defaultFrequency: string;
    emergencyFrequency: string;
    backupFrequency: string;
    recordCommunications: boolean;
    autoTranscription: boolean;
    voiceAlerts: boolean;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: "daily" | "weekly" | "monthly";
    retentionPeriod: number;
    backupLocation: string;
    encryptBackups: boolean;
  };
}

interface SettingsContextType {
  settings: SystemSettings;
  updateSettings: (
    category: keyof SystemSettings,
    updates: Partial<SystemSettings[keyof SystemSettings]>
  ) => void;
  resetSettings: (category?: keyof SystemSettings) => void;
  exportSettings: () => void;
  importSettings: (settings: Partial<SystemSettings>) => void;
}

const defaultSettings: SystemSettings = {
  general: {
    systemName: "FlightControl Dashboard",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "24h",
    language: "en",
    theme: "system",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    alertSounds: true,
    notificationFrequency: "immediate",
    criticalAlertsOnly: false,
  },
  security: {
    sessionTimeout: 30,
    passwordExpiry: 90,
    twoFactorAuth: false,
    loginAttempts: 5,
    ipWhitelist: [],
    auditLogging: true,
  },
  display: {
    refreshRate: 30,
    autoRefresh: true,
    compactMode: false,
    showGrid: true,
    defaultView: "table",
    itemsPerPage: 25,
  },
  communication: {
    defaultFrequency: "118.1",
    emergencyFrequency: "121.5",
    backupFrequency: "119.9",
    recordCommunications: true,
    autoTranscription: false,
    voiceAlerts: true,
  },
  backup: {
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: 30,
    backupLocation: "/backups",
    encryptBackups: true,
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  const updateSettings = (
    category: keyof SystemSettings,
    updates: Partial<SystemSettings[keyof SystemSettings]>
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...updates,
      },
    }));
  };

  const resetSettings = (category?: keyof SystemSettings) => {
    if (category) {
      setSettings((prev) => ({
        ...prev,
        [category]: defaultSettings[category],
      }));
    } else {
      setSettings(defaultSettings);
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "flightcontrol-settings.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
