/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "controller" | "operator";
  avatar?: string;
  lastLogin: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Default admin credentials
const DEFAULT_ADMIN = {
  email: "admin@flightcontrol.com",
  password: "admin123",
  user: {
    id: "1",
    email: "admin@flightcontrol.com",
    name: "Flight Control Admin",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    lastLogin: new Date(),
  },
};

// Mock user database
const MOCK_USERS = [
  DEFAULT_ADMIN.user,
  {
    id: "2",
    email: "controller@flightcontrol.com",
    name: "Air Traffic Controller",
    role: "controller" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    lastLogin: new Date(),
  },
  {
    id: "3",
    email: "operator@flightcontrol.com",
    name: "Flight Operator",
    role: "operator" as const,
    avatar: "/placeholder.svg?height=32&width=32",
    lastLogin: new Date(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("flight-control-user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          console.log("Restored user from localStorage:", userData);
          setUser(userData);
        } else {
          console.log("No saved user found");
        }
      } catch (error) {
        console.error("Error loading saved user:", error);
        localStorage.removeItem("flight-control-user");
      } finally {
        setIsLoading(false);
        console.log("Auth check complete");
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    console.log("Login attempt:", email);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check default admin credentials
      if (
        email === DEFAULT_ADMIN.email &&
        password === DEFAULT_ADMIN.password
      ) {
        const userData = { ...DEFAULT_ADMIN.user, lastLogin: new Date() };
        console.log("Admin login successful:", userData);
        setUser(userData);
        localStorage.setItem("flight-control-user", JSON.stringify(userData));
        setIsLoading(false);
        return { success: true };
      }

      // Check other mock users (for demo, password is "password123")
      const foundUser = MOCK_USERS.find((u) => u.email === email);
      if (foundUser && password === "password123") {
        const userData = { ...foundUser, lastLogin: new Date() };
        console.log("User login successful:", userData);
        setUser(userData);
        localStorage.setItem("flight-control-user", JSON.stringify(userData));
        setIsLoading(false);
        return { success: true };
      }

      console.log("Login failed: Invalid credentials");
      setIsLoading(false);
      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === email);
      if (existingUser) {
        setIsLoading(false);
        return { success: false, error: "User with this email already exists" };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "operator",
        lastLogin: new Date(),
      };

      MOCK_USERS.push(newUser as any);
      setUser(newUser);
      localStorage.setItem("flight-control-user", JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return {
        success: false,
        error: "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    console.log("User logged out");
    setUser(null);
    localStorage.removeItem("flight-control-user");
  };

  const isAuthenticated = !!user;

  console.log("Auth state:", { user: !!user, isLoading, isAuthenticated });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
