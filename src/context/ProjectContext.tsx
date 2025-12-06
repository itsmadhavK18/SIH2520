import React, { createContext, useContext, useState } from 'react';
import { Project, Expense, api } from '../services/api';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  fetchExpensesByProject: (projectId: string) => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const project = await api.getProjectById(id);
      setCurrentProject(project);
    } catch (err) {
      setError('Failed to fetch project details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpensesByProject = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getExpensesByProject(projectId);
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch project expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newExpense = await api.addExpense(expenseData as Expense);
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        expenses,
        loading,
        error,
        fetchProjects,
        fetchProjectById,
        fetchExpensesByProject,
        addExpense,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};