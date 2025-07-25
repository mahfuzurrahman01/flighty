"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plane } from "lucide-react";
import { useFlightSchedule } from "@/contexts/flight-schedule-context";

export function ScheduleCalendarView() {
  const { selectedDate, setSelectedDate, getFlightsByDate, setSelectedFlight } =
    useFlightSchedule();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="h-full flex flex-col">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">{monthYear}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {days.map((date, index) => {
            const dayFlights = date ? getFlightsByDate(date) : [];
            const hasFlights = dayFlights.length > 0;

            return (
              <div
                key={index}
                className={`
                  min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                  ${date ? "hover:bg-muted/50" : ""}
                  ${isToday(date) ? "bg-blue-50 border-blue-200" : ""}
                  ${isSelected(date) ? "bg-primary/10 border-primary" : ""}
                  ${!date ? "opacity-0 pointer-events-none" : ""}
                `}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${
                          isToday(date)
                            ? "text-blue-600"
                            : isSelected(date)
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        {date.getDate()}
                      </span>
                      {hasFlights && (
                        <Badge variant="secondary" className="text-xs">
                          {dayFlights.length}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayFlights.slice(0, 3).map((flight) => (
                        <div
                          key={flight.id}
                          className="text-xs p-1 bg-white rounded border cursor-pointer hover:bg-muted/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFlight(flight);
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <Plane className="h-3 w-3" />
                            <span className="font-medium">
                              {flight.flightNumber}
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            {flight.departure.code} → {flight.arrival.code}
                          </div>
                          <div className="text-muted-foreground">
                            {flight.departure.scheduledTime}
                          </div>
                        </div>
                      ))}
                      {dayFlights.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayFlights.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Info */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            <p className="text-sm text-muted-foreground">
              {getFlightsByDate(selectedDate).length} scheduled flights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
