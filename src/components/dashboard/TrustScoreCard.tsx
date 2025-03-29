
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TrustScoreCardProps {
  score: number;
}

export function TrustScoreCard({ score }: TrustScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-severity-low";
    if (score >= 70) return "bg-severity-medium";
    if (score >= 50) return "bg-severity-high";
    return "bg-severity-critical";
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return "Trustworthy";
    if (score >= 70) return "Mostly Trustworthy";
    if (score >= 50) return "Questionable";
    return "Suspicious";
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">{score}</div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            score >= 90 ? "bg-severity-low/20 text-severity-low" :
            score >= 70 ? "bg-severity-medium/20 text-severity-medium" :
            score >= 50 ? "bg-severity-high/20 text-severity-high" :
            "bg-severity-critical/20 text-severity-critical"
          }`}>
            {getScoreText(score)}
          </div>
        </div>
        <Progress 
          value={score} 
          max={100} 
          className="h-2 mt-2 bg-shadow-dark" 
          indicatorClassName={getScoreColor(score)} 
        />
      </CardContent>
    </Card>
  );
}
