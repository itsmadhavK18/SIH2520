import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { useTicket } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import { useAccessControl } from '../context/AccessControlContext';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Search, 
  Filter, 
  TrendingUp,
  Users,
  FileText,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

export const TicketManagement: React.FC = () => {
  const { tickets, loading, error, fetchTickets, addTicket, updateTicketStatus } = useTicket();
  const { user } = useAuth();
  const { hasPermission } = useAccessControl();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('technical');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      await addTicket({
        title,
        description,
        category,
        priority,
        createdBy: user.id,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('technical');
      setPriority('medium');
      setDialogOpen(false);
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };
  
  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      await updateTicketStatus(ticketId, newStatus);
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };
  
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filter === 'all' || ticket.status === filter;
    const matchesSearch = searchQuery === '' || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const ticketStats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length,
    overdue: tickets.filter(t => {
      const daysSinceCreated = Math.floor((new Date().getTime() - new Date(t.createdAt).getTime()) / (1000 * 3600 * 24));
      return t.status !== 'resolved' && t.status !== 'closed' && daysSinceCreated > 7;
    }).length
  };
  
  const canManageTickets = hasPermission('manage_tickets');
  
  if (loading) {
    return <div className="p-4">Loading tickets...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Query & Issue Management</h1>
          <p className="text-gray-600 mt-1">Track and resolve citizen queries, complaints, and internal issues</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Raise Query
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">Submit New Query/Issue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Brief summary of your query or issue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Provide detailed information about your query or issue"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="administrative">Administrative</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="project">Project Related</SelectItem>
                      <SelectItem value="rti">RTI Request</SelectItem>
                      <SelectItem value="grievance">Public Grievance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Submit Query
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs">Total</p>
              <p className="text-2xl font-bold">{ticketStats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs">Open</p>
              <p className="text-2xl font-bold">{ticketStats.open}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-200" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs">In Progress</p>
              <p className="text-2xl font-bold">{ticketStats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs">Resolved</p>
              <p className="text-2xl font-bold">{ticketStats.resolved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-xs">Urgent</p>
              <p className="text-2xl font-bold">{ticketStats.urgent}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-200" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-xs">Overdue</p>
              <p className="text-2xl font-bold">{ticketStats.overdue}</p>
            </div>
            <Calendar className="w-8 h-8 text-gray-200" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tickets by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Badge variant="outline">
              {filteredTickets.length} {filteredTickets.length === 1 ? 'Result' : 'Results'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => {
            const daysSinceCreated = Math.floor((new Date().getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 3600 * 24));
            const isOverdue = ticket.status !== 'resolved' && ticket.status !== 'closed' && daysSinceCreated > 7;
            
            return (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isOverdue={isOverdue}
                daysSinceCreated={daysSinceCreated}
                canManage={canManageTickets}
                onStatusChange={handleStatusChange}
              />
            );
          })
        ) : (
          <Card className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || filter !== 'all' ? 'No tickets found' : 'No tickets yet'}
            </h3>
            <p className="text-gray-500">
              {searchQuery || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Submit your first query or issue to get started.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

// Enhanced Ticket Card Component
interface TicketCardProps {
  ticket: any;
  isOverdue: boolean;
  daysSinceCreated: number;
  canManage: boolean;
  onStatusChange: (ticketId: string, newStatus: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  isOverdue,
  daysSinceCreated,
  canManage,
  onStatusChange
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <AlertCircle className="w-4 h-4" />;
      case 'rti': return <FileText className="w-4 h-4" />;
      case 'grievance': return <Users className="w-4 h-4" />;
      case 'project': return <TrendingUp className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
      isOverdue ? 'border-l-red-500' : 
      ticket.priority === 'urgent' ? 'border-l-red-400' :
      ticket.priority === 'high' ? 'border-l-orange-400' :
      'border-l-blue-400'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
              {getCategoryIcon(ticket.category)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {ticket.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {ticket.description}
              </p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.toUpperCase()}
            </Badge>
            <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {ticket.category.replace('_', ' ').toUpperCase()}
            </Badge>
            {isOverdue && (
              <Badge className="text-xs bg-red-100 text-red-800 border-red-300">
                <Clock className="w-3 h-3 mr-1" />
                OVERDUE
              </Badge>
            )}
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Created {daysSinceCreated} day{daysSinceCreated !== 1 ? 's' : ''} ago</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>ID: {ticket.id.slice(-8).toUpperCase()}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-4">
          {canManage && (
            <Select 
              value={ticket.status} 
              onValueChange={(value) => onStatusChange(ticket.id, value)}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <Button variant="outline" size="sm" className="text-xs h-8">
            View Details
          </Button>
        </div>
      </div>
      
      {/* Progress Indicator */}
      {ticket.status === 'in_progress' && (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800 text-sm">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Work in progress - Estimated resolution in 2-3 business days</span>
          </div>
        </div>
      )}
      
      {/* Contact Information for Public Queries */}
      {(ticket.category === 'rti' || ticket.category === 'grievance') && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between text-sm">
            <div className="text-green-800">
              <strong>Public Query:</strong> RTI compliance maintained
            </div>
            <div className="flex gap-3 text-green-600">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>support@brahmaputraboard.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TicketManagement;
