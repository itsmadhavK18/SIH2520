import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { useKPI } from '../context/KPIContext';
import { useAuth } from '../context/AuthContext';
import { KPI } from '../services/api';

export const KPIDashboard: React.FC = () => {
  const { user } = useAuth();
  const { kpis, userScores, fetchKPIs, fetchUserScores, calculateOverallScore } = useKPI();
  const [loading, setLoading] = useState(true);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        await fetchKPIs();
        await fetchUserScores(user.id);
        setLoading(false);
      }
    };
    
    loadData();
  }, [user, fetchKPIs, fetchUserScores]);

  useEffect(() => {
    if (user && userScores.length > 0) {
      const score = calculateOverallScore(user.id);
      setOverallScore(score);
    }
  }, [user, userScores, calculateOverallScore]);

  if (loading) {
    return <div className="p-4">Loading KPI data...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Performance Dashboard</h2>
      
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-2">Overall Performance Score</h3>
        <div className="flex items-center gap-4">
          <Progress value={overallScore} className="w-full h-4" />
          <span className="font-bold">{overallScore.toFixed(1)}%</span>
        </div>
      </Card>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">KPI Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <KPICard 
            key={kpi.id} 
            kpi={kpi} 
            score={userScores.find(score => score.kpiId === kpi.id)?.value || 0} 
          />
        ))}
      </div>
    </div>
  );
};

interface KPICardProps {
  kpi: KPI;
  score: number;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, score }) => {
  const progressPercentage = Math.min((score / kpi.targetValue) * 100, 100);
  
  return (
    <Card className="p-4">
      <h4 className="font-semibold">{kpi.name}</h4>
      <p className="text-sm text-gray-500 mb-2">{kpi.description}</p>
      
      <div className="flex justify-between text-sm mb-1">
        <span>Current: {score} {kpi.unit}</span>
        <span>Target: {kpi.targetValue} {kpi.unit}</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="mt-2 text-sm">
        <span className="font-medium">Weight: {kpi.weight}%</span>
      </div>
    </Card>
  );
};

export default KPIDashboard;