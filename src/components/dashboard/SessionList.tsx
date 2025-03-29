
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { sessionService } from "@/services/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, Filter, ArrowUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Session interface
interface Session {
  id: string;
  candidateName: string;
  platform: string;
  timestamp: any; // Firebase timestamp
  trustScore: number;
  flags: number;
  severity: string;
  position: string;
}

export function SessionList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const fetchedSessions = await sessionService.getSessions(currentUser.uid);
        setSessions(fetchedSessions as Session[]);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentUser]);

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

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    
    try {
      // If it's a Firebase timestamp, convert to JS Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const filteredSessions = sessions.filter(session => 
    session.candidateName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.platform?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="glass-card mt-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Recent Sessions</CardTitle>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search sessions..."
                className="pl-8 bg-shadow-dark border-shadow-light text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="ml-2 bg-shadow-dark border-shadow-light">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-highlight-purple" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sessions found. Create your first session to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-shadow-dark">
              <TableRow>
                <TableHead className="w-[100px]">Session ID</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end">
                    Trust Score
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id} className="hover:bg-shadow-light/40">
                  <TableCell className="font-mono text-xs">{session.id}</TableCell>
                  <TableCell>
                    <Link to={`/sessions/${session.id}`} className="hover:text-highlight-purple">
                      {session.candidateName}
                    </Link>
                  </TableCell>
                  <TableCell>{session.platform}</TableCell>
                  <TableCell>{formatDate(session.timestamp)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {session.trustScore}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {session.flags > 0 && (
                        <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-severity-high" />
                      )}
                      <Badge className={`${getSeverityClass(session.severity)}`}>
                        {session.severity.charAt(0).toUpperCase() + session.severity.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
