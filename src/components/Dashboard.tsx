import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { useKPI } from '../context/KPIContext';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import { useTicket } from '../context/TicketContext';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { kpis, userScores, calculateOverallScore, fetchKPIs, fetchUserScores } = useKPI();
  const { projects, fetchProjects } = useProject();
  const { tickets, fetchTickets } = useTicket();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchKPIs(),
          fetchUserScores(),
          fetchProjects(),
          fetchTickets()
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [fetchKPIs, fetchUserScores, fetchProjects, fetchTickets]);
  
  if (loading) {
    return <div className="p-4">Loading dashboard data...</div>;
  }
  
  const overallScore = calculateOverallScore();
  const pendingTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const activeProjects = projects.length;
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Performance Dashboard</h2>
        <div className="text-sm">
          Welcome, {user?.name} ({user?.role})
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50">
          <h3 className="font-semibold text-lg mb-2">Overall Performance</h3>
          <div className="text-3xl font-bold">{overallScore}%</div>
          <div className="mt-2 text-sm text-gray-600">Based on {kpis.length} KPIs</div>
          <div className="mt-4">
            <Link to="/kpi-dashboard" className="text-blue-600 hover:underline">
              View KPI Details →
            </Link>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50">
          <h3 className="font-semibold text-lg mb-2">Active Projects</h3>
          <div className="text-3xl font-bold">{activeProjects}</div>
          <div className="mt-2 text-sm text-gray-600">Projects in progress</div>
          <div className="mt-4">
            <Link to="/expense-management" className="text-green-600 hover:underline">
              Manage Projects →
            </Link>
          </div>
        </Card>
        
        <Card className="p-4 bg-yellow-50">
          <h3 className="font-semibold text-lg mb-2">Pending Tickets</h3>
          <div className="text-3xl font-bold">{pendingTickets}</div>
          <div className="mt-2 text-sm text-gray-600">Tickets awaiting response</div>
          <div className="mt-4">
            <Link to="/ticket-management" className="text-yellow-600 hover:underline">
              View Tickets →
            </Link>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">KPI Performance</h3>
          {kpis.length > 0 ? (
            <div className="space-y-4">
              {kpis.slice(0, 3).map(kpi => {
                const score = userScores.find(s => s.kpiId === kpi.id)?.score || 0;
                const percentage = (score / kpi.target) * 100;
                
                return (
                  <div key={kpi.id} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{kpi.name}</span>
                      <span>{score}/{kpi.target} ({Math.round(percentage)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          percentage >= 80 ? 'bg-green-500' :
                          percentage >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No KPIs defined yet
            </div>
          )}
          {kpis.length > 3 && (
            <div className="mt-4 text-right">
              <Link to="/kpi-dashboard" className="text-blue-600 hover:underline">
                View all KPIs →
              </Link>
            </div>
          )}
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Recent Projects</h3>
          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 3).map(project => (
                <div key={project.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{project.description}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      Budget: ₹{project.budget.toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No projects available
            </div>
          )}
          {projects.length > 3 && (
            <div className="mt-4 text-right">
              <Link to="/project-collaboration" className="text-blue-600 hover:underline">
                View all projects →
              </Link>
            </div>
          )}
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/rti-portal" className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100">
              <div className="font-medium">RTI Portal</div>
              <div className="text-sm text-gray-600">Access public information</div>
            </Link>
            
            <Link to="/ticket-management" className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100">
              <div className="font-medium">Ticket System</div>
              <div className="text-sm text-gray-600">Submit and track queries</div>
            </Link>
            
            <Link to="/project-collaboration" className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100">
              <div className="font-medium">Collaboration</div>
              <div className="text-sm text-gray-600">Project discussions</div>
            </Link>
            
            <Link to="/expense-management" className="p-3 bg-green-50 rounded-lg hover:bg-green-100">
              <div className="font-medium">Expenses</div>
              <div className="text-sm text-gray-600">Manage project expenses</div>
            </Link>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-4">Recent Tickets</h3>
          {tickets.length > 0 ? (
            <div className="space-y-3">
              {tickets.slice(0, 3).map(ticket => (
                <div key={ticket.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{ticket.title}</div>
                  <div className="text-sm text-gray-600 mt-1 truncate">{ticket.description}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No tickets available
            </div>
          )}
          {tickets.length > 3 && (
            <div className="mt-4 text-right">
              <Link to="/ticket-management" className="text-blue-600 hover:underline">
                View all tickets →
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;