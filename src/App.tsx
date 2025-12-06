import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import UtilitiesPage from "./pages/UtilitiesPage";
import { KPIDashboard } from "./components/KPIDashboard";
import { ExpenseManagement } from "./components/ExpenseManagement";
import { RTIPortal } from "./components/RTIPortal";
import { TicketManagement } from "./components/TicketManagement";
import { ProjectCollaboration } from "./components/ProjectCollaboration";
import { Dashboard } from "./components/Dashboard";
import iPPMSDashboard from "./pages/iPPMSDashboard";
import { useAuth } from "./context/AuthContext";
import { useAccessControl } from "./context/AccessControlContext";
import { AppProviders } from "./providers";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, requiredPermission }: { children: React.ReactNode, requiredPermission?: string }) => {
  const { user } = useAuth();
  const { hasPermission } = useAccessControl();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <div className="p-8 text-center">You don't have permission to access this page.</div>;
  }
  
  return <>{children}</>;
};

const App = () => (
  <div className="light">
    <AppProviders>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
          <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          
          {/* Performance Management Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/kpi-dashboard" element={
            <ProtectedRoute requiredPermission="view_kpi">
              <KPIDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/expense-management" element={
            <ProtectedRoute requiredPermission="manage_expenses">
              <ExpenseManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/project-collaboration" element={
            <ProtectedRoute requiredPermission="view_projects">
              <ProjectCollaboration />
            </ProtectedRoute>
          } />
          
          <Route path="/rti-portal" element={
            <ProtectedRoute>
              <RTIPortal />
            </ProtectedRoute>
          } />
          
          <Route path="/ticket-management" element={
            <ProtectedRoute>
              <TicketManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/ippms" element={
            <ProtectedRoute>
              <iPPMSDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/utilities" element={
            <UtilitiesPage />
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AppProviders>
  </div>
);

export default App;
