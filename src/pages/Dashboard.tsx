
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { SessionList } from "@/components/dashboard/SessionList";
import { CreateSessionModal } from "@/components/dashboard/CreateSessionModal";
import { Button } from "@/components/ui/button";
import { Download, FileText, Plus } from "lucide-react";

const Dashboard = () => {
  const [createSessionOpen, setCreateSessionOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to ShadowSight</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="border-shadow-light bg-shadow-dark flex gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
          <Button 
            className="bg-highlight-purple hover:bg-highlight-purple/90 flex gap-2"
            onClick={() => setCreateSessionOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </div>
      </div>

      <StatsGrid />
      <SessionList />
      
      <CreateSessionModal 
        open={createSessionOpen} 
        onOpenChange={setCreateSessionOpen} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;
