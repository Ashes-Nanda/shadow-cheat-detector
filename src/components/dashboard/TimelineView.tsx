
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Eye, MousePointer, ExternalLink, AlertTriangle } from "lucide-react";

// Mock data
const timelineEvents = [
  {
    id: 1,
    time: "10:15:23",
    type: "paste",
    details: "Large code block pasted",
    severity: "medium",
    icon: Clipboard
  },
  {
    id: 2,
    time: "10:18:45",
    type: "overlay",
    details: "Potential GPT overlay detected",
    severity: "high",
    icon: Eye
  },
  {
    id: 3,
    time: "10:19:30",
    type: "click",
    details: "Multiple rapid clicks detected",
    severity: "low",
    icon: MousePointer
  },
  {
    id: 4,
    time: "10:22:12",
    type: "tab_switch",
    details: "Tab switch detected",
    severity: "medium",
    icon: ExternalLink
  },
  {
    id: 5,
    time: "10:24:05",
    type: "overlay",
    details: "Potential GPT overlay detected",
    severity: "high",
    icon: Eye
  },
];

export function TimelineView() {
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

  return (
    <Card className="glass-card mt-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>
          <div className="flex items-center">
            Session Timeline
            <AlertTriangle className="h-4 w-4 ml-2 text-severity-high" />
          </div>
        </CardTitle>
        <Badge>Candidate #3</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-shadow-light space-y-6 py-2">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative animate-fade-in">
              <div className={`absolute w-3 h-3 rounded-full -left-7 top-1.5 ${
                event.severity === "high" ? "bg-severity-high" :
                event.severity === "medium" ? "bg-severity-medium" :
                "bg-severity-low"
              }`}></div>
              <div className="flex justify-between mb-1">
                <div className="text-xs text-muted-foreground font-mono">{event.time}</div>
                <Badge className={`${getSeverityClass(event.severity)}`}>
                  {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <event.icon className="h-4 w-4 text-muted-foreground" />
                <div className="font-medium">{event.type.charAt(0).toUpperCase() + event.type.slice(1)} Event</div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{event.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
