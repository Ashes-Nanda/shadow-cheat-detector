
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TimelineView } from "@/components/dashboard/TimelineView";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";
import { sessionService } from "@/services/firestore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, FileText, Share2, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SessionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("timeline");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSessionData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const sessionData = await sessionService.getSessionById(id);
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session details:", error);
        toast({
          title: "Error",
          description: "Failed to load session details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [id]);

  const handleDeleteSession = async () => {
    if (!id) return;
    
    try {
      setDeleting(true);
      await sessionService.deleteSession(id);
      toast({
        title: "Success",
        description: "Session deleted successfully",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting session:", error);
      toast({
        title: "Error",
        description: "Failed to delete session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
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

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "N/A";
    
    try {
      // If it's a Firebase timestamp, convert to JS Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="h-12 w-12 animate-spin text-highlight-purple" />
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Session Not Found</h2>
          <p className="text-muted-foreground mb-6">The session you're looking for doesn't exist or has been deleted.</p>
          <Button asChild>
            <Link to="/dashboard">Go Back to Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="icon" asChild className="mr-2 hover:bg-shadow-light">
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Session Details</h1>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">ID:</span>
            <code className="font-mono text-sm bg-shadow-dark px-2 py-0.5 rounded">{session.id}</code>
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="border-shadow-light bg-shadow-dark text-severity-high hover:bg-severity-high/20 hover:text-severity-high"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button variant="outline" className="border-shadow-light bg-shadow-dark flex gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="border-shadow-light bg-shadow-dark flex gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="glass-card md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Interview Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Candidate</p>
                <p className="font-medium">{session.candidateName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-medium">{session.platform}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(session.timestamp)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{formatTime(session.timestamp)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">{session.position}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge className={`bg-severity-${session.severity}/20 text-severity-${session.severity} mt-1`}>
                  {session.severity?.toUpperCase()}
                </Badge>
              </div>
              {session.notes && (
                <div className="col-span-2 md:col-span-3">
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="font-medium">{session.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <TrustScoreCard score={session.trustScore} />
      </div>

      <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-shadow-dark">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="code">Code Review</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <TimelineView sessionId={id} />
        </TabsContent>
        <TabsContent value="code">
          <Card className="glass-card mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Code Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-shadow-dark p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>
                  {`// This feature will be implemented in a future phase
function calculateTrustScore(events) {
  let score = 100;
  
  // Analyze paste events
  const pasteEvents = events.filter(e => e.type === "paste");
  const pasteDeduction = pasteEvents.length * 5;
  
  // Analyze overlay events
  const overlayEvents = events.filter(e => e.type === "overlay");
  const overlayDeduction = overlayEvents.length * 15;
  
  // Analyze tab switching
  const tabEvents = events.filter(e => e.type === "tab_switch");
  const tabDeduction = tabEvents.length * 8;
  
  return Math.max(0, score - pasteDeduction - overlayDeduction - tabDeduction);
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis">
          <Card className="glass-card mt-6">
            <CardHeader className="pb-2">
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-shadow-dark p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  {session.severity === "low" 
                    ? "This session shows no significant signs of cheating."
                    : session.severity === "medium"
                    ? "This session shows some potential signs of external assistance."
                    : "This session shows multiple signs of potential cheating:"}
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  {session.severity !== "low" && (
                    <>
                      <li>{session.flags > 1 ? `Detected ${session.flags} events` : "Detected 1 event"} that may indicate external help</li>
                      {session.severity === "high" && (
                        <>
                          <li>Multiple rapid paste events with complex code structures</li>
                          <li>Timing analysis shows inconsistent coding patterns</li>
                        </>
                      )}
                    </>
                  )}
                  {session.severity === "low" && (
                    <li>Coding patterns appear consistent and authentic</li>
                  )}
                </ul>
                <div className="mt-4 pt-4 border-t border-shadow-light">
                  <p className="font-medium">Recommendation:</p>
                  <p className={`text-severity-${session.severity}`}>
                    {session.severity === "low" 
                      ? "This candidate's session has a low risk of external assistance. Proceed with the hiring process."
                      : session.severity === "medium"
                      ? "This candidate's session has a medium risk of external assistance. Consider a follow-up interview."
                      : "This candidate's session has a high risk of external assistance. Consider a follow-up interview with additional monitoring."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the session
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSession}
              className="bg-severity-high hover:bg-severity-high/90"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default SessionDetail;
