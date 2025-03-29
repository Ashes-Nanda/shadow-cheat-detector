
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { sessionService } from "@/services/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar, Clock, Users } from "lucide-react";

export function StatsGrid() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeSessions: 0,
    uniqueCandidates: 0,
    flaggedSessions: 0,
    flaggedPercentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const calculateStats = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const sessions = await sessionService.getSessions(currentUser.uid);
        
        // Calculate statistics
        const totalSessions = sessions.length;
        const activeSessions = sessions.filter((s: any) => s.status === "active").length;
        
        // Count unique candidates by name
        const uniqueCandidates = new Set(sessions.map((s: any) => s.candidateName)).size;
        
        // Count flagged sessions (sessions with flags > 0)
        const flaggedSessions = sessions.filter((s: any) => s.flags > 0).length;
        
        // Calculate percentage
        const flaggedPercentage = totalSessions > 0 
          ? Math.round((flaggedSessions / totalSessions) * 100) 
          : 0;
        
        setStats({
          totalSessions,
          activeSessions,
          uniqueCandidates,
          flaggedSessions,
          flaggedPercentage,
        });
      } catch (error) {
        console.error("Error calculating stats:", error);
        // Set mock data in case of error
        setStats({
          totalSessions: 0,
          activeSessions: 0,
          uniqueCandidates: 0,
          flaggedSessions: 0,
          flaggedPercentage: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    calculateStats();
  }, [currentUser]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSessions}</div>
          <p className="text-xs text-muted-foreground">
            All your interview sessions
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeSessions}</div>
          <p className="text-xs text-muted-foreground">
            Interviews in progress
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Candidates</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueCandidates}</div>
          <p className="text-xs text-muted-foreground">
            Unique interview candidates
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Flagged Sessions</CardTitle>
          <AlertTriangle className="h-4 w-4 text-severity-high" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.flaggedSessions}</div>
          <p className="text-xs text-severity-high">
            {stats.flaggedPercentage}% of total sessions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
