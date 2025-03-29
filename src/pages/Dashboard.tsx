
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { SessionList } from "@/components/dashboard/SessionList";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";
import { Button } from "@/components/ui/button";
import { Download, FileText, Plus } from "lucide-react";

const Dashboard = () => {
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
          <Button className="bg-highlight-purple hover:bg-highlight-purple/90 flex gap-2">
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </div>
      </div>

      <StatsGrid />
      <SessionList />
    </DashboardLayout>
  );
};

export default Dashboard;
