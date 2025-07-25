"use client";

import type React from "react";

import { useAuth } from "@/contexts/auth-context";
import { AuthPage } from "./auth-page";
import { WelcomeAnimation } from "./welcome-animation";
import { useState, useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isReady) {
      setShowWelcome(true);

      // Hide welcome animation after 4 seconds and show dashboard
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setIsReady(true);
      }, 4000);

      return () => clearTimeout(timer);
    } else if (isAuthenticated && isReady) {
      // User is already authenticated and ready, don't show welcome again
      setShowWelcome(false);
    }
  }, [isAuthenticated, isReady]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading FlightControl...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Show welcome animation after successful login (only once)
  if (showWelcome && !isReady) {
    return <WelcomeAnimation />;
  }

  // Render the protected content (dashboard)
  return <>{children}</>;
}
