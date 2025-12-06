import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { KPIProvider } from './context/KPIContext';
import { AccessControlProvider } from './context/AccessControlContext';
import { ProjectProvider } from './context/ProjectContext';
import { TicketProvider } from './context/TicketContext';

// Create a client for React Query
const queryClient = new QueryClient();

// Combined providers for the application
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AccessControlProvider>
          <KPIProvider>
            <ProjectProvider>
              <TicketProvider>
                {children}
              </TicketProvider>
            </ProjectProvider>
          </KPIProvider>
        </AccessControlProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};