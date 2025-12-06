import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEffect, useState } from "react";

interface KPICardProps {
  name: string;
  current: number;
  target: number;
  unit?: string;
  weight?: number;
}

export const KPICard = ({ name, current, target, unit = "%", weight }: KPICardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (current / target) * 100;
  const trend = percentage >= 100 ? "up" : percentage >= 75 ? "stable" : "down";

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(current);
    }, 100);
    return () => clearTimeout(timer);
  }, [current]);

  const getStatusColor = () => {
    if (percentage >= 100) return "success";
    if (percentage >= 75) return "warning";
    return "destructive";
  };

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp size={20} />;
    if (trend === "down") return <TrendingDown size={20} />;
    return <Minus size={20} />;
  };

  const statusColor = getStatusColor();

  return (
    <Card className="kpi-card">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {weight && (
          <span className="text-xs bg-muted px-2 py-1 rounded">Weight: {weight}%</span>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-3xl font-bold">
              {animatedValue}
              <span className="text-lg text-muted-foreground">{unit}</span>
            </div>
            <p className="text-xs text-muted-foreground">Target: {target}{unit}</p>
          </div>
          <div className={`text-${statusColor}`}>
            {getTrendIcon()}
          </div>
        </div>
        <div className="progress-bar mt-3">
          <div
            className={`progress-fill bg-${statusColor} animate-progress`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span>
          <span className="font-medium">{percentage.toFixed(1)}% achieved</span>
          <span>{target}</span>
        </div>
      </CardContent>
    </Card>
  );
};
