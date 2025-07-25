/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useFlightSchedule } from "@/contexts/flight-schedule-context";
import { Checkbox } from "./ui/checkbox";

interface FlightScheduleFormProps {
  onClose: () => void;
}

export function FlightScheduleForm({ onClose }: FlightScheduleFormProps) {
  const { addFlight } = useFlightSchedule();
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    aircraft: "",
    departureAirport: "",
    departureCode: "",
    departureTime: "",
    departureGate: "",
    departureTerminal: "",
    arrivalAirport: "",
    arrivalCode: "",
    arrivalTime: "",
    arrivalGate: "",
    arrivalTerminal: "",
    frequency: "Daily",
    daysOfWeek: [] as string[],
    effectiveDate: "",
    expiryDate: "",
    capacity: "",
    economyPrice: "",
    businessPrice: "",
    firstClassPrice: "",
    pilots: "2",
    flightAttendants: "4",
    distance: "",
    duration: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFlight = {
      flightNumber: formData.flightNumber,
      airline: formData.airline,
      aircraft: formData.aircraft,
      departure: {
        airport: formData.departureAirport,
        code: formData.departureCode,
        scheduledTime: formData.departureTime,
        gate: formData.departureGate || undefined,
        terminal: formData.departureTerminal || undefined,
      },
      arrival: {
        airport: formData.arrivalAirport,
        code: formData.arrivalCode,
        scheduledTime: formData.arrivalTime,
        gate: formData.arrivalGate || undefined,
        terminal: formData.arrivalTerminal || undefined,
      },
      status: "Scheduled" as const,
      frequency: formData.frequency as any,
      daysOfWeek: formData.daysOfWeek,
      effectiveDate: formData.effectiveDate,
      expiryDate: formData.expiryDate || undefined,
      passengers: {
        capacity: Number.parseInt(formData.capacity),
        booked: 0,
        available: Number.parseInt(formData.capacity),
      },
      crew: {
        pilots: Number.parseInt(formData.pilots),
        flightAttendants: Number.parseInt(formData.flightAttendants),
      },
      route: {
        distance: Number.parseInt(formData.distance),
        duration: formData.duration,
        flightTime: formData.duration,
      },
      pricing: {
        economy: Number.parseInt(formData.economyPrice),
        business: Number.parseInt(formData.businessPrice) || 0,
        firstClass: Number.parseInt(formData.firstClassPrice) || 0,
      },
      notes: formData.notes || undefined,
      createdBy: "Current User",
    };

    addFlight(newFlight);
    onClose();
  };

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      daysOfWeek: checked
        ? [...prev.daysOfWeek, day]
        : prev.daysOfWeek.filter((d) => d !== day),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="flightNumber">Flight Number</Label>
          <Input
            id="flightNumber"
            value={formData.flightNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, flightNumber: e.target.value }))
            }
            placeholder="e.g., AA1234"
            required
          />
        </div>
        <div>
          <Label htmlFor="airline">Airline</Label>
          <Input
            id="airline"
            value={formData.airline}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, airline: e.target.value }))
            }
            placeholder="e.g., American Airlines"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="aircraft">Aircraft Type</Label>
        <Input
          id="aircraft"
          value={formData.aircraft}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, aircraft: e.target.value }))
          }
          placeholder="e.g., Boeing 737-800"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Departure</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="departureAirport">Airport Name</Label>
              <Input
                id="departureAirport"
                value={formData.departureAirport}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    departureAirport: e.target.value,
                  }))
                }
                placeholder="John F. Kennedy International"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="departureCode">Code</Label>
                <Input
                  id="departureCode"
                  value={formData.departureCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      departureCode: e.target.value,
                    }))
                  }
                  placeholder="JFK"
                  required
                />
              </div>
              <div>
                <Label htmlFor="departureTime">Time</Label>
                <Input
                  id="departureTime"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      departureTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="departureGate">Gate</Label>
                <Input
                  id="departureGate"
                  value={formData.departureGate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      departureGate: e.target.value,
                    }))
                  }
                  placeholder="A12"
                />
              </div>
              <div>
                <Label htmlFor="departureTerminal">Terminal</Label>
                <Input
                  id="departureTerminal"
                  value={formData.departureTerminal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      departureTerminal: e.target.value,
                    }))
                  }
                  placeholder="Terminal 8"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Arrival</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="arrivalAirport">Airport Name</Label>
              <Input
                id="arrivalAirport"
                value={formData.arrivalAirport}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    arrivalAirport: e.target.value,
                  }))
                }
                placeholder="Los Angeles International"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="arrivalCode">Code</Label>
                <Input
                  id="arrivalCode"
                  value={formData.arrivalCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      arrivalCode: e.target.value,
                    }))
                  }
                  placeholder="LAX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="arrivalTime">Time</Label>
                <Input
                  id="arrivalTime"
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      arrivalTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="arrivalGate">Gate</Label>
                <Input
                  id="arrivalGate"
                  value={formData.arrivalGate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      arrivalGate: e.target.value,
                    }))
                  }
                  placeholder="B7"
                />
              </div>
              <div>
                <Label htmlFor="arrivalTerminal">Terminal</Label>
                <Input
                  id="arrivalTerminal"
                  value={formData.arrivalTerminal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      arrivalTerminal: e.target.value,
                    }))
                  }
                  placeholder="Terminal 6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="One-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Days of Week</Label>
            <div className="flex gap-2 mt-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="flex items-center space-x-1">
                  <Checkbox
                    id={day}
                    checked={formData.daysOfWeek.includes(day)}
                    onCheckedChange={(checked) =>
                      handleDayChange(day, checked as boolean)
                    }
                  />
                  <Label htmlFor={day} className="text-xs">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="effectiveDate">Effective Date</Label>
            <Input
              id="effectiveDate"
              type="date"
              value={formData.effectiveDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  effectiveDate: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, capacity: e.target.value }))
            }
            placeholder="160"
            required
          />
        </div>
        <div>
          <Label htmlFor="pilots">Pilots</Label>
          <Input
            id="pilots"
            type="number"
            value={formData.pilots}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pilots: e.target.value }))
            }
            placeholder="2"
            required
          />
        </div>
        <div>
          <Label htmlFor="flightAttendants">Flight Attendants</Label>
          <Input
            id="flightAttendants"
            type="number"
            value={formData.flightAttendants}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                flightAttendants: e.target.value,
              }))
            }
            placeholder="4"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="distance">Distance (miles)</Label>
          <Input
            id="distance"
            type="number"
            value={formData.distance}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, distance: e.target.value }))
            }
            placeholder="2475"
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, duration: e.target.value }))
            }
            placeholder="5h 30m"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Pricing</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="economyPrice">Economy ($)</Label>
            <Input
              id="economyPrice"
              type="number"
              value={formData.economyPrice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  economyPrice: e.target.value,
                }))
              }
              placeholder="299"
              required
            />
          </div>
          <div>
            <Label htmlFor="businessPrice">Business ($)</Label>
            <Input
              id="businessPrice"
              type="number"
              value={formData.businessPrice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessPrice: e.target.value,
                }))
              }
              placeholder="899"
            />
          </div>
          <div>
            <Label htmlFor="firstClassPrice">First Class ($)</Label>
            <Input
              id="firstClassPrice"
              type="number"
              value={formData.firstClassPrice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstClassPrice: e.target.value,
                }))
              }
              placeholder="1599"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="Additional notes about this flight schedule..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Schedule</Button>
      </div>
    </form>
  );
}
