
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Eye, MousePointer, ExternalLink, AlertTriangle, Loader2, Plus } from "lucide-react";
import { flaggedEventService } from "@/services/firestore";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AddFlaggedEventForm } from "./AddFlaggedEventForm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TimelineViewProps {
  sessionId?: string;
}

interface Event {
  id: string;
  time: string;
  type: string;
  details: string;
  severity: string;
  timestamp: any;
}

export function TimelineView({ sessionId }: TimelineViewProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [sessionId]);

  const fetchEvents = async () => {
    if (!sessionId) return;
    
    try {
      setLoading(true);
      const fetchedEvents = await flaggedEventService.getEventsBySession(sessionId);
      
      // If no events found, use mock data for now
      if (fetchedEvents.length === 0) {
        setEvents(getMockEvents());
      } else {
        setEvents(fetchedEvents as Event[]);
      }
    } catch (error) {
      console.error("Error fetching flagged events:", error);
      toast({
        title: "Error",
        description: "Failed to load timeline events",
        variant: "destructive",
      });
      // Fall back to mock data
      setEvents(getMockEvents());
    } finally {
      setLoading(false);
    }
  };

  const getMockEvents = () => {
    return [
      {
        id: "1",
        time: "10:15:23",
        type: "paste",
        details: "Large code block pasted",
        severity: "medium",
        timestamp: new Date()
      },
      {
        id: "2",
        time: "10:18:45",
        type: "overlay",
        details: "Potential GPT overlay detected",
        severity: "high",
        timestamp: new Date()
      },
      {
        id: "3",
        time: "10:19:30",
        type: "click",
        details: "Multiple rapid clicks detected",
        severity: "low",
        timestamp: new Date()
      },
      {
        id: "4",
        time: "10:22:12",
        type: "tab_switch",
        details: "Tab switch detected",
        severity: "medium",
        timestamp: new Date()
      },
      {
        id: "5",
        time: "10:24:05",
        type: "overlay",
        details: "Potential GPT overlay detected",
        severity: "high",
        timestamp: new Date()
      },
    ];
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-severity-low/20 text-severity-low";
      case "medium":
        return "bg-severity-medium/20 text-severity-medium";
      case "high":
        return "bg-severity-high/20 text-severity-high";
      case "critical":
        return "bg-severity-critical/20 text-severity-critical";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "paste":
        return Clipboard;
      case "overlay":
        return Eye;
      case "click":
        return MousePointer;
      case "tab_switch":
        return ExternalLink;
      default:
        return AlertTriangle;
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "N/A";
    
    try {
      // If it's a Firebase timestamp, convert to JS Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  const handleEventAdded = () => {
    fetchEvents();
    setIsFormOpen(false);
  };

  if (loading) {
    return (
      <Card className="glass-card mt-6">
        <CardContent>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-highlight-purple" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card mt-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>
          <div className="flex items-center">
            Session Timeline
            {events.some(e => e.severity === "high") && (
              <AlertTriangle className="h-4 w-4 ml-2 text-severity-high" />
            )}
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge>Events: {events.length}</Badge>
          <Collapsible
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
          >
            <CollapsibleTrigger asChild>
              <Button size="sm" className="bg-highlight-purple hover:bg-highlight-purple/90">
                <Plus className="h-4 w-4 mr-1" /> Add Event
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
        >
          <CollapsibleContent className="mb-6 p-4 bg-shadow-dark rounded-md">
            <h3 className="font-medium mb-2">Add Flagged Event</h3>
            {sessionId && <AddFlaggedEventForm sessionId={sessionId} onSuccess={handleEventAdded} />}
          </CollapsibleContent>
        </Collapsible>

        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No events detected in this session yet.</p>
          </div>
        ) : (
          <div className="relative pl-6 border-l border-shadow-light space-y-6 py-2">
            {events.map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div key={event.id} className="relative animate-fade-in">
                  <div className={`absolute w-3 h-3 rounded-full -left-7 top-1.5 ${
                    event.severity === "high" ? "bg-severity-high" :
                    event.severity === "medium" ? "bg-severity-medium" :
                    "bg-severity-low"
                  }`}></div>
                  <div className="flex justify-between mb-1">
                    <div className="text-xs text-muted-foreground font-mono">
                      {event.time || formatTime(event.timestamp)}
                    </div>
                    <Badge className={`${getSeverityClass(event.severity)}`}>
                      {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <EventIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">{event.type.charAt(0).toUpperCase() + event.type.slice(1)} Event</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.details}</p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
