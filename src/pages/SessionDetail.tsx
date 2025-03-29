
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";
import { TimelineView } from "@/components/dashboard/TimelineView";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, FileText, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SessionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("timeline");
  
  // Mock session data
  const session = {
    id: id || "s-123458",
    candidate: "Anonymous Candidate #3",
    platform: "HackerRank",
    date: "2023-06-13",
    time: "10:15 AM - 11:45 AM",
    recruiter: "Jane Smith",
    position: "Senior Frontend Developer",
    trust_score: 45,
    risk_level: "high",
  };

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
                <p className="font-medium">{session.candidate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-medium">{session.platform}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{session.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{session.time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recruiter</p>
                <p className="font-medium">{session.recruiter}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">{session.position}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge className="bg-severity-high/20 text-severity-high mt-1">
                  {session.risk_level.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <TrustScoreCard score={session.trust_score} />
      </div>

      <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-shadow-dark">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="code">Code Review</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <TimelineView />
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
                  This session shows multiple signs of potential cheating:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Detected 2 GPT overlay events during problem-solving sections</li>
                  <li>Multiple rapid paste events with complex code structures</li>
                  <li>Timing analysis shows inconsistent coding patterns</li>
                  <li>Tab switching detected during critical implementation phase</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-shadow-light">
                  <p className="font-medium">Recommendation:</p>
                  <p className="text-severity-high">
                    This candidate's session has a high risk of external assistance. 
                    Consider a follow-up interview with additional monitoring.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SessionDetail;
