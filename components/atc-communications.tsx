"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useATC } from "@/contexts/atc-context";
import { Radio, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function ATCCommunications() {
  const { communications, approveClearance, denyClearance } = useATC();
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "denied":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Radio className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "takeoff":
        return "Takeoff Clearance";
      case "landing":
        return "Landing Permission";
      case "altitude":
        return "Altitude Change";
      case "course":
        return "Course Correction";
      default:
        return "General Communication";
    }
  };

  const handleApprove = (id: string) => {
    const response = responses[id] || "Clearance approved";
    approveClearance(id, response);
    setResponses((prev) => ({ ...prev, [id]: "" }));
  };

  const handleDeny = (id: string) => {
    const response = responses[id] || "Clearance denied";
    denyClearance(id, response);
    setResponses((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5" />
          Active Communications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {communications.map((comm) => (
              <div key={comm.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(comm.status)}
                    <span className="font-semibold">{comm.callSign}</span>
                    <Badge variant="outline">{getTypeLabel(comm.type)}</Badge>
                    <div
                      className={`w-2 h-2 rounded-full ${getPriorityColor(
                        comm.priority
                      )}`}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(comm.timestamp, { addSuffix: true })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Request: </span>
                    <span className="text-sm">{comm.request}</span>
                  </div>

                  {comm.response && (
                    <div>
                      <span className="text-sm font-medium">Response: </span>
                      <span className="text-sm">{comm.response}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Controller: {comm.controller}</span>
                    <span>Frequency: {comm.frequency}</span>
                    <span>Flight: {comm.flightNumber}</span>
                  </div>
                </div>

                {comm.status === "pending" && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Enter response..."
                      value={responses[comm.id] || ""}
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          [comm.id]: e.target.value,
                        }))
                      }
                      className="min-h-[60px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(comm.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeny(comm.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Deny
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
