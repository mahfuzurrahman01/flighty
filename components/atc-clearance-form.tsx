"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useATC } from "@/contexts/atc-context";
import { PlaneTakeoff, PlaneLanding, Navigation, Route } from "lucide-react";

export function ATCClearanceForms() {
  const { addCommunication, activeFlights } = useATC();
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const [takeoffForm, setTakeoffForm] = useState({
    flightNumber: "",
    runway: "",
    windConditions: "",
    altimeter: "",
    squawkCode: "",
    initialHeading: "",
    notes: "",
  });

  const [landingForm, setLandingForm] = useState({
    flightNumber: "",
    runway: "",
    approach: "",
    windConditions: "",
    visibility: "",
    notes: "",
  });

  const [altitudeForm, setAltitudeForm] = useState({
    flightNumber: "",
    currentAltitude: "",
    requestedAltitude: "",
    reason: "",
    notes: "",
  });

  const [courseForm, setCourseForm] = useState({
    flightNumber: "",
    currentHeading: "",
    newHeading: "",
    reason: "",
    waypoint: "",
    notes: "",
  });

  const handleTakeoffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flight = activeFlights.find(
      (f) => f.flightNumber === takeoffForm.flightNumber
    );
    if (flight) {
      addCommunication({
        flightNumber: takeoffForm.flightNumber,
        callSign: flight.callSign,
        type: "takeoff",
        status: "pending",
        request: `Request takeoff clearance, runway ${takeoffForm.runway}. Wind: ${takeoffForm.windConditions}, Altimeter: ${takeoffForm.altimeter}, Squawk: ${takeoffForm.squawkCode}`,
        priority: "medium",
        controller: "Tower",
        frequency: flight.frequency,
      });
      setTakeoffForm({
        flightNumber: "",
        runway: "",
        windConditions: "",
        altimeter: "",
        squawkCode: "",
        initialHeading: "",
        notes: "",
      });
      setActiveForm(null);
    }
  };

  const handleLandingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flight = activeFlights.find(
      (f) => f.flightNumber === landingForm.flightNumber
    );
    if (flight) {
      addCommunication({
        flightNumber: landingForm.flightNumber,
        callSign: flight.callSign,
        type: "landing",
        status: "pending",
        request: `Request landing clearance, runway ${landingForm.runway}. Approach: ${landingForm.approach}, Wind: ${landingForm.windConditions}, Visibility: ${landingForm.visibility}`,
        priority: "high",
        controller: "Approach",
        frequency: flight.frequency,
      });
      setLandingForm({
        flightNumber: "",
        runway: "",
        approach: "",
        windConditions: "",
        visibility: "",
        notes: "",
      });
      setActiveForm(null);
    }
  };

  const handleAltitudeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flight = activeFlights.find(
      (f) => f.flightNumber === altitudeForm.flightNumber
    );
    if (flight) {
      addCommunication({
        flightNumber: altitudeForm.flightNumber,
        callSign: flight.callSign,
        type: "altitude",
        status: "pending",
        request: `Request altitude change from ${altitudeForm.currentAltitude} to ${altitudeForm.requestedAltitude}. Reason: ${altitudeForm.reason}`,
        priority: "medium",
        controller: "Center",
        frequency: flight.frequency,
      });
      setAltitudeForm({
        flightNumber: "",
        currentAltitude: "",
        requestedAltitude: "",
        reason: "",
        notes: "",
      });
      setActiveForm(null);
    }
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flight = activeFlights.find(
      (f) => f.flightNumber === courseForm.flightNumber
    );
    if (flight) {
      addCommunication({
        flightNumber: courseForm.flightNumber,
        callSign: flight.callSign,
        type: "course",
        status: "pending",
        request: `Request course correction from ${
          courseForm.currentHeading
        }° to ${courseForm.newHeading}°. ${
          courseForm.waypoint ? `Via waypoint: ${courseForm.waypoint}` : ""
        } Reason: ${courseForm.reason}`,
        priority: "medium",
        controller: "Center",
        frequency: flight.frequency,
      });
      setCourseForm({
        flightNumber: "",
        currentHeading: "",
        newHeading: "",
        reason: "",
        waypoint: "",
        notes: "",
      });
      setActiveForm(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant={activeForm === "takeoff" ? "default" : "outline"}
          onClick={() =>
            setActiveForm(activeForm === "takeoff" ? null : "takeoff")
          }
          className="h-20 flex-col gap-2"
        >
          <PlaneTakeoff className="h-6 w-6" />
          Takeoff Clearance
        </Button>
        <Button
          variant={activeForm === "landing" ? "default" : "outline"}
          onClick={() =>
            setActiveForm(activeForm === "landing" ? null : "landing")
          }
          className="h-20 flex-col gap-2"
        >
          <PlaneLanding className="h-6 w-6" />
          Landing Permission
        </Button>
        <Button
          variant={activeForm === "altitude" ? "default" : "outline"}
          onClick={() =>
            setActiveForm(activeForm === "altitude" ? null : "altitude")
          }
          className="h-20 flex-col gap-2"
        >
          <Navigation className="h-6 w-6" />
          Altitude Change
        </Button>
        <Button
          variant={activeForm === "course" ? "default" : "outline"}
          onClick={() =>
            setActiveForm(activeForm === "course" ? null : "course")
          }
          className="h-20 flex-col gap-2"
        >
          <Route className="h-6 w-6" />
          Course Correction
        </Button>
      </div>

      {activeForm === "takeoff" && (
        <Card>
          <CardHeader>
            <CardTitle>Takeoff Clearance Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTakeoffSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="takeoff-flight">Flight Number</Label>
                  <Select
                    value={takeoffForm.flightNumber}
                    onValueChange={(value) =>
                      setTakeoffForm((prev) => ({
                        ...prev,
                        flightNumber: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flight" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeFlights
                        .filter((f) => f.status === "taxiing")
                        .map((flight) => (
                          <SelectItem
                            key={flight.flightNumber}
                            value={flight.flightNumber}
                          >
                            {flight.flightNumber} - {flight.callSign}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="runway">Runway</Label>
                  <Select
                    value={takeoffForm.runway}
                    onValueChange={(value) =>
                      setTakeoffForm((prev) => ({ ...prev, runway: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select runway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24L">24L</SelectItem>
                      <SelectItem value="24R">24R</SelectItem>
                      <SelectItem value="06L">06L</SelectItem>
                      <SelectItem value="06R">06R</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="wind">Wind Conditions</Label>
                  <Input
                    id="wind"
                    value={takeoffForm.windConditions}
                    onChange={(e) =>
                      setTakeoffForm((prev) => ({
                        ...prev,
                        windConditions: e.target.value,
                      }))
                    }
                    placeholder="e.g., 240 at 8 kts"
                  />
                </div>
                <div>
                  <Label htmlFor="altimeter">Altimeter</Label>
                  <Input
                    id="altimeter"
                    value={takeoffForm.altimeter}
                    onChange={(e) =>
                      setTakeoffForm((prev) => ({
                        ...prev,
                        altimeter: e.target.value,
                      }))
                    }
                    placeholder="e.g., 30.12"
                  />
                </div>
                <div>
                  <Label htmlFor="squawk">Squawk Code</Label>
                  <Input
                    id="squawk"
                    value={takeoffForm.squawkCode}
                    onChange={(e) =>
                      setTakeoffForm((prev) => ({
                        ...prev,
                        squawkCode: e.target.value,
                      }))
                    }
                    placeholder="e.g., 1234"
                  />
                </div>
                <div>
                  <Label htmlFor="heading">Initial Heading</Label>
                  <Input
                    id="heading"
                    value={takeoffForm.initialHeading}
                    onChange={(e) =>
                      setTakeoffForm((prev) => ({
                        ...prev,
                        initialHeading: e.target.value,
                      }))
                    }
                    placeholder="e.g., 240°"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={takeoffForm.notes}
                  onChange={(e) =>
                    setTakeoffForm((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Any additional instructions or notes"
                />
              </div>
              <Button
                type="submit"
                disabled={!takeoffForm.flightNumber || !takeoffForm.runway}
              >
                Issue Takeoff Clearance
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeForm === "landing" && (
        <Card>
          <CardHeader>
            <CardTitle>Landing Permission Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLandingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landing-flight">Flight Number</Label>
                  <Select
                    value={landingForm.flightNumber}
                    onValueChange={(value) =>
                      setLandingForm((prev) => ({
                        ...prev,
                        flightNumber: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flight" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeFlights
                        .filter(
                          (f) =>
                            f.status === "approach" || f.status === "holding"
                        )
                        .map((flight) => (
                          <SelectItem
                            key={flight.flightNumber}
                            value={flight.flightNumber}
                          >
                            {flight.flightNumber} - {flight.callSign}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="landing-runway">Runway</Label>
                  <Select
                    value={landingForm.runway}
                    onValueChange={(value) =>
                      setLandingForm((prev) => ({ ...prev, runway: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select runway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24L">24L</SelectItem>
                      <SelectItem value="24R">24R</SelectItem>
                      <SelectItem value="06L">06L</SelectItem>
                      <SelectItem value="06R">06R</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="approach">Approach Type</Label>
                  <Select
                    value={landingForm.approach}
                    onValueChange={(value) =>
                      setLandingForm((prev) => ({ ...prev, approach: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select approach" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ILS">ILS</SelectItem>
                      <SelectItem value="Visual">Visual</SelectItem>
                      <SelectItem value="RNAV">RNAV</SelectItem>
                      <SelectItem value="VOR">VOR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="landing-wind">Wind Conditions</Label>
                  <Input
                    id="landing-wind"
                    value={landingForm.windConditions}
                    onChange={(e) =>
                      setLandingForm((prev) => ({
                        ...prev,
                        windConditions: e.target.value,
                      }))
                    }
                    placeholder="e.g., 070 at 8 kts"
                  />
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Input
                    id="visibility"
                    value={landingForm.visibility}
                    onChange={(e) =>
                      setLandingForm((prev) => ({
                        ...prev,
                        visibility: e.target.value,
                      }))
                    }
                    placeholder="e.g., 10 SM"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="landing-notes">Additional Notes</Label>
                <Textarea
                  id="landing-notes"
                  value={landingForm.notes}
                  onChange={(e) =>
                    setLandingForm((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Any additional instructions or notes"
                />
              </div>
              <Button
                type="submit"
                disabled={!landingForm.flightNumber || !landingForm.runway}
              >
                Issue Landing Clearance
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeForm === "altitude" && (
        <Card>
          <CardHeader>
            <CardTitle>Altitude Change Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAltitudeSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="altitude-flight">Flight Number</Label>
                  <Select
                    value={altitudeForm.flightNumber}
                    onValueChange={(value) =>
                      setAltitudeForm((prev) => ({
                        ...prev,
                        flightNumber: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flight" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeFlights
                        .filter((f) => f.status === "airborne")
                        .map((flight) => (
                          <SelectItem
                            key={flight.flightNumber}
                            value={flight.flightNumber}
                          >
                            {flight.flightNumber} - {flight.callSign}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="current-alt">Current Altitude</Label>
                  <Input
                    id="current-alt"
                    value={altitudeForm.currentAltitude}
                    onChange={(e) =>
                      setAltitudeForm((prev) => ({
                        ...prev,
                        currentAltitude: e.target.value,
                      }))
                    }
                    placeholder="e.g., FL310"
                  />
                </div>
                <div>
                  <Label htmlFor="requested-alt">Requested Altitude</Label>
                  <Input
                    id="requested-alt"
                    value={altitudeForm.requestedAltitude}
                    onChange={(e) =>
                      setAltitudeForm((prev) => ({
                        ...prev,
                        requestedAltitude: e.target.value,
                      }))
                    }
                    placeholder="e.g., FL350"
                  />
                </div>
                <div>
                  <Label htmlFor="alt-reason">Reason</Label>
                  <Select
                    value={altitudeForm.reason}
                    onValueChange={(value) =>
                      setAltitudeForm((prev) => ({ ...prev, reason: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weather">Weather Avoidance</SelectItem>
                      <SelectItem value="turbulence">Turbulence</SelectItem>
                      <SelectItem value="traffic">
                        Traffic Separation
                      </SelectItem>
                      <SelectItem value="fuel">Fuel Optimization</SelectItem>
                      <SelectItem value="performance">
                        Aircraft Performance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="alt-notes">Additional Notes</Label>
                <Textarea
                  id="alt-notes"
                  value={altitudeForm.notes}
                  onChange={(e) =>
                    setAltitudeForm((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Any additional instructions or notes"
                />
              </div>
              <Button
                type="submit"
                disabled={
                  !altitudeForm.flightNumber || !altitudeForm.requestedAltitude
                }
              >
                Request Altitude Change
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeForm === "course" && (
        <Card>
          <CardHeader>
            <CardTitle>Course Correction Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCourseSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course-flight">Flight Number</Label>
                  <Select
                    value={courseForm.flightNumber}
                    onValueChange={(value) =>
                      setCourseForm((prev) => ({
                        ...prev,
                        flightNumber: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flight" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeFlights
                        .filter((f) => f.status === "airborne")
                        .map((flight) => (
                          <SelectItem
                            key={flight.flightNumber}
                            value={flight.flightNumber}
                          >
                            {flight.flightNumber} - {flight.callSign}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="current-heading">Current Heading</Label>
                  <Input
                    id="current-heading"
                    value={courseForm.currentHeading}
                    onChange={(e) =>
                      setCourseForm((prev) => ({
                        ...prev,
                        currentHeading: e.target.value,
                      }))
                    }
                    placeholder="e.g., 090"
                  />
                </div>
                <div>
                  <Label htmlFor="new-heading">New Heading</Label>
                  <Input
                    id="new-heading"
                    value={courseForm.newHeading}
                    onChange={(e) =>
                      setCourseForm((prev) => ({
                        ...prev,
                        newHeading: e.target.value,
                      }))
                    }
                    placeholder="e.g., 120"
                  />
                </div>
                <div>
                  <Label htmlFor="waypoint">Waypoint (Optional)</Label>
                  <Input
                    id="waypoint"
                    value={courseForm.waypoint}
                    onChange={(e) =>
                      setCourseForm((prev) => ({
                        ...prev,
                        waypoint: e.target.value,
                      }))
                    }
                    placeholder="e.g., FIXME"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="course-reason">Reason</Label>
                  <Select
                    value={courseForm.reason}
                    onValueChange={(value) =>
                      setCourseForm((prev) => ({ ...prev, reason: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weather">Weather Avoidance</SelectItem>
                      <SelectItem value="traffic">
                        Traffic Separation
                      </SelectItem>
                      <SelectItem value="navigation">
                        Navigation Update
                      </SelectItem>
                      <SelectItem value="airspace">
                        Airspace Restriction
                      </SelectItem>
                      <SelectItem value="direct">Direct Routing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="course-notes">Additional Notes</Label>
                <Textarea
                  id="course-notes"
                  value={courseForm.notes}
                  onChange={(e) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Any additional instructions or notes"
                />
              </div>
              <Button
                type="submit"
                disabled={!courseForm.flightNumber || !courseForm.newHeading}
              >
                Request Course Correction
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
