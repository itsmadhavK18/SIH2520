import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { Expense, Project } from '../services/api';
import { useAccessControl } from '../context/AccessControlContext';
import { AlertTriangle, CheckCircle, Clock, DollarSign, FileText, TrendingUp, Users, Eye } from 'lucide-react';

export const ExpenseManagement: React.FC = () => {
  const { projects, expenses, fetchProjects, fetchExpensesByProject, addExpense } = useProject();
  const { hasPermission } = useAccessControl();
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');
  
  // Form state
  const [expenseData, setExpenseData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
      setLoading(false);
    };
    
    loadProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (selectedProject) {
      fetchExpensesByProject(selectedProject);
    }
  }, [selectedProject, fetchExpensesByProject]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProject) return;
    
    const newExpense: Omit<Expense, 'id'> = {
      projectId: selectedProject,
      amount: parseFloat(expenseData.amount),
      category: expenseData.category,
      date: expenseData.date,
      description: expenseData.description,
      status: 'pending'
    };
    
    await addExpense(newExpense);
    setDialogOpen(false);
    setExpenseData({
      amount: '',
      category: '',
      date: '',
      description: ''
    });
  };

  if (loading) {
    return <div className="p-4">Loading project data...</div>;
  }

  const getProjectStats = (project: Project) => {
    const projectExpenses = expenses.filter(e => e.projectId === project.id);
    const totalSpent = projectExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const budgetUtilization = (totalSpent / project.budget) * 100;
    const pendingExpenses = projectExpenses.filter(e => e.status === 'pending').length;
    const approvedExpenses = projectExpenses.filter(e => e.status === 'approved').length;
    
    return { totalSpent, budgetUtilization, pendingExpenses, approvedExpenses };
  };

  const filteredProjects = filter === 'all' ? projects : 
    projects.filter(p => {
      const stats = getProjectStats(p);
      if (filter === 'overbudget') return stats.budgetUtilization > 100;
      if (filter === 'underbudget') return stats.budgetUtilization < 80;
      if (filter === 'pending') return stats.pendingExpenses > 0;
      return true;
    });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Expense Management</h1>
          <p className="text-gray-600 mt-1">Track, monitor and approve project expenditures with transparency</p>
        </div>
        
        {hasPermission('manage_expenses') && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <DollarSign className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl">Record New Expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹) *</Label>
                    <Input 
                      id="amount" 
                      name="amount" 
                      type="number" 
                      step="0.01"
                      value={expenseData.amount} 
                      onChange={handleInputChange}
                      required
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      value={expenseData.date} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={expenseData.category} onValueChange={(value) => setExpenseData(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expense category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Equipment">Equipment & Machinery</SelectItem>
                      <SelectItem value="Material">Construction Material</SelectItem>
                      <SelectItem value="Labor">Labor & Manpower</SelectItem>
                      <SelectItem value="Travel">Travel & Transportation</SelectItem>
                      <SelectItem value="Consultancy">Consultancy & Professional Services</SelectItem>
                      <SelectItem value="Utilities">Utilities & Maintenance</SelectItem>
                      <SelectItem value="Other">Other Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Input 
                    id="description" 
                    name="description" 
                    value={expenseData.description} 
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of the expense"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Record Expense
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Projects</p>
              <p className="text-3xl font-bold">{projects.length}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-200" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Budget</p>
              <p className="text-3xl font-bold">₹{(projects.reduce((sum, p) => sum + p.budget, 0) / 10000000).toFixed(1)}Cr</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-200" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Expenses</p>
              <p className="text-3xl font-bold">₹{(expenses.reduce((sum, e) => sum + e.amount, 0) / 10000000).toFixed(1)}Cr</p>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-200" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Pending Approvals</p>
              <p className="text-3xl font-bold">{expenses.filter(e => e.status === 'pending').length}</p>
            </div>
            <Clock className="w-10 h-10 text-purple-200" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1">
            <Label htmlFor="projectFilter" className="text-sm font-medium">Filter Projects</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="overbudget">Over Budget</SelectItem>
                <SelectItem value="underbudget">Under Budget</SelectItem>
                <SelectItem value="pending">Pending Approvals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Badge variant={filter === 'all' ? 'default' : 'outline'}>{filteredProjects.length} Projects</Badge>
            <Badge variant="outline" className="text-green-600 border-green-300">
              {hasPermission('view_all_expenses') ? 'Full Access' : 'Limited Access'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map(project => {
          const stats = getProjectStats(project);
          return (
            <ProjectExpenseCard
              key={project.id}
              project={project}
              stats={stats}
              expenses={expenses.filter(e => e.projectId === project.id)}
              userRole={user?.role}
              hasFullAccess={hasPermission('view_all_expenses')}
              onSelectProject={() => setSelectedProject(project.id)}
            />
          );
        })}
      </div>
      
      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
          <p className="text-gray-500">No projects match the current filter criteria.</p>
        </Card>
      )}
    </div>
  );
};

// Enhanced Project Expense Card Component
interface ProjectExpenseCardProps {
  project: Project;
  stats: {
    totalSpent: number;
    budgetUtilization: number;
    pendingExpenses: number;
    approvedExpenses: number;
  };
  expenses: Expense[];
  userRole?: string;
  hasFullAccess: boolean;
  onSelectProject: () => void;
}

const ProjectExpenseCard: React.FC<ProjectExpenseCardProps> = ({
  project,
  stats,
  expenses,
  userRole,
  hasFullAccess,
  onSelectProject
}) => {
  const getBudgetStatusColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-600 bg-red-50';
    if (utilization > 85) return 'text-orange-600 bg-orange-50';
    if (utilization > 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getBudgetStatusText = (utilization: number) => {
    if (utilization > 100) return 'Over Budget';
    if (utilization > 85) return 'Near Limit';
    if (utilization > 70) return 'On Track';
    return 'Under Budget';
  };

  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4" style={{
      borderLeftColor: stats.budgetUtilization > 100 ? '#dc2626' : 
                      stats.budgetUtilization > 85 ? '#ea580c' : '#059669'
    }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {project.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge className={`text-xs ${getBudgetStatusColor(stats.budgetUtilization)}`}>
              {getBudgetStatusText(stats.budgetUtilization)}
            </Badge>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            ₹{(stats.totalSpent / 100000).toFixed(1)}L
          </div>
          <div className="text-sm text-gray-500">
            of ₹{(project.budget / 100000).toFixed(1)}L
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Budget Utilization</span>
          <span className={`font-semibold ${stats.budgetUtilization > 100 ? 'text-red-600' : 'text-gray-700'}`}>
            {stats.budgetUtilization.toFixed(1)}%
          </span>
        </div>
        <Progress 
          value={Math.min(stats.budgetUtilization, 100)} 
          className="h-3"
        />
        {stats.budgetUtilization > 100 && (
          <div className="flex items-center gap-1 mt-2 text-red-600 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Budget exceeded by ₹{((stats.totalSpent - project.budget) / 100000).toFixed(1)}L</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{expenses.length}</div>
          <div className="text-xs text-gray-600">Total Expenses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{stats.pendingExpenses}</div>
          <div className="text-xs text-gray-600">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{stats.approvedExpenses}</div>
          <div className="text-xs text-gray-600">Approved</div>
        </div>
      </div>

      {/* Category Breakdown */}
      {topCategories.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Top Expense Categories</h4>
          <div className="space-y-2">
            {topCategories.map(([category, amount]) => (
              <div key={category} className="flex justify-between text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-medium">₹{(amount / 100000).toFixed(1)}L</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transparency & Access Info */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          {hasFullAccess && (
            <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
              <Eye className="w-3 h-3 mr-1" />
              Full Access
            </Badge>
          )}
          <Badge variant="outline" className="text-xs text-green-600 border-green-300">
            RTI Compliant
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSelectProject}
          className="text-blue-600 hover:bg-blue-50"
        >
          View Details
        </Button>
      </div>

      {/* Role-based Action Buttons */}
      {(userRole === 'supervisor' || userRole === 'admin') && stats.pendingExpenses > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-yellow-800">
              <Clock className="w-4 h-4 inline mr-1" />
              {stats.pendingExpenses} expense(s) awaiting approval
            </div>
            <Button size="sm" variant="outline" className="text-yellow-700 border-yellow-300 hover:bg-yellow-100">
              Review
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

interface ExpenseTableProps {
  expenses: Expense[];
  project: Project | undefined;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, project }) => {
  if (!project) {
    return <div>Project not found</div>;
  }
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{project.name} - Expenses</h3>
      
      {expenses.length === 0 ? (
        <div className="text-center py-4">No expenses recorded for this project</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    expense.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : expense.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      <div className="mt-4 flex justify-between">
        <div>
          <span className="font-semibold">Project Budget: </span>
          ₹{project.budget.toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Total Expenses: </span>
          ₹{expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ExpenseManagement;