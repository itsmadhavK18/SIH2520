import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileCheck, AlertTriangle, MapPin } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  const projects = [
    { id: 1, name: "Upper Assam Flood Control - Phase II", progress: 68, status: "on-track" },
    { id: 2, name: "Brahmaputra River Embankment Strengthening", progress: 45, status: "delayed" },
    { id: 3, name: "Water Resource Survey - North Bank", progress: 92, status: "ahead" },
  ];

  const teamMembers = [
    { name: "Rajesh Kumar", role: "Junior Engineer", tasksCompleted: 18, tasksTotal: 25 },
    { name: "Priya Sharma", role: "Data Analyst", tasksCompleted: 22, tasksTotal: 25 },
    { name: "Amit Singh", role: "Surveyor", tasksCompleted: 15, tasksTotal: 20 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentUser={user} onLogout={logout} onLoginClick={() => { }} />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Supervisor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Supervisor"} ({user?.position || "Senior Engineer"})</p>
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
                  <div key={project.id} className="border rounded-lg p-4">
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
                      <Button size="sm">View Details</Button>
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
                    <div key={index} className="border rounded-lg p-3">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck size={20} />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Bill claim - Contractor A (BB-2024-01)", amount: "₹15,00,000" },
                    { title: "DPR Phase-II approval request", amount: null },
                    { title: "Material procurement for Project BB-05", amount: "₹8,50,000" },
                    { title: "Site inspection report verification", amount: null },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        {item.amount && <p className="text-xs text-muted-foreground">{item.amount}</p>}
                      </div>
                      <Button size="sm" variant="gov-primary">
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default SupervisorDashboard;
