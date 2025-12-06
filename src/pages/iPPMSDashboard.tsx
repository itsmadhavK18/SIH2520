import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Brain,
  FileText,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  Award,
  Workflow,
  MessageSquare,
  BookOpen,
  Zap,
  CheckCircle,
  AlertTriangle,
  Calendar,
  BarChart3
} from 'lucide-react';

interface ProjectData {
  id: string;
  name: string;
  progress: number;
  budget: number;
  spent: number;
  timeline: number;
  status: 'planning' | 'in_progress' | 'completed' | 'delayed';
  team: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface WorkflowItem {
  id: string;
  title: string;
  stage: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
}

export const iPPMSDashboard: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    setProjects([
      {
        id: '1',
        name: 'Brahmaputra Flood Control',
        progress: 68,
        budget: 5000000000,
        spent: 3400000000,
        timeline: 75,
        status: 'in_progress',
        team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
        priority: 'critical'
      },
      {
        id: '2',
        name: 'River Navigation System',
        progress: 45,
        budget: 2500000000,
        spent: 1125000000,
        timeline: 60,
        status: 'in_progress',
        team: ['Sarah Wilson', 'Tom Brown'],
        priority: 'high'
      },
      {
        id: '3',
        name: 'Erosion Control Phase-II',
        progress: 25,
        budget: 1800000000,
        spent: 450000000,
        timeline: 30,
        status: 'planning',
        team: ['Alex Turner', 'Lisa Chen'],
        priority: 'medium'
      }
    ]);

    setWorkflows([
      {
        id: 'wf1',
        title: 'Budget Approval for Q3',
        stage: 'Finance Review',
        assignedTo: 'Finance Team',
        dueDate: '2024-01-15',
        priority: 'high',
        status: 'in_review'
      },
      {
        id: 'wf2',
        title: 'Environmental Clearance',
        stage: 'Legal Approval',
        assignedTo: 'Legal Department',
        dueDate: '2024-01-20',
        priority: 'critical',
        status: 'pending'
      }
    ]);
  }, []);

  const performanceData = [
    { name: 'Jan', efficiency: 85, projects: 12, budget: 95 },
    { name: 'Feb', efficiency: 88, projects: 14, budget: 92 },
    { name: 'Mar', efficiency: 92, projects: 16, budget: 98 },
    { name: 'Apr', efficiency: 87, projects: 13, budget: 90 },
    { name: 'May', efficiency: 95, projects: 18, budget: 102 },
    { name: 'Jun', efficiency: 90, projects: 15, budget: 94 }
  ];

  const expenseBreakdown = [
    { name: 'Personnel', value: 35, color: '#0088FE' },
    { name: 'Equipment', value: 25, color: '#00C49F' },
    { name: 'Materials', value: 20, color: '#FFBB28' },
    { name: 'Contractor', value: 15, color: '#FF8042' },
    { name: 'Miscellaneous', value: 5, color: '#8884d8' }
  ];

  const aiPredictions = {
    budgetForecast: {
      predicted: 4200000000,
      variance: 0.08,
      confidence: 87
    },
    timelineRisk: {
      level: 'medium',
      delayProbability: 23,
      suggestedActions: ['Increase resource allocation', 'Expedite approval process']
    },
    resourceOptimization: {
      savings: 15000000,
      efficiency: 12
    }
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6\">
      {/* Header */}\n      <div className=\"mb-8\">\n        <div className=\"flex items-center gap-3 mb-4\">\n          <div className=\"p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white\">\n            <Zap className=\"w-8 h-8\" />\n          </div>\n          <div>\n            <h1 className=\"text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent\">\n              iPPMS Dashboard\n            </h1>\n            <p className=\"text-gray-600 text-lg\">\n              Integrated Performance & Project Management System\n            </p>\n          </div>\n        </div>\n        \n        <div className=\"bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg\">\n          <p className=\"text-gray-700 leading-relaxed\">\n            <strong>iPPMS</strong> makes every function smarter, faster, and more connected — from digital workflows \n            and AI-powered predictions to seamless team collaboration and comprehensive performance tracking.\n          </p>\n        </div>\n      </div>\n\n      {/* Quick Stats */}\n      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8\">\n        <Card className=\"p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-xl\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-blue-100 text-sm font-medium\">Active Projects</p>\n              <p className=\"text-3xl font-bold\">{projects.length}</p>\n              <p className=\"text-blue-100 text-xs mt-1\">2 critical priority</p>\n            </div>\n            <BarChart3 className=\"w-12 h-12 text-blue-200\" />\n          </div>\n        </Card>\n        \n        <Card className=\"p-6 bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-green-100 text-sm font-medium\">Total Budget</p>\n              <p className=\"text-3xl font-bold\">₹{(projects.reduce((sum, p) => sum + p.budget, 0) / 10000000).toFixed(0)}Cr</p>\n              <p className=\"text-green-100 text-xs mt-1\">68% utilized</p>\n            </div>\n            <DollarSign className=\"w-12 h-12 text-green-200\" />\n          </div>\n        </Card>\n        \n        <Card className=\"p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-xl\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-purple-100 text-sm font-medium\">Team Efficiency</p>\n              <p className=\"text-3xl font-bold\">92%</p>\n              <p className=\"text-purple-100 text-xs mt-1\">+5% from last month</p>\n            </div>\n            <TrendingUp className=\"w-12 h-12 text-purple-200\" />\n          </div>\n        </Card>\n        \n        <Card className=\"p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-orange-100 text-sm font-medium\">Pending Workflows</p>\n              <p className=\"text-3xl font-bold\">{workflows.filter(w => w.status === 'pending').length}</p>\n              <p className=\"text-orange-100 text-xs mt-1\">2 high priority</p>\n            </div>\n            <Workflow className=\"w-12 h-12 text-orange-200\" />\n          </div>\n        </Card>\n      </div>\n\n      {/* Feature Tabs */}\n      <Tabs value={activeFeature} onValueChange={setActiveFeature} className=\"space-y-6\">\n        <div className=\"bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-white/20 shadow-lg\">\n          <TabsList className=\"grid w-full grid-cols-4 lg:grid-cols-8 bg-transparent\">\n            <TabsTrigger value=\"overview\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <BarChart3 className=\"w-4 h-4 mr-2\" />\n              Overview\n            </TabsTrigger>\n            <TabsTrigger value=\"ai-prediction\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <Brain className=\"w-4 h-4 mr-2\" />\n              AI Insights\n            </TabsTrigger>\n            <TabsTrigger value=\"workflows\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <Workflow className=\"w-4 h-4 mr-2\" />\n              Workflows\n            </TabsTrigger>\n            <TabsTrigger value=\"projects\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <FileText className=\"w-4 h-4 mr-2\" />\n              Projects\n            </TabsTrigger>\n            <TabsTrigger value=\"kpi\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <Target className=\"w-4 h-4 mr-2\" />\n              KPI\n            </TabsTrigger>\n            <TabsTrigger value=\"expenses\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <DollarSign className=\"w-4 h-4 mr-2\" />\n              Expenses\n            </TabsTrigger>\n            <TabsTrigger value=\"library\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <BookOpen className=\"w-4 h-4 mr-2\" />\n              Library\n            </TabsTrigger>\n            <TabsTrigger value=\"apar\" className=\"data-[state=active]:bg-white data-[state=active]:shadow-md\">\n              <Award className=\"w-4 h-4 mr-2\" />\n              APAR\n            </TabsTrigger>\n          </TabsList>\n        </div>\n\n        {/* Overview Tab */}\n        <TabsContent value=\"overview\" className=\"space-y-6\">\n          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">\n            {/* Performance Chart */}\n            <Card className=\"p-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl\">\n              <h3 className=\"text-xl font-bold text-gray-800 mb-4 flex items-center gap-2\">\n                <TrendingUp className=\"w-5 h-5 text-blue-600\" />\n                Performance Trends\n              </h3>\n              <ResponsiveContainer width=\"100%\" height={300}>\n                <LineChart data={performanceData}>\n                  <CartesianGrid strokeDasharray=\"3 3\" stroke=\"#e0e4e7\" />\n                  <XAxis dataKey=\"name\" stroke=\"#6b7280\" />\n                  <YAxis stroke=\"#6b7280\" />\n                  <Tooltip \n                    contentStyle={{ \n                      backgroundColor: 'rgba(255, 255, 255, 0.9)', \n                      border: 'none', \n                      borderRadius: '12px',\n                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'\n                    }} \n                  />\n                  <Line type=\"monotone\" dataKey=\"efficiency\" stroke=\"#3b82f6\" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} />\n                  <Line type=\"monotone\" dataKey=\"budget\" stroke=\"#10b981\" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />\n                </LineChart>\n              </ResponsiveContainer>\n            </Card>\n            \n            {/* Expense Breakdown */}\n            <Card className=\"p-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl\">\n              <h3 className=\"text-xl font-bold text-gray-800 mb-4 flex items-center gap-2\">\n                <DollarSign className=\"w-5 h-5 text-green-600\" />\n                Expense Breakdown\n              </h3>\n              <ResponsiveContainer width=\"100%\" height={300}>\n                <PieChart>\n                  <Pie\n                    data={expenseBreakdown}\n                    cx=\"50%\"\n                    cy=\"50%\"\n                    innerRadius={60}\n                    outerRadius={120}\n                    paddingAngle={5}\n                    dataKey=\"value\"\n                  >\n                    {expenseBreakdown.map((entry, index) => (\n                      <Cell key={`cell-${index}`} fill={entry.color} />\n                    ))}\n                  </Pie>\n                  <Tooltip \n                    formatter={(value) => [`${value}%`, 'Percentage']}\n                    contentStyle={{ \n                      backgroundColor: 'rgba(255, 255, 255, 0.9)', \n                      border: 'none', \n                      borderRadius: '12px',\n                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'\n                    }} \n                  />\n                </PieChart>\n              </ResponsiveContainer>\n            </Card>\n          </div>\n        </TabsContent>\n\n        {/* AI Prediction Tab */}\n        <TabsContent value=\"ai-prediction\" className=\"space-y-6\">\n          <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-6\">\n            <Card className=\"p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue/20 shadow-xl\">\n              <div className=\"flex items-center gap-3 mb-4\">\n                <Brain className=\"w-8 h-8 text-blue-600\" />\n                <div>\n                  <h3 className=\"text-lg font-bold text-gray-800\">Budget Forecast</h3>\n                  <p className=\"text-sm text-gray-600\">AI-powered prediction</p>\n                </div>\n              </div>\n              <div className=\"space-y-3\">\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Predicted Total:</span>\n                  <span className=\"font-bold text-lg\">₹{(aiPredictions.budgetForecast.predicted / 10000000).toFixed(1)}Cr</span>\n                </div>\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Variance:</span>\n                  <Badge className=\"bg-green-100 text-green-800\">±{(aiPredictions.budgetForecast.variance * 100).toFixed(1)}%</Badge>\n                </div>\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Confidence:</span>\n                  <span className=\"font-medium\">{aiPredictions.budgetForecast.confidence}%</span>\n                </div>\n                <Progress value={aiPredictions.budgetForecast.confidence} className=\"h-2\" />\n              </div>\n            </Card>\n            \n            <Card className=\"p-6 bg-gradient-to-br from-orange-50 to-red-100 border border-orange/20 shadow-xl\">\n              <div className=\"flex items-center gap-3 mb-4\">\n                <AlertTriangle className=\"w-8 h-8 text-orange-600\" />\n                <div>\n                  <h3 className=\"text-lg font-bold text-gray-800\">Timeline Risk</h3>\n                  <p className=\"text-sm text-gray-600\">Delay probability</p>\n                </div>\n              </div>\n              <div className=\"space-y-3\">\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Risk Level:</span>\n                  <Badge className=\"bg-orange-100 text-orange-800 capitalize\">{aiPredictions.timelineRisk.level}</Badge>\n                </div>\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Delay Probability:</span>\n                  <span className=\"font-bold text-lg\">{aiPredictions.timelineRisk.delayProbability}%</span>\n                </div>\n                <Progress value={aiPredictions.timelineRisk.delayProbability} className=\"h-2\" />\n                <div className=\"mt-4\">\n                  <p className=\"text-sm font-medium text-gray-700 mb-2\">Suggested Actions:</p>\n                  <ul className=\"text-sm text-gray-600 space-y-1\">\n                    {aiPredictions.timelineRisk.suggestedActions.map((action, index) => (\n                      <li key={index} className=\"flex items-center gap-2\">\n                        <CheckCircle className=\"w-3 h-3 text-green-500\" />\n                        {action}\n                      </li>\n                    ))}\n                  </ul>\n                </div>\n              </div>\n            </Card>\n            \n            <Card className=\"p-6 bg-gradient-to-br from-green-50 to-emerald-100 border border-green/20 shadow-xl\">\n              <div className=\"flex items-center gap-3 mb-4\">\n                <Target className=\"w-8 h-8 text-green-600\" />\n                <div>\n                  <h3 className=\"text-lg font-bold text-gray-800\">Optimization</h3>\n                  <p className=\"text-sm text-gray-600\">Resource efficiency</p>\n                </div>\n              </div>\n              <div className=\"space-y-3\">\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Potential Savings:</span>\n                  <span className=\"font-bold text-lg text-green-600\">₹{(aiPredictions.resourceOptimization.savings / 100000).toFixed(1)}L</span>\n                </div>\n                <div className=\"flex justify-between\">\n                  <span className=\"text-gray-600\">Efficiency Gain:</span>\n                  <Badge className=\"bg-green-100 text-green-800\">+{aiPredictions.resourceOptimization.efficiency}%</Badge>\n                </div>\n                <Button className=\"w-full mt-4 bg-green-600 hover:bg-green-700\">\n                  Apply Optimization\n                </Button>\n              </div>\n            </Card>\n          </div>\n        </TabsContent>\n\n        {/* Other tabs would be implemented similarly */}\n        <TabsContent value=\"workflows\" className=\"space-y-6\">\n          <Card className=\"p-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl\">\n            <h3 className=\"text-xl font-bold text-gray-800 mb-6 flex items-center gap-2\">\n              <Workflow className=\"w-6 h-6 text-purple-600\" />\n              Digital Workflows - Paperless Approvals\n            </h3>\n            <div className=\"space-y-4\">\n              {workflows.map((workflow) => (\n                <div key={workflow.id} className=\"p-4 border border-gray-200 rounded-xl bg-white/60 hover:bg-white/80 transition-all\">\n                  <div className=\"flex justify-between items-start\">\n                    <div className=\"flex-1\">\n                      <h4 className=\"font-semibold text-gray-800\">{workflow.title}</h4>\n                      <p className=\"text-sm text-gray-600 mt-1\">Stage: {workflow.stage}</p>\n                      <p className=\"text-sm text-gray-600\">Assigned to: {workflow.assignedTo}</p>\n                    </div>\n                    <div className=\"flex flex-col items-end gap-2\">\n                      <Badge className={`\n                        ${workflow.priority === 'critical' ? 'bg-red-100 text-red-800' :\n                          workflow.priority === 'high' ? 'bg-orange-100 text-orange-800' :\n                          'bg-yellow-100 text-yellow-800'}\n                      `}>\n                        {workflow.priority}\n                      </Badge>\n                      <Badge className={`\n                        ${workflow.status === 'approved' ? 'bg-green-100 text-green-800' :\n                          workflow.status === 'in_review' ? 'bg-blue-100 text-blue-800' :\n                          workflow.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :\n                          'bg-red-100 text-red-800'}\n                      `}>\n                        {workflow.status.replace('_', ' ')}\n                      </Badge>\n                    </div>\n                  </div>\n                  <div className=\"flex justify-between items-center mt-3 pt-3 border-t border-gray-200\">\n                    <span className=\"text-sm text-gray-500 flex items-center gap-1\">\n                      <Calendar className=\"w-4 h-4\" />\n                      Due: {new Date(workflow.dueDate).toLocaleDateString()}\n                    </span>\n                    <Button size=\"sm\" variant=\"outline\">\n                      View Details\n                    </Button>\n                  </div>\n                </div>\n              ))}\n            </div>\n          </Card>\n        </TabsContent>\n        \n        {/* Projects Tab */}\n        <TabsContent value=\"projects\" className=\"space-y-6\">\n          <div className=\"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6\">\n            {projects.map((project) => (\n              <Card key={project.id} className=\"p-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all\">\n                <div className=\"flex justify-between items-start mb-4\">\n                  <div>\n                    <h3 className=\"font-bold text-lg text-gray-800\">{project.name}</h3>\n                    <p className=\"text-sm text-gray-600\">Team: {project.team.length} members</p>\n                  </div>\n                  <Badge className={`\n                    ${project.priority === 'critical' ? 'bg-red-100 text-red-800' :\n                      project.priority === 'high' ? 'bg-orange-100 text-orange-800' :\n                      project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :\n                      'bg-green-100 text-green-800'}\n                  `}>\n                    {project.priority}\n                  </Badge>\n                </div>\n                \n                <div className=\"space-y-4\">\n                  <div>\n                    <div className=\"flex justify-between text-sm mb-1\">\n                      <span className=\"text-gray-600\">Progress</span>\n                      <span className=\"font-medium\">{project.progress}%</span>\n                    </div>\n                    <Progress value={project.progress} className=\"h-3\" />\n                  </div>\n                  \n                  <div>\n                    <div className=\"flex justify-between text-sm mb-1\">\n                      <span className=\"text-gray-600\">Budget Utilization</span>\n                      <span className=\"font-medium\">{((project.spent / project.budget) * 100).toFixed(1)}%</span>\n                    </div>\n                    <Progress value={(project.spent / project.budget) * 100} className=\"h-3\" />\n                  </div>\n                  \n                  <div className=\"flex justify-between text-sm text-gray-600\">\n                    <span>Budget: ₹{(project.budget / 10000000).toFixed(1)}Cr</span>\n                    <span>Spent: ₹{(project.spent / 10000000).toFixed(1)}Cr</span>\n                  </div>\n                  \n                  <Button className=\"w-full mt-4\" variant=\"outline\">\n                    View Project Details\n                  </Button>\n                </div>\n              </Card>\n            ))}\n          </div>\n        </TabsContent>\n      </Tabs>\n    </div>\n  );\n};\n\nexport default iPPMSDashboard;