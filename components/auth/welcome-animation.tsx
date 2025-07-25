"use client";

import { useEffect, useState } from "react";
import { Plane, CheckCircle, BarChart3, Radio } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function WelcomeAnimation() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: CheckCircle,
      title: "Authentication Successful",
      description: `Welcome back, ${user?.name}!`,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: BarChart3,
      title: "Loading Dashboard",
      description: "Initializing flight control systems...",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Plane,
      title: "Connecting to Live Data",
      description: "Syncing with flight tracking systems...",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Radio,
      title: "System Ready",
      description: "All systems operational. Welcome to FlightControl!",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800); // Faster transitions

    return () => clearInterval(timer);
  }, [steps.length]);

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center z-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="animate-in zoom-in duration-500">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Plane className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">FlightControl</h1>
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-blue-200">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${currentStepData.bgColor}`}>
              <Icon
                className={`h-6 w-6 ${currentStepData.color} animate-pulse`}
              />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-600">
                {currentStepData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-800 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="animate-pulse">
          <p className="text-gray-600">
            Setting up your flight control dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}
