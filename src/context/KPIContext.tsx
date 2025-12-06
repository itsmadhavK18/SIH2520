import React, { createContext, useContext, useState, useEffect } from 'react';
import { KPI, PerformanceScore, api } from '../services/api';
import { useAuth } from './AuthContext';

interface KPIContextType {
  kpis: KPI[];
  userScores: PerformanceScore[];
  loading: boolean;
  error: string | null;
  fetchKPIs: () => Promise<void>;
  fetchUserScores: (userId: string) => Promise<void>;
  addScore: (score: Omit<PerformanceScore, 'id'>) => Promise<void>;
  calculateOverallScore: (userId: string) => number;
}

const KPIContext = createContext<KPIContextType | undefined>(undefined);

export const KPIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [userScores, setUserScores] = useState<PerformanceScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchKPIs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = user ? await api.getKPIsByRole(user.role) : await api.getKPIs();
      setKPIs(data);
    } catch (err) {
      setError('Failed to fetch KPIs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserScores = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const scores = await api.getPerformanceScores(userId);
      setUserScores(scores);
    } catch (err) {
      setError('Failed to fetch performance scores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addScore = async (scoreData: Omit<PerformanceScore, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newScore = await api.addPerformanceScore(scoreData as PerformanceScore);
      setUserScores(prev => [...prev, newScore]);
    } catch (err) {
      setError('Failed to add performance score');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallScore = (userId: string): number => {
    const userKPIScores = userScores.filter(score => score.userId === userId);
    
    if (userKPIScores.length === 0) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    userKPIScores.forEach(score => {
      const kpi = kpis.find(k => k.id === score.kpiId);
      if (kpi) {
        // Calculate percentage of target achieved
        const achievementPercentage = (score.value / kpi.targetValue) * 100;
        // Cap at 100% achievement for scoring purposes
        const cappedPercentage = Math.min(achievementPercentage, 100);
        // Add weighted score
        totalWeightedScore += (cappedPercentage * kpi.weight);
        totalWeight += kpi.weight;
      }
    });
    
    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };

  // Load KPIs when user changes
  useEffect(() => {
    if (user) {
      fetchKPIs();
      fetchUserScores(user.id);
    }
  }, [user]);

  return (
    <KPIContext.Provider
      value={{
        kpis,
        userScores,
        loading,
        error,
        fetchKPIs,
        fetchUserScores,
        addScore,
        calculateOverallScore,
      }}
    >
      {children}
    </KPIContext.Provider>
  );
};

export const useKPI = (): KPIContextType => {
  const context = useContext(KPIContext);
  if (context === undefined) {
    throw new Error('useKPI must be used within a KPIProvider');
  }
  return context;
};