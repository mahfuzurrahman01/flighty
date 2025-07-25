"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export interface PersonnelMember {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: "admin" | "controller" | "supervisor" | "technician" | "pilot" | "crew";
  status: "active" | "inactive" | "on-leave" | "training";
  hireDate: Date;
  certifications: string[];
  shift: "day" | "evening" | "night" | "rotating";
  location: string;
  supervisor: string;
  avatar?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  schedule: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

interface PersonnelContextType {
  personnel: PersonnelMember[];
  selectedMember: PersonnelMember | null;
  addPersonnel: (member: Omit<PersonnelMember, "id">) => void;
  updatePersonnel: (id: string, updates: Partial<PersonnelMember>) => void;
  deletePersonnel: (id: string) => void;
  selectMember: (member: PersonnelMember | null) => void;
}

const PersonnelContext = createContext<PersonnelContextType | undefined>(
  undefined
);

export function usePersonnel() {
  const context = useContext(PersonnelContext);
  if (!context) {
    throw new Error("usePersonnel must be used within a PersonnelProvider");
  }
  return context;
}

export function PersonnelProvider({ children }: { children: React.ReactNode }) {
  const [personnel, setPersonnel] = useState<PersonnelMember[]>([
    {
      id: "1",
      employeeId: "EMP001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@flightcontrol.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Air Traffic Controller",
      department: "Air Traffic Control",
      role: "controller",
      status: "active",
      hireDate: new Date("2020-03-15"),
      certifications: ["ATC License", "Radar Endorsement", "Tower Rating"],
      shift: "day",
      location: "Tower",
      supervisor: "Jane Doe",
      emergencyContact: {
        name: "Mary Smith",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543",
      },
      schedule: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
    {
      id: "2",
      employeeId: "EMP002",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@flightcontrol.com",
      phone: "+1 (555) 234-5678",
      position: "ATC Supervisor",
      department: "Air Traffic Control",
      role: "supervisor",
      status: "active",
      hireDate: new Date("2018-07-22"),
      certifications: [
        "ATC License",
        "Supervisor Rating",
        "Emergency Procedures",
      ],
      shift: "rotating",
      location: "Control Center",
      supervisor: "Mike Wilson",
      emergencyContact: {
        name: "Robert Johnson",
        relationship: "Father",
        phone: "+1 (555) 876-5432",
      },
      schedule: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: true,
        sunday: false,
      },
    },
    {
      id: "3",
      employeeId: "EMP003",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@flightcontrol.com",
      phone: "+1 (555) 345-6789",
      position: "Radar Technician",
      department: "Technical Services",
      role: "technician",
      status: "active",
      hireDate: new Date("2021-11-08"),
      certifications: [
        "Electronics Certification",
        "Radar Systems",
        "Safety Training",
      ],
      shift: "evening",
      location: "Equipment Room",
      supervisor: "Sarah Johnson",
      emergencyContact: {
        name: "Lisa Brown",
        relationship: "Sister",
        phone: "+1 (555) 765-4321",
      },
      schedule: {
        monday: false,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: true,
      },
    },
    {
      id: "4",
      employeeId: "EMP004",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@flightcontrol.com",
      phone: "+1 (555) 456-7890",
      position: "Flight Data Coordinator",
      department: "Flight Operations",
      role: "controller",
      status: "training",
      hireDate: new Date("2024-01-15"),
      certifications: ["Basic ATC Training", "Flight Data Systems"],
      shift: "day",
      location: "Operations Center",
      supervisor: "John Smith",
      emergencyContact: {
        name: "David Davis",
        relationship: "Husband",
        phone: "+1 (555) 654-3210",
      },
      schedule: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
  ]);

  const [selectedMember, setSelectedMember] = useState<PersonnelMember | null>({
    id: "1",
    employeeId: "EMP001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@flightcontrol.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Air Traffic Controller",
    department: "Air Traffic Control",
    role: "controller",
    status: "active",
    hireDate: new Date("2020-03-15"),
    certifications: ["ATC License", "Radar Endorsement", "Tower Rating"],
    shift: "day",
    location: "Tower",
    supervisor: "Jane Doe",
    emergencyContact: {
      name: "Mary Smith",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  });

  const addPersonnel = (member: Omit<PersonnelMember, "id">) => {
    const newMember: PersonnelMember = {
      ...member,
      id: Date.now().toString(),
    };
    setPersonnel((prev) => [...prev, newMember]);
  };

  const updatePersonnel = (id: string, updates: Partial<PersonnelMember>) => {
    setPersonnel((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  const deletePersonnel = (id: string) => {
    setPersonnel((prev) => prev.filter((member) => member.id !== id));
    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
  };

  const selectMember = (member: PersonnelMember | null) => {
    setSelectedMember(member);
  };

  return (
    <PersonnelContext.Provider
      value={{
        personnel,
        selectedMember,
        addPersonnel,
        updatePersonnel,
        deletePersonnel,
        selectMember,
      }}
    >
      {children}
    </PersonnelContext.Provider>
  );
}
