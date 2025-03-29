
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Search, AlertTriangle, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const sessions = [
  {
    id: "s-123456",
    candidate: "Anonymous Candidate #1",
    platform: "HackerRank",
    date: "2023-06-15",
    trust_score: 94,
    flags: 0,
    severity: "low"
  },
  {
    id: "s-123457",
    candidate: "Anonymous Candidate #2",
    platform: "CoderPad",
    date: "2023-06-14",
    trust_score: 72,
    flags: 2,
    severity: "medium"
  },
  {
    id: "s-123458",
    candidate: "Anonymous Candidate #3",
    platform: "HackerRank",
    date: "2023-06-13",
    trust_score: 45,
    flags: 4,
    severity: "high"
  },
  {
    id: "s-123459",
    candidate: "Anonymous Candidate #4",
    platform: "CoderPad",
    date: "2023-06-12",
    trust_score: 98,
    flags: 0,
    severity: "low"
  },
  {
    id: "s-123460",
    candidate: "Anonymous Candidate #5",
    platform: "HackerRank",
    date: "2023-06-10",
    trust_score: 32,
    flags: 8,
    severity: "critical"
  },
  {
    id: "s-123461",
    candidate: "Anonymous Candidate #6",
    platform: "CoderPad",
    date: "2023-06-09",
    trust_score: 86,
    flags: 1,
    severity: "low"
  },
  {
    id: "s-123462",
    candidate: "Anonymous Candidate #7",
    platform: "HackerRank",
    date: "2023-06-07",
    trust_score: 63,
    flags: 3,
    severity: "medium"
  }
];

export function SessionList() {
  const [searchQuery, setSearchQuery] = useState("");

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
            {sessions
              .filter(session => 
                session.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                session.platform.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((session) => (
                <TableRow key={session.id} className="hover:bg-shadow-light/40">
                  <TableCell className="font-mono text-xs">{session.id}</TableCell>
                  <TableCell>
                    <Link to={`/sessions/${session.id}`} className="hover:text-highlight-purple">
                      {session.candidate}
                    </Link>
                  </TableCell>
                  <TableCell>{session.platform}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell className="text-right font-medium">
                    {session.trust_score}
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
      </CardContent>
    </Card>
  );
}
