"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export interface UserProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  professional: {
    employeeId: string;
    department: string;
    position: string;
    hireDate: string;
    supervisor: string;
    workLocation: string;
    shiftSchedule: string;
    certifications: string[];
    licenseNumber: string;
    licenseExpiry: string;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      desktop: boolean;
    };
    dashboard: {
      defaultView: string;
      refreshRate: number;
      compactMode: boolean;
      showTutorials: boolean;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: Array<{
      date: string;
      location: string;
      device: string;
      success: boolean;
    }>;
    securityQuestions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (
    section: keyof UserProfile,
    data: Partial<UserProfile[keyof UserProfile]>
  ) => void;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  uploadAvatar: (
    file: File
  ) => Promise<{ success: boolean; url?: string; error?: string }>;
  deleteAccount: (
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const defaultProfile: UserProfile = {
  personalInfo: {
    firstName: "Flight Control",
    lastName: "Admin",
    email: "admin@flightcontrol.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Airport Blvd",
    city: "Aviation City",
    state: "CA",
    zipCode: "90210",
    country: "United States",
  },
  professional: {
    employeeId: "FC001",
    department: "Air Traffic Control",
    position: "Senior Controller",
    hireDate: "2020-01-15",
    supervisor: "John Smith",
    workLocation: "Control Tower",
    shiftSchedule: "Day Shift (06:00-14:00)",
    certifications: [
      "ATC License",
      "Radar Endorsement",
      "Tower Rating",
      "Approach Control",
    ],
    licenseNumber: "ATC-123456",
    licenseExpiry: "2025-12-31",
  },
  preferences: {
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "24h",
    notifications: {
      email: true,
      sms: false,
      push: true,
      desktop: true,
    },
    dashboard: {
      defaultView: "overview",
      refreshRate: 30,
      compactMode: false,
      showTutorials: true,
    },
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-15",
    loginHistory: [
      {
        date: "2024-01-25 09:30:00",
        location: "San Francisco, CA",
        device: "Chrome on Windows",
        success: true,
      },
      {
        date: "2024-01-24 08:15:00",
        location: "San Francisco, CA",
        device: "Chrome on Windows",
        success: true,
      },
      {
        date: "2024-01-23 09:45:00",
        location: "San Francisco, CA",
        device: "Chrome on Windows",
        success: true,
      },
    ],
    securityQuestions: [
      {
        question: "What was the name of your first pet?",
        answer: "Encrypted Answer",
      },
      {
        question: "What city were you born in?",
        answer: "Encrypted Answer",
      },
    ],
  },
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = (
    section: keyof UserProfile,
    data: Partial<UserProfile[keyof UserProfile]>
  ) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const changePassword = async (
    currentPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (currentPassword === "admin123") {
      setProfile((prev) => ({
        ...prev,
        security: {
          ...prev.security,
          lastPasswordChange: new Date().toISOString().split("T")[0],
        },
      }));
      return { success: true };
    }

    return { success: false, error: "Current password is incorrect" };
  };

  const uploadAvatar = async (
    file: File
  ): Promise<{ success: boolean; url?: string; error?: string }> => {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 5MB" };
    }

    const url = URL.createObjectURL(file);
    return { success: true, url };
  };

  const deleteAccount = async (
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (password === "admin123") {
      return { success: true };
    }

    return { success: false, error: "Password is incorrect" };
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        changePassword,
        uploadAvatar,
        deleteAccount,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
