// Weighted Scoring Model Service
// Quantifies employee performance on scale of 100 with measurable (70%) and qualitative (30%) weightages

import { KPIDefinitionService, KPIDefinition } from './kpiDefinitionService';

export interface PerformanceScore {
  employeeId: string;
  period: string; // YYYY-MM or YYYY-QQ format
  measurableScore: number; // 0-100
  qualitativeScore: number; // 0-100
  overallScore: number; // 0-100
  kpiScores: KPIScore[];
  qualitativeAssessments: QualitativeAssessment[];
  recommendations: string[];
  trend: 'improving' | 'stable' | 'declining';
  calculatedAt: Date;
}

export interface KPIScore {
  kpiId: string;
  kpiName: string;
  target: number;
  actual: number;
  percentage: number;
  weight: number;
  contributionScore: number; // weighted contribution to overall score
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface QualitativeAssessment {
  category: string;
  subcategory: string;
  score: number; // 0-100
  weight: number;
  assessorId: string;
  comments: string;
  evidenceLinks?: string[];
}

export interface EmployeeData {
  id: string;
  name: string;
  role: string;
  department: string;
  level: string;
  reportingManager: string;
}

// Scoring weights configuration
export const SCORING_WEIGHTS = {
  MEASURABLE: 0.70, // 70% weight for measurable KPIs
  QUALITATIVE: 0.30, // 30% weight for qualitative assessments
};

// Qualitative assessment categories for different roles
export const QUALITATIVE_CATEGORIES = {
  headquarters: [
    { id: 'initiative', name: 'Initiative & Innovation', weight: 25 },
    { id: 'teamwork', name: 'Teamwork & Collaboration', weight: 25 },
    { id: 'communication', name: 'Communication Skills', weight: 20 },
    { id: 'problem_solving', name: 'Problem Solving', weight: 20 },
    { id: 'adaptability', name: 'Adaptability', weight: 10 }
  ],
  field: [
    { id: 'technical_expertise', name: 'Technical Expertise', weight: 30 },
    { id: 'leadership', name: 'Leadership & Team Management', weight: 25 },
    { id: 'innovation', name: 'Innovation & Process Improvement', weight: 20 },
    { id: 'safety_awareness', name: 'Safety Awareness', weight: 15 },
    { id: 'stakeholder_management', name: 'Stakeholder Management', weight: 10 }
  ]
};

export class ScoringModelService {
  
  // Calculate overall performance score
  static calculatePerformanceScore(
    employeeData: EmployeeData,
    kpiResults: Array<{ kpiId: string; actual: number; period: string }>,
    qualitativeAssessments: QualitativeAssessment[],
    period: string
  ): PerformanceScore {
    
    // Get role-specific KPIs
    const roleKPIs = KPIDefinitionService.getKPIsByRole(employeeData.role);
    
    // Calculate measurable scores
    const kpiScores = this.calculateKPIScores(kpiResults, roleKPIs);
    const measurableScore = this.calculateMeasurableScore(kpiScores);
    
    // Calculate qualitative score
    const qualitativeScore = this.calculateQualitativeScore(qualitativeAssessments);
    
    // Calculate overall weighted score
    const overallScore = Math.round(
      (measurableScore * SCORING_WEIGHTS.MEASURABLE) + 
      (qualitativeScore * SCORING_WEIGHTS.QUALITATIVE)
    );
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(kpiScores, qualitativeAssessments, overallScore);
    
    // Determine trend (would need historical data in real implementation)
    const trend: 'improving' | 'stable' | 'declining' = 'stable'; // Placeholder
    
    return {
      employeeId: employeeData.id,
      period,
      measurableScore,
      qualitativeScore,
      overallScore,
      kpiScores,
      qualitativeAssessments,
      recommendations,
      trend,
      calculatedAt: new Date()
    };
  }
  
  // Calculate KPI scores with weighted contributions
  static calculateKPIScores(
    kpiResults: Array<{ kpiId: string; actual: number; period: string }>,
    roleKPIs: KPIDefinition[]
  ): KPIScore[] {
    return kpiResults.map(result => {
      const kpiDef = roleKPIs.find(kpi => kpi.id === result.kpiId);
      if (!kpiDef) {
        throw new Error(`KPI definition not found for ${result.kpiId}`);
      }
      
      const percentage = Math.min((result.actual / kpiDef.target) * 100, 150); // Cap at 150%
      const contributionScore = (percentage / 100) * kpiDef.weight;
      
      let status: 'excellent' | 'good' | 'average' | 'poor';
      if (percentage >= 100) status = 'excellent';
      else if (percentage >= 80) status = 'good';
      else if (percentage >= 60) status = 'average';
      else status = 'poor';
      
      return {
        kpiId: result.kpiId,
        kpiName: kpiDef.name,
        target: kpiDef.target,
        actual: result.actual,
        percentage: Math.round(percentage),
        weight: kpiDef.weight,
        contributionScore: Math.round(contributionScore),
        status
      };
    });
  }
  
  // Calculate overall measurable score from KPI scores
  static calculateMeasurableScore(kpiScores: KPIScore[]): number {
    if (kpiScores.length === 0) return 0;
    
    const totalWeightedScore = kpiScores.reduce((sum, kpi) => sum + kpi.contributionScore, 0);
    const totalWeight = kpiScores.reduce((sum, kpi) => sum + kpi.weight, 0);
    
    return totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight * 100) : 0;
  }
  
  // Calculate qualitative score from assessments
  static calculateQualitativeScore(assessments: QualitativeAssessment[]): number {
    if (assessments.length === 0) return 75; // Default score if no assessments
    
    const totalWeightedScore = assessments.reduce((sum, assessment) => 
      sum + (assessment.score * assessment.weight), 0);
    const totalWeight = assessments.reduce((sum, assessment) => sum + assessment.weight, 0);
    
    return totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 75;
  }
  
  // Generate personalized recommendations
  static generateRecommendations(
    kpiScores: KPIScore[],
    qualitativeAssessments: QualitativeAssessment[],
    overallScore: number
  ): string[] {
    const recommendations: string[] = [];
    
    // KPI-based recommendations
    const poorKPIs = kpiScores.filter(kpi => kpi.status === 'poor' || kpi.status === 'average');
    poorKPIs.forEach(kpi => {
      if (kpi.kpiName.includes('Timeliness') || kpi.kpiName.includes('Turnaround')) {
        recommendations.push(`Focus on improving time management for ${kpi.kpiName.toLowerCase()}`);
      } else if (kpi.kpiName.includes('Quality')) {
        recommendations.push(`Consider additional training in quality assurance for ${kpi.kpiName.toLowerCase()}`);
      } else if (kpi.kpiName.includes('Budget') || kpi.kpiName.includes('Financial')) {
        recommendations.push(`Enhance financial planning and budget management skills`);
      }
    });
    
    // Qualitative-based recommendations
    const lowQualitativeAreas = qualitativeAssessments.filter(assessment => assessment.score < 70);
    lowQualitativeAreas.forEach(area => {
      switch (area.category) {
        case 'initiative':
          recommendations.push('Encourage taking on new challenges and proposing innovative solutions');
          break;
        case 'teamwork':
          recommendations.push('Participate in more cross-functional collaboration opportunities');
          break;
        case 'communication':
          recommendations.push('Consider communication skills development training');
          break;
        case 'technical_expertise':
          recommendations.push('Pursue advanced technical training or certifications');
          break;
        case 'leadership':
          recommendations.push('Enroll in leadership development programs');
          break;
      }
    });
    
    // Overall performance recommendations
    if (overallScore < 60) {
      recommendations.push('Comprehensive performance improvement plan recommended');
      recommendations.push('Regular mentoring sessions with supervisor');
    } else if (overallScore < 75) {
      recommendations.push('Focus on top 2-3 improvement areas for next quarter');
    } else if (overallScore >= 90) {
      recommendations.push('Excellent performance - consider leadership or mentoring opportunities');
    }
    
    return recommendations.slice(0, 5); // Limit to top 5 recommendations
  }
  
  // Get performance grade based on score
  static getPerformanceGrade(score: number): {
    grade: string;
    description: string;
    color: string;
  } {
    if (score >= 90) {
      return { grade: 'A+', description: 'Outstanding', color: '#059669' };
    } else if (score >= 80) {
      return { grade: 'A', description: 'Excellent', color: '#22c55e' };
    } else if (score >= 70) {
      return { grade: 'B+', description: 'Good', color: '#3b82f6' };
    } else if (score >= 60) {
      return { grade: 'B', description: 'Satisfactory', color: '#f59e0b' };
    } else if (score >= 50) {
      return { grade: 'C', description: 'Needs Improvement', color: '#f97316' };
    } else {
      return { grade: 'D', description: 'Unsatisfactory', color: '#ef4444' };
    }
  }
  
  // Calculate team average score
  static calculateTeamScore(individualScores: PerformanceScore[]): {
    averageScore: number;
    measurableAverage: number;
    qualitativeAverage: number;
    topPerformers: string[];
    improvementNeeded: string[];
  } {
    if (individualScores.length === 0) {
      return {
        averageScore: 0,
        measurableAverage: 0,
        qualitativeAverage: 0,
        topPerformers: [],
        improvementNeeded: []
      };
    }
    
    const averageScore = Math.round(
      individualScores.reduce((sum, score) => sum + score.overallScore, 0) / individualScores.length
    );
    
    const measurableAverage = Math.round(
      individualScores.reduce((sum, score) => sum + score.measurableScore, 0) / individualScores.length
    );
    
    const qualitativeAverage = Math.round(
      individualScores.reduce((sum, score) => sum + score.qualitativeScore, 0) / individualScores.length
    );
    
    const topPerformers = individualScores
      .filter(score => score.overallScore >= 85)
      .map(score => score.employeeId)
      .slice(0, 3);
    
    const improvementNeeded = individualScores
      .filter(score => score.overallScore < 60)
      .map(score => score.employeeId);
    
    return {
      averageScore,
      measurableAverage,
      qualitativeAverage,
      topPerformers,
      improvementNeeded
    };
  }
  
  // Generate score comparison with previous periods
  static comparePerformance(
    currentScore: PerformanceScore,
    previousScores: PerformanceScore[]
  ): {
    trend: 'improving' | 'stable' | 'declining';
    changePercentage: number;
    improvementAreas: string[];
    declineAreas: string[];
  } {
    if (previousScores.length === 0) {
      return {
        trend: 'stable',
        changePercentage: 0,
        improvementAreas: [],
        declineAreas: []
      };
    }
    
    const previousScore = previousScores[previousScores.length - 1];
    const changePercentage = Math.round(
      ((currentScore.overallScore - previousScore.overallScore) / previousScore.overallScore) * 100
    );
    
    let trend: 'improving' | 'stable' | 'declining';
    if (changePercentage > 5) trend = 'improving';
    else if (changePercentage < -5) trend = 'declining';
    else trend = 'stable';
    
    // Compare individual KPIs
    const improvementAreas: string[] = [];
    const declineAreas: string[] = [];
    
    currentScore.kpiScores.forEach(currentKPI => {
      const previousKPI = previousScore.kpiScores.find(kpi => kpi.kpiId === currentKPI.kpiId);
      if (previousKPI) {
        const kpiChange = currentKPI.percentage - previousKPI.percentage;
        if (kpiChange > 10) {
          improvementAreas.push(currentKPI.kpiName);
        } else if (kpiChange < -10) {
          declineAreas.push(currentKPI.kpiName);
        }
      }
    });
    
    return {
      trend,
      changePercentage,
      improvementAreas,
      declineAreas
    };
  }
  
  // Export performance data for reporting
  static exportPerformanceData(scores: PerformanceScore[]): any[] {
    return scores.map(score => ({
      employeeId: score.employeeId,
      period: score.period,
      overallScore: score.overallScore,
      measurableScore: score.measurableScore,
      qualitativeScore: score.qualitativeScore,
      grade: this.getPerformanceGrade(score.overallScore).grade,
      trend: score.trend,
      topKPIs: score.kpiScores
        .filter(kpi => kpi.status === 'excellent')
        .map(kpi => kpi.kpiName),
      improvementAreas: score.kpiScores
        .filter(kpi => kpi.status === 'poor' || kpi.status === 'average')
        .map(kpi => kpi.kpiName),
      recommendations: score.recommendations
    }));
  }
}

export default ScoringModelService;