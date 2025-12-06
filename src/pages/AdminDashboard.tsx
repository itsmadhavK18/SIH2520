import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Settings, Database, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminDashboard = () => {
  const projectData = [
    { month: "Jan", completed: 4, ongoing: 12 },
    { month: "Feb", completed: 6, ongoing: 11 },
    { month: "Mar", completed: 5, ongoing: 13 },
    { month: "Apr", completed: 8, ongoing: 10 },
    { month: "May", completed: 7, ongoing: 12 },
    { month: "Jun", completed: 9, ongoing: 11 },
  ];

  const kpiTrend = [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 82 },
    { month: "Mar", score: 79 },
    { month: "Apr", score: 85 },
    { month: "May", score: 88 },
    { month: "Jun", score: 91 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={() => {}} />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System-wide overview and management</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <KPICard name="Total Users" current={245} target={300} unit="" />
            <KPICard name="Active Projects" current={18} target={20} unit="" />
            <KPICard name="System Uptime" current={99.8} target={99.5} />
            <KPICard name="Avg. KPI Score" current={87} target={85} />
            <KPICard name="Budget Used" current={68} target={75} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed" />
                    <Bar dataKey="ongoing" fill="hsl(var(--primary))" name="Ongoing" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization KPI Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={kpiTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="KPI Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Admin Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-semibold mb-1">User Management</h3>
                <p className="text-sm text-muted-foreground mb-3">Manage users & roles</p>
                <Button size="sm" variant="outline" className="w-full">
                  Manage
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Shield className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-semibold mb-1">Role & Permissions</h3>
                <p className="text-sm text-muted-foreground mb-3">Configure access control</p>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Activity className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-semibold mb-1">KPI Templates</h3>
                <p className="text-sm text-muted-foreground mb-3">Manage KPI definitions</p>
                <Button size="sm" variant="outline" className="w-full">
                  Edit
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Database className="mx-auto mb-3 text-primary" size={32} />
                <h3 className="font-semibold mb-1">System Logs</h3>
                <p className="text-sm text-muted-foreground mb-3">View audit trails</p>
                <Button size="sm" variant="outline" className="w-full">
                  View Logs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                Recent System Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { user: "Rajesh Kumar", action: "submitted survey data", project: "BB-2024-01", time: "5 minutes ago" },
                  { user: "Dr. Suresh Patel", action: "approved bill claim", project: "BB-2024-02", time: "15 minutes ago" },
                  { user: "Priya Sharma", action: "uploaded DPR report", project: "BB-2024-03", time: "1 hour ago" },
                  { user: "System Admin", action: "created new user role", project: "Site Inspector", time: "2 hours ago" },
                  { user: "Amit Singh", action: "completed survey milestone", project: "BB-2024-05", time: "3 hours ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.project}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
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

export default AdminDashboard;
