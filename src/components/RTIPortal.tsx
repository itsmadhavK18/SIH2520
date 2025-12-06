import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { rtiService, PublicInformation, RTIRequest } from '../services/rtiService';
import { 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  DollarSign,
  Building,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

export const RTIPortal: React.FC = () => {
  const [publicInfo, setPublicInfo] = useState<PublicInformation[]>([]);
  const [rtiRequests, setRtiRequests] = useState<RTIRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requestType: 'information',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const info = await rtiService.getPublicInformation();
        setPublicInfo(info);
        
        const requests = await rtiService.getRTIRequests();
        setRtiRequests(requests);
      } catch (error) {
        console.error('Error loading RTI data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newRequest = await rtiService.createRTIRequest({
        title: formData.title,
        description: formData.description,
        createdBy: formData.email,
        status: 'open',
        priority: 'medium',
        category: 'rti',
        requestType: formData.requestType as 'information' | 'document' | 'inspection',
        targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        applicantDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        }
      });
      
      setRtiRequests(prev => [...prev, newRequest]);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        requestType: 'information',
        name: '',
        email: '',
        phone: '',
        address: ''
      });
      
      setDialogOpen(false);
      alert('Your RTI request has been submitted successfully! You will receive a confirmation email shortly.');
    } catch (error) {
      console.error('Error submitting RTI request:', error);
      alert('Failed to submit RTI request. Please try again.');
    }
  };

  const filteredInfo = publicInfo.filter(info => {
    const matchesCategory = activeCategory === 'all' || info.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Mock project data for transparency
  const projectTransparency = {
    totalBudget: 15000000000, // 150 Cr
    currentExpenditure: 8750000000, // 87.5 Cr
    activeProjects: 12,
    completedProjects: 8,
    rtiRequestsProcessed: 156,
    averageResponseTime: 18 // days
  };

  if (loading) {
    return <div className="p-4">Loading RTI Portal...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transparency & RTI Portal</h1>
          <p className="text-gray-600 mt-1">Access public information and submit Right to Information requests</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              File RTI Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Submit RTI Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title *</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange}
                    required
                    placeholder="Brief title of your RTI request"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requestType">Request Type *</Label>
                  <Select value={formData.requestType} onValueChange={(value) => setFormData(prev => ({...prev, requestType: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="information">Information Request</SelectItem>
                      <SelectItem value="document">Document Access</SelectItem>
                      <SelectItem value="inspection">Records Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Request Details *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Provide specific details about the information you are seeking"
                />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Applicant Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800">
                  <strong>Note:</strong> RTI requests are processed within 30 days as per RTI Act 2005. 
                  You will receive updates via email and SMS.
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Submit RTI Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transparency Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Budget</p>
              <p className="text-2xl font-bold">₹{(projectTransparency.totalBudget / 10000000).toFixed(0)}Cr</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-200" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Expenditure</p>
              <p className="text-2xl font-bold">₹{(projectTransparency.currentExpenditure / 10000000).toFixed(1)}Cr</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-200" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Projects</p>
              <p className="text-2xl font-bold">{projectTransparency.activeProjects}</p>
            </div>
            <Building className="w-10 h-10 text-purple-200" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">RTI Requests</p>
              <p className="text-2xl font-bold">{projectTransparency.rtiRequestsProcessed}</p>
            </div>
            <FileText className="w-10 h-10 text-orange-200" />
          </div>
        </Card>
      </div>

      {/* Budget Utilization */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Budget Utilization Transparency</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Budget Utilization</span>
            <span className="text-lg font-bold">
              {((projectTransparency.currentExpenditure / projectTransparency.totalBudget) * 100).toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={(projectTransparency.currentExpenditure / projectTransparency.totalBudget) * 100} 
            className="h-3"
          />
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>Total Budget: ₹{(projectTransparency.totalBudget / 10000000).toFixed(0)}Cr</div>
            <div>Spent: ₹{(projectTransparency.currentExpenditure / 10000000).toFixed(1)}Cr</div>
            <div>Remaining: ₹{((projectTransparency.totalBudget - projectTransparency.currentExpenditure) / 10000000).toFixed(1)}Cr</div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="public-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="public-info">Public Information</TabsTrigger>
          <TabsTrigger value="project-details">Project Transparency</TabsTrigger>
          <TabsTrigger value="rti-status">RTI Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="public-info" className="mt-6">
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search public information..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="organization">Organization</SelectItem>
                      <SelectItem value="budget">Budget & Finance</SelectItem>
                      <SelectItem value="projects">Projects</SelectItem>
                      <SelectItem value="tenders">Tenders</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Badge variant="outline">
                  {filteredInfo.length} {filteredInfo.length === 1 ? 'Item' : 'Items'}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Public Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfo.length > 0 ? (
              filteredInfo.map(info => (
                <PublicInfoCard key={info.id} info={info} />
              ))
            ) : (
              <Card className="col-span-full p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery || activeCategory !== 'all' ? 'No information found' : 'No public information available'}
                </h3>
                <p className="text-gray-500">
                  {searchQuery || activeCategory !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Information will be published here as it becomes available.'}
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="project-details" className="mt-6">
          <ProjectTransparencyGrid />
        </TabsContent>
        
        <TabsContent value="rti-status" className="mt-6">
          <RTIStatusGrid requests={rtiRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Public Information Card Component
interface PublicInfoCardProps {
  info: PublicInformation;
}

const PublicInfoCard: React.FC<PublicInfoCardProps> = ({ info }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budget': return 'bg-green-100 text-green-800';
      case 'projects': return 'bg-blue-100 text-blue-800';
      case 'tenders': return 'bg-orange-100 text-orange-800';
      case 'reports': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budget': return <DollarSign className="w-4 h-4" />;
      case 'projects': return <Building className="w-4 h-4" />;
      case 'tenders': return <FileText className="w-4 h-4" />;
      case 'reports': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${getCategoryColor(info.category)}`}>
          {getCategoryIcon(info.category)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{info.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{info.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <Badge className={`text-xs ${getCategoryColor(info.category)}`}>
          {info.category.toUpperCase()}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{new Date(info.publishedDate).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="w-3 h-3 mr-1" />
          View Details
        </Button>
        {info.documentUrl && (
          <Button variant="outline" size="sm">
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
        )}
      </div>
    </Card>
  );
};

// Project Transparency Grid Component
const ProjectTransparencyGrid: React.FC = () => {
  const projects = [
    { id: 1, name: 'Brahmaputra Flood Management', budget: 5000000000, spent: 3200000000, status: 'In Progress' },
    { id: 2, name: 'River Bank Protection Works', budget: 2500000000, spent: 1800000000, status: 'In Progress' },
    { id: 3, name: 'Navigation Channel Development', budget: 3200000000, spent: 800000000, status: 'Planning' },
    { id: 4, name: 'Erosion Control System', budget: 1800000000, spent: 1800000000, status: 'Completed' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map(project => (
        <Card key={project.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  className={`text-xs ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {project.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₹{(project.spent / 100000).toFixed(1)}L
              </div>
              <div className="text-sm text-gray-500">
                of ₹{(project.budget / 100000).toFixed(1)}L
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Budget Utilization</span>
              <span className="font-medium">{((project.spent / project.budget) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(project.spent / project.budget) * 100} className="h-2" />
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="w-3 h-3 mr-1" />
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-3 h-3 mr-1" />
              Report
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

// RTI Status Grid Component
interface RTIStatusGridProps {
  requests: RTIRequest[];
}

const RTIStatusGrid: React.FC<RTIStatusGridProps> = ({ requests }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {requests.length > 0 ? (
        requests.map(request => (
          <Card key={request.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{request.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{request.description}</p>
                
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Request ID: {request.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                  {request.targetCompletionDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Due: {new Date(request.targetCompletionDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(request.status)}
                    {request.status.replace('_', ' ').toUpperCase()}
                  </div>
                </Badge>
                
                <Badge variant="outline" className="text-xs">
                  {request.requestType.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            {request.status === 'in_progress' && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Your request is being processed. Expected completion within 15 days.</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Applicant: {request.applicantDetails?.name || 'N/A'}
              </div>
              <Button variant="outline" size="sm">
                Track Status
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No RTI Requests</h3>
          <p className="text-gray-500">No RTI requests have been submitted yet.</p>
        </Card>
      )}
    </div>
  );
};

export default RTIPortal;
