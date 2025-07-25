"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePersonnel } from "@/contexts/personnel-context";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function PersonnelDashboard() {
  const { personnel, selectedMember, selectMember } = usePersonnel();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredPersonnel = personnel.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !filterDepartment || member.department === filterDepartment;
    const matchesStatus = !filterStatus || member.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "on-leave":
        return "bg-yellow-500";
      case "training":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500";
      case "supervisor":
        return "bg-orange-500";
      case "controller":
        return "bg-blue-500";
      case "technician":
        return "bg-green-500";
      case "pilot":
        return "bg-indigo-500";
      case "crew":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const departments = [...new Set(personnel.map((p) => p.department))];
  const statuses = [...new Set(personnel.map((p) => p.status))];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personnel Directory
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Personnel
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search personnel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border rounded-md "
                >
                  <option value="" className="dark:text-black">
                    All Departments
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="dark:text-black">
                      {dept}
                    </option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="" className="dark:text-black">
                    All Status
                  </option>
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="dark:text-black"
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                {filteredPersonnel.map((member) => (
                  <div
                    key={member.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedMember?.id === member.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => selectMember(member)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {getInitials(member.firstName, member.lastName)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">
                            {member.firstName} {member.lastName}
                          </h3>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <Badge
                            className={getRoleColor(member.role)}
                            variant="outline"
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {member.position}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{member.department}</span>
                          <span>ID: {member.employeeId}</span>
                          <span>{member.shift} shift</span>
                          <span>{member.location}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedMember && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personnel Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedMember.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {getInitials(
                        selectedMember.firstName,
                        selectedMember.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedMember.position}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <Badge className={getStatusColor(selectedMember.status)}>
                        {selectedMember.status}
                      </Badge>
                      <Badge
                        className={getRoleColor(selectedMember.role)}
                        variant="outline"
                      >
                        {selectedMember.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Employee ID</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedMember.employeeId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedMember.department}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Supervisor</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedMember.supervisor}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedMember.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Shift</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedMember.shift}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hire Date</label>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {selectedMember.hireDate.toLocaleDateString()} (
                      {formatDistanceToNow(selectedMember.hireDate, {
                        addSuffix: true,
                      })}
                      )
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {selectedMember.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {selectedMember.phone}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Emergency Contact</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedMember.emergencyContact.name}
                    </p>
                    <p>
                      <span className="font-medium">Relationship:</span>{" "}
                      {selectedMember.emergencyContact.relationship}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedMember.emergencyContact.phone}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedMember.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Schedule</h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {Object.entries(selectedMember.schedule).map(
                      ([day, isWorking]) => (
                        <div
                          key={day}
                          className={`p-1 text-center rounded ${
                            isWorking
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {day.slice(0, 3).toUpperCase()}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
