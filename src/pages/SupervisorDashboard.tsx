import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileCheck, AlertTriangle, MapPin } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportList } from "@/components/ReportList";
import { RequestManagementList } from "@/components/RequestManagementList";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { TeamMemberDetailModal } from "@/components/TeamMemberDetailModal";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    setMemberModalOpen(true);
  };

  const projects = [
    {
      id: 1,
      name: "Upper Assam Flood Control - Phase II",
      progress: 68,
      status: "on-track",
      location: "Dibrugarh District",
      expectedCompletion: "March 2026",
      duration: { total: "24", elapsed: "16", percent: 68 },
      resources: [
        { name: "Excavators", used: 12, total: 15, unit: "units" },
        { name: "Concrete Mixers", used: 8, total: 8, unit: "units" },
        { name: "Labor Force", used: 240, total: 250, unit: "workers" }
      ],
      reports: [
        { title: "Monthly Progress Report - Nov 2024", date: "Dec 5, 2024" },
        { title: "Site Inspection Report", date: "Nov 28, 2024" },
        { title: "Quality Assessment Phase-II", date: "Nov 15, 2024" }
      ],
      requests: [
        { title: "Additional Excavator Request", status: "Pending" },
        { title: "Budget Reallocation for Materials", status: "Approved" }
      ]
    },
    {
      id: 2,
      name: "Brahmaputra River Embankment Strengthening",
      progress: 45,
      status: "delayed",
      location: "Jorhat Sector",
      expectedCompletion: "August 2026",
      duration: { total: "36", elapsed: "20", percent: 55 },
      resources: [
        { name: "Sandbags", used: 45000, total: 50000, unit: "bags" },
        { name: "Geo-textiles", used: 12000, total: 20000, unit: "sq.m" },
        { name: "Labor Force", used: 180, total: 200, unit: "workers" }
      ],
      reports: [
        { title: "Delay Analysis Report", date: "Dec 10, 2024" },
        { title: "Weather Impact Assessment", date: "Nov 20, 2024" }
      ],
      requests: [
        { title: "Extension Request - 3 Months", status: "Pending" },
        { title: "Emergency Sandbag Procurement", status: "Approved" },
        { title: "Additional Labor Deployment", status: "Pending" }
      ]
    },
    {
      id: 3,
      name: "Water Resource Survey - North Bank",
      progress: 92,
      status: "ahead",
      location: "Lakhimpur",
      expectedCompletion: "January 2026",
      duration: { total: "12", elapsed: "10", percent: 83 },
      resources: [
        { name: "Survey Crews", used: 5, total: 5, unit: "teams" },
        { name: "GPS Units", used: 10, total: 10, unit: "units" },
        { name: "Drones", used: 2, total: 3, unit: "units" }
      ],
      reports: [
        { title: "Survey Data Compilation - Final", date: "Dec 12, 2024" },
        { title: "Topographical Analysis Report", date: "Dec 1, 2024" },
        { title: "Drone Imagery Analysis", date: "Nov 25, 2024" }
      ],
      requests: [
        { title: "Early Completion Bonus Request", status: "Approved" }
      ]
    },
  ];

  /* ... teamMembers ... */
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Junior Engineer",
      department: "Civil Engineering",
      tasksCompleted: 18,
      tasksTotal: 25,
      totalProjects: 12,
      activeProjects: 3,
      completedProjects: 9,
      positiveReviews: 24,
      complaints: 2,
      resolvedComplaints: 2,
      onTimeDelivery: 92,
      qualityScore: 88,
      achievements: ["Best Performer Q3 2024", "Safety Champion"],
      feedback: [
        { type: 'positive', comment: 'Excellent work on the embankment project. Very thorough and detail-oriented.', from: 'Suresh Patel (Supervisor)', date: 'Dec 10, 2024' },
        { type: 'positive', comment: 'Great team player, always willing to help colleagues.', from: 'Priya Sharma (Colleague)', date: 'Nov 28, 2024' },
        { type: 'complaint', comment: 'Delayed submission of survey report by 2 days.', from: 'Admin Department', date: 'Nov 15, 2024' }
      ]
    },
    {
      name: "Priya Sharma",
      role: "Data Analyst",
      department: "Planning & Analytics",
      tasksCompleted: 22,
      tasksTotal: 25,
      totalProjects: 15,
      activeProjects: 4,
      completedProjects: 11,
      positiveReviews: 31,
      complaints: 0,
      resolvedComplaints: 0,
      onTimeDelivery: 96,
      qualityScore: 94,
      achievements: ["Data Excellence Award 2024", "Innovation Champion"],
      feedback: [
        { type: 'positive', comment: 'Outstanding analytical skills. Her reports are always comprehensive and insightful.', from: 'Chief Engineer', date: 'Dec 8, 2024' },
        { type: 'positive', comment: 'Priya\'s data visualization made our presentation to stakeholders very effective.', from: 'Project Manager', date: 'Nov 22, 2024' }
      ]
    },
    {
      name: "Amit Singh",
      role: "Surveyor",
      department: "Field Operations",
      tasksCompleted: 15,
      tasksTotal: 20,
      totalProjects: 8,
      activeProjects: 2,
      completedProjects: 6,
      positiveReviews: 18,
      complaints: 1,
      resolvedComplaints: 1,
      onTimeDelivery: 85,
      qualityScore: 90,
      achievements: ["Field Expert 2024"],
      feedback: [
        { type: 'positive', comment: 'Amit\'s GPS mapping was incredibly accurate. Saved us a lot of rework.', from: 'Site Engineer', date: 'Dec 5, 2024' },
        { type: 'complaint', comment: 'Equipment not properly maintained, caused minor delay.', from: 'Equipment Manager', date: 'Oct 20, 2024' },
        { type: 'positive', comment: 'Very professional and knowledgeable in the field.', from: 'Client Representative', date: 'Nov 10, 2024' }
      ]
    },
  ];

  /* return ... */
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentUser={user} onLogout={logout} onLoginClick={() => { }} />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Supervisor Dashboard</h1>
            <p className="text-muted-foreground">Project oversight and team management</p>
          </div>

          <div className="mt-6">
            <ReportList isAdmin />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard name="Active Projects" current={8} target={10} unit="" />
            <KPICard name="Team Performance" current={87} target={85} />
            <KPICard name="Budget Utilization" current={72} target={80} />
            <KPICard name="Quality Score" current={94} target={90} />
          </div>

          {/* Projects Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${project.status === "on-track" ? "bg-success/10 text-success" :
                          project.status === "ahead" ? "bg-primary/10 text-primary" :
                            "bg-warning/10 text-warning"
                          }`}>
                          {project.status === "on-track" ? "On Track" :
                            project.status === "ahead" ? "Ahead of Schedule" :
                              "Needs Attention"}
                        </span>
                      </div>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); handleProjectClick(project); }}>View Details</Button>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${project.status === "on-track" ? "bg-success" :
                          project.status === "ahead" ? "bg-primary" :
                            "bg-warning"
                          }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleMemberClick(member)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <span className="text-sm font-medium">
                          {member.tasksCompleted}/{member.tasksTotal}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill bg-primary"
                          style={{ width: `${(member.tasksCompleted / member.tasksTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <div className="space-y-6">
              <RequestManagementList isAdmin />
            </div>
          </div>

          {/* Alerts */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-warning" size={20} />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Weather alert: Heavy rainfall expected in project area BB-2024-02",
                  "Budget milestone approaching: Project BB-2024-01 at 85% budget utilization",
                  "Quality check required: Site inspection pending for 3 days",
                ].map((alert, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-warning/5 rounded">
                    <AlertTriangle className="text-warning flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{alert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <ProjectDetailModal project={selectedProject} open={projectModalOpen} onOpenChange={setProjectModalOpen} />
      <TeamMemberDetailModal member={selectedMember} open={memberModalOpen} onOpenChange={setMemberModalOpen} />
    </div>
  );
};

export default SupervisorDashboard;
