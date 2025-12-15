import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, FileText, Upload } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const tasks = [
    { id: 1, title: "Complete survey data entry for Project BB-2024-01", status: "pending", priority: "high" },
    { id: 2, title: "Review DPR draft for Upper Assam flood control", status: "in-progress", priority: "medium" },
    { id: 3, title: "Submit monthly progress report", status: "pending", priority: "high" },
    { id: 4, title: "Attend project review meeting", status: "completed", priority: "low" },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="text-success" size={20} />;
    if (status === "in-progress") return <Clock className="text-warning" size={20} />;
    return <AlertCircle className="text-destructive" size={20} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentUser={user} onLogout={logout} onLoginClick={() => { }} />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Employee"} ({user?.position || "Junior Engineer"})</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard name="Tasks Completed" current={18} target={25} unit="" />
            <KPICard name="Reports Submitted" current={12} target={15} unit="" />
            <KPICard name="Data Entry Accuracy" current={96} target={95} />
            <KPICard name="On-time Delivery" current={88} target={90} />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <p className="font-medium">{task.title}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${task.priority === "high" ? "bg-destructive/10 text-destructive" :
                            task.priority === "medium" ? "bg-warning/10 text-warning" :
                              "bg-success/10 text-success"
                            }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-muted-foreground capitalize">{task.status}</span>
                        </div>
                      </div>
                      {task.status !== "completed" && (
                        <Button size="sm" variant="outline">View</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="gov-primary" className="w-full justify-start" size="lg">
                  <FileText size={18} />
                  Create Request
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Upload size={18} />
                  Upload Report
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <CheckCircle2 size={18} />
                  Self Assessment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "New task assigned: Survey data collection for BB-2024-05",
                  "Meeting scheduled: Project review at 2:00 PM today",
                  "Document uploaded: DPR Phase-II approved",
                ].map((notification, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm p-2 hover:bg-muted/50 rounded">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                    <span>{notification}</span>
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

export default EmployeeDashboard;
