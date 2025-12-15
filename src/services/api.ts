// Real API service for the Digital Performance and Productivity Management System

const API_URL = 'http://localhost:5001/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'employee';
  department: string;
  position: string;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  category: 'headquarters' | 'field';
  weight: number;
  targetValue: number;
  unit: string;
  applicableRoles: string[];
}

export interface PerformanceScore {
  userId: string;
  kpiId: string;
  value: number;
  date: string;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  manager: string | User;
  team: string[] | User[];
}

export interface Expense {
  id: string;
  projectId: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  approvedBy?: string | User;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo?: string | User;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  category: 'technical' | 'administrative' | 'rti' | 'other';
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  filePath: string;
  fileName: string;
  fileType: string;
  uploadedBy: User | string;
  department: string;
  createdAt: string;
}

export interface Request {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: User | string;
  department: string;
  reason?: string;
  createdAt: string;
}

// Helper to handle fetch errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || response.statusText);
  }
  return response.json();
};

// API functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(response);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data.user;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_URL}/users`);
    return handleResponse(response);
  },

  getUserById: async (id: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);
      return await handleResponse(response);
    } catch {
      return null;
    }
  },

  // KPIs
  getKPIs: async (): Promise<KPI[]> => {
    const response = await fetch(`${API_URL}/kpis`);
    return handleResponse(response);
  },

  getKPIsByRole: async (role: string): Promise<KPI[]> => {
    const response = await fetch(`${API_URL}/kpis/role/${role}`);
    return handleResponse(response);
  },

  // Performance Scores
  getPerformanceScores: async (userId: string): Promise<PerformanceScore[]> => {
    const response = await fetch(`${API_URL}/kpis/scores/${userId}`);
    return handleResponse(response);
  },

  addPerformanceScore: async (score: PerformanceScore): Promise<PerformanceScore> => {
    const response = await fetch(`${API_URL}/kpis/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(score),
    });
    return handleResponse(response);
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_URL}/projects`);
    return handleResponse(response);
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      return await handleResponse(response);
    } catch {
      return null;
    }
  },

  // Expenses
  getExpensesByProject: async (projectId: string): Promise<Expense[]> => {
    const response = await fetch(`${API_URL}/expenses/project/${projectId}`);
    return handleResponse(response);
  },

  addExpense: async (expense: Expense): Promise<Expense> => {
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return handleResponse(response);
  },

  // Tickets
  getTickets: async (): Promise<Ticket[]> => {
    const response = await fetch(`${API_URL}/tickets`);
    return handleResponse(response);
  },

  addTicket: async (ticket: Ticket): Promise<Ticket> => {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    return handleResponse(response);
  },

  updateTicketStatus: async (id: string, status: Ticket['status']): Promise<Ticket | null> => {
    try {
      const response = await fetch(`${API_URL}/tickets/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return await handleResponse(response);
    } catch {
      return null;
    }
  },

  // Reports
  uploadReport: async (formData: FormData): Promise<Report> => {
    console.log(`Uploading to: ${API_URL}/reports/upload`);
    const response = await fetch(`${API_URL}/reports/upload`, {
      method: 'POST',
      body: formData, // Content-Type header excluded for FormData
    });
    return handleResponse(response);
  },

  getAllReports: async (): Promise<Report[]> => {
    const response = await fetch(`${API_URL}/reports`);
    return handleResponse(response);
  },

  getMyReports: async (userId: string): Promise<Report[]> => {
    const response = await fetch(`${API_URL}/reports/user/${userId}`);
    return handleResponse(response);
  },

  // Requests
  createRequest: async (data: Partial<Request>): Promise<Request> => {
    const response = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getAllRequests: async (): Promise<Request[]> => {
    const response = await fetch(`${API_URL}/requests`);
    return handleResponse(response);
  },

  getMyRequests: async (userId: string): Promise<Request[]> => {
    const response = await fetch(`${API_URL}/requests/user/${userId}`);
    return handleResponse(response);
  },

  updateRequestStatus: async (id: string, status: Request['status'], reason?: string): Promise<Request> => {
    const response = await fetch(`${API_URL}/requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reason }),
    });
    return handleResponse(response);
  }
};