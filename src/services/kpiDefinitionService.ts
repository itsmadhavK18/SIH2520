// KPI Definition Service for Role-Based Performance Management
// Supports both Headquarters staff and Field Units with different metrics

export interface KPIDefinition {
  id: string;
  name: string;
  description: string;
  category: 'headquarters' | 'field';
  subCategory: string;
  unit: string;
  target: number;
  weight: number; // Weight in scoring (1-100)
  measurable: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  formula?: string;
  qualityMetrics?: QualityMetric[];
}

export interface QualityMetric {
  id: string;
  name: string;
  weight: number;
  criteria: string;
  scoreRange: { min: number; max: number };
}

// Role-specific KPI templates
export const HEADQUARTERS_KPI_TEMPLATES: KPIDefinition[] = [
  {
    id: 'hq_file_disposal_rate',
    name: 'File Disposal Rate',
    description: 'Number of files processed and disposed per month',
    category: 'headquarters',
    subCategory: 'administrative_efficiency',
    unit: 'files/month',
    target: 50,
    weight: 20,
    measurable: true,
    frequency: 'monthly',
    formula: 'Total files disposed / Total files received * 100'
  },
  {
    id: 'hq_turnaround_time',
    name: 'Average Turnaround Time',
    description: 'Average time taken to process files from receipt to disposal',
    category: 'headquarters',
    subCategory: 'responsiveness',
    unit: 'days',
    target: 7,
    weight: 25,
    measurable: true,
    frequency: 'monthly',
    formula: 'Sum of processing days for all files / Total files processed'
  },
  {
    id: 'hq_quality_drafting',
    name: 'Quality of Drafting',
    description: 'Assessment of drafting quality and accuracy',
    category: 'headquarters',
    subCategory: 'quality',
    unit: 'score',
    target: 85,
    weight: 20,
    measurable: false,
    frequency: 'monthly',
    qualityMetrics: [
      {
        id: 'accuracy',
        name: 'Accuracy',
        weight: 40,
        criteria: 'Factual correctness and attention to detail',
        scoreRange: { min: 0, max: 100 }
      },
      {
        id: 'clarity',
        name: 'Clarity',
        weight: 30,
        criteria: 'Clear and concise communication',
        scoreRange: { min: 0, max: 100 }
      },
      {
        id: 'compliance',
        name: 'Compliance',
        weight: 30,
        criteria: 'Adherence to guidelines and procedures',
        scoreRange: { min: 0, max: 100 }
      }
    ]
  },
  {
    id: 'hq_digital_adoption',
    name: 'Digital Adoption Rate',
    description: 'Percentage of work completed using digital systems',
    category: 'headquarters',
    subCategory: 'digital_transformation',
    unit: 'percentage',
    target: 90,
    weight: 15,
    measurable: true,
    frequency: 'monthly',
    formula: 'Digital transactions / Total transactions * 100'
  },
  {
    id: 'hq_responsiveness',
    name: 'Responsiveness Score',
    description: 'Response time to queries and requests',
    category: 'headquarters',
    subCategory: 'responsiveness',
    unit: 'hours',
    target: 24,
    weight: 20,
    measurable: true,
    frequency: 'weekly',
    formula: 'Average response time to all queries'
  }
];

export const FIELD_KPI_TEMPLATES: KPIDefinition[] = [
  {
    id: 'field_dpr_timeliness',
    name: 'DPR Preparation Timeliness',
    description: 'Percentage of DPRs completed within scheduled time',
    category: 'field',
    subCategory: 'project_delivery',
    unit: 'percentage',
    target: 90,
    weight: 25,
    measurable: true,
    frequency: 'monthly',
    formula: 'DPRs completed on time / Total DPRs assigned * 100'
  },
  {
    id: 'field_dpr_quality',
    name: 'DPR Quality Score',
    description: 'Quality assessment of prepared DPRs',
    category: 'field',
    subCategory: 'quality',
    unit: 'score',
    target: 85,
    weight: 20,
    measurable: false,
    frequency: 'monthly',
    qualityMetrics: [
      {
        id: 'technical_accuracy',
        name: 'Technical Accuracy',
        weight: 35,
        criteria: 'Correctness of technical specifications and calculations',
        scoreRange: { min: 0, max: 100 }
      },
      {
        id: 'completeness',
        name: 'Completeness',
        weight: 30,
        criteria: 'All required sections and data included',
        scoreRange: { min: 0, max: 100 }
      },
      {
        id: 'compliance_standards',
        name: 'Standards Compliance',
        weight: 35,
        criteria: 'Adherence to technical and regulatory standards',
        scoreRange: { min: 0, max: 100 }
      }
    ]
  },
  {
    id: 'field_survey_accuracy',
    name: 'Survey Accuracy Rate',
    description: 'Accuracy of field surveys and measurements',
    category: 'field',
    subCategory: 'technical_quality',
    unit: 'percentage',
    target: 95,
    weight: 20,
    measurable: true,
    frequency: 'monthly',
    formula: 'Accurate measurements / Total measurements * 100'
  },
  {
    id: 'field_project_timeline',
    name: 'Project Timeline Adherence',
    description: 'Adherence to project milestones and deadlines',
    category: 'field',
    subCategory: 'project_delivery',
    unit: 'percentage',
    target: 85,
    weight: 25,
    measurable: true,
    frequency: 'monthly',
    formula: 'Milestones achieved on time / Total milestones * 100'
  },
  {
    id: 'field_budget_utilization',
    name: 'Budget Utilization Efficiency',
    description: 'Optimal use of allocated project budget',
    category: 'field',
    subCategory: 'financial_management',
    unit: 'percentage',
    target: 95,
    weight: 15,
    measurable: true,
    frequency: 'monthly',
    formula: 'Actual expenditure / Approved budget * 100'
  },
  {
    id: 'field_physical_progress',
    name: 'Physical Progress Rate',
    description: 'Physical completion percentage vs planned progress',
    category: 'field',
    subCategory: 'execution',
    unit: 'percentage',
    target: 100,
    weight: 20,
    measurable: true,
    frequency: 'monthly',
    formula: 'Actual physical progress / Planned progress * 100'
  },
  {
    id: 'field_safety_compliance',
    name: 'Safety Compliance Score',
    description: 'Adherence to safety protocols and standards',
    category: 'field',
    subCategory: 'safety',
    unit: 'score',
    target: 95,
    weight: 15,
    measurable: true,
    frequency: 'monthly',
    formula: 'Safety protocols followed / Total protocols * 100'
  }
];

// KPI Definition Service Class
export class KPIDefinitionService {
  
  // Get KPIs based on role
  static getKPIsByRole(role: string): KPIDefinition[] {
    const roleMapping: Record<string, string> = {
      'administrator': 'headquarters',
      'supervisor': 'headquarters',
      'analyst': 'headquarters',
      'clerk': 'headquarters',
      'field_engineer': 'field',
      'project_manager': 'field',
      'surveyor': 'field',
      'contractor': 'field'
    };
    
    const category = roleMapping[role.toLowerCase()] || 'headquarters';
    
    return category === 'field' ? FIELD_KPI_TEMPLATES : HEADQUARTERS_KPI_TEMPLATES;
  }
  
  // Get KPIs by category
  static getKPIsByCategory(category: 'headquarters' | 'field'): KPIDefinition[] {
    return category === 'field' ? FIELD_KPI_TEMPLATES : HEADQUARTERS_KPI_TEMPLATES;
  }
  
  // Get KPI by ID
  static getKPIById(id: string): KPIDefinition | undefined {
    const allKPIs = [...HEADQUARTERS_KPI_TEMPLATES, ...FIELD_KPI_TEMPLATES];
    return allKPIs.find(kpi => kpi.id === id);
  }
  
  // Calculate weighted score for a set of KPI results
  static calculateWeightedScore(kpiResults: Array<{kpiId: string, score: number}>): number {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    kpiResults.forEach(result => {
      const kpi = this.getKPIById(result.kpiId);
      if (kpi) {
        totalWeightedScore += (result.score * kpi.weight);
        totalWeight += kpi.weight;
      }
    });
    
    return totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;
  }
  
  // Create custom KPI
  static createCustomKPI(kpiData: Partial<KPIDefinition>): KPIDefinition {
    return {
      id: `custom_${Date.now()}`,
      name: kpiData.name || 'Custom KPI',
      description: kpiData.description || '',
      category: kpiData.category || 'headquarters',
      subCategory: kpiData.subCategory || 'custom',
      unit: kpiData.unit || 'score',
      target: kpiData.target || 100,
      weight: kpiData.weight || 10,
      measurable: kpiData.measurable !== false,
      frequency: kpiData.frequency || 'monthly',
      formula: kpiData.formula,
      qualityMetrics: kpiData.qualityMetrics
    };
  }
  
  // Validate KPI result against target
  static validateKPIResult(kpiId: string, actualValue: number): {
    isValid: boolean;
    performance: 'excellent' | 'good' | 'average' | 'poor';
    percentageOfTarget: number;
  } {
    const kpi = this.getKPIById(kpiId);
    if (!kpi) {
      return { isValid: false, performance: 'poor', percentageOfTarget: 0 };
    }
    
    const percentage = (actualValue / kpi.target) * 100;
    
    let performance: 'excellent' | 'good' | 'average' | 'poor';
    if (percentage >= 100) performance = 'excellent';
    else if (percentage >= 80) performance = 'good';
    else if (percentage >= 60) performance = 'average';
    else performance = 'poor';
    
    return {
      isValid: true,
      performance,
      percentageOfTarget: Math.round(percentage)
    };
  }
  
  // Get performance benchmarks
  static getPerformanceBenchmarks() {
    return {
      excellent: { min: 90, max: 100, color: '#22c55e' },
      good: { min: 75, max: 89, color: '#3b82f6' },
      average: { min: 60, max: 74, color: '#f59e0b' },
      poor: { min: 0, max: 59, color: '#ef4444' }
    };
  }
  
  // Generate KPI report template
  static generateKPIReportTemplate(role: string): Array<{kpiId: string, target: number, weight: number}> {
    const kpis = this.getKPIsByRole(role);
    return kpis.map(kpi => ({
      kpiId: kpi.id,
      target: kpi.target,
      weight: kpi.weight
    }));
  }
}

export default KPIDefinitionService;