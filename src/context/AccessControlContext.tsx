import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

// Define permissions for different actions in the system
export type Permission = 
  | 'view_kpis'
  | 'edit_kpis'
  | 'view_scores'
  | 'add_scores'
  | 'view_projects'
  | 'manage_projects'
  | 'view_expenses'
  | 'manage_expenses'
  | 'view_tickets'
  | 'manage_tickets'
  | 'view_rti'
  | 'manage_rti'
  | 'view_users'
  | 'manage_users';

// Role-based permission mapping
const rolePermissions: Record<string, Permission[]> = {
  admin: [
    'view_kpis', 'edit_kpis', 
    'view_scores', 'add_scores', 
    'view_projects', 'manage_projects', 
    'view_expenses', 'manage_expenses', 
    'view_tickets', 'manage_tickets', 
    'view_rti', 'manage_rti', 
    'view_users', 'manage_users'
  ],
  supervisor: [
    'view_kpis', 
    'view_scores', 'add_scores', 
    'view_projects', 'manage_projects', 
    'view_expenses', 'manage_expenses', 
    'view_tickets', 'manage_tickets', 
    'view_rti'
  ],
  employee: [
    'view_kpis', 
    'view_scores', 
    'view_projects', 
    'view_expenses', 
    'view_tickets'
  ]
};

interface AccessControlContextType {
  hasPermission: (permission: Permission) => boolean;
  userRole: string | null;
}

const AccessControlContext = createContext<AccessControlContextType | undefined>(undefined);

export const AccessControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  };
  
  return (
    <AccessControlContext.Provider
      value={{
        hasPermission,
        userRole: user?.role || null,
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControl = (): AccessControlContextType => {
  const context = useContext(AccessControlContext);
  if (context === undefined) {
    throw new Error('useAccessControl must be used within an AccessControlProvider');
  }
  return context;
};

// Higher-order component to protect routes based on permissions
export const withPermission = (
  Component: React.ComponentType<any>,
  requiredPermission: Permission
) => {
  return (props: any) => {
    const { hasPermission } = useAccessControl();
    
    if (!hasPermission(requiredPermission)) {
      return <div>You don't have permission to access this page.</div>;
    }
    
    return <Component {...props} />;
  };
};