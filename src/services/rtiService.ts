// RTI (Right to Information) Service
// This service handles public information requests and transparency features

import { Ticket } from './api';

// RTI Request interface extends the Ticket interface with RTI-specific fields
export interface RTIRequest extends Omit<Ticket, 'category'> {
  category: 'rti';
  requestType: 'information' | 'document' | 'inspection';
  publicInformationOfficer?: string;
  targetCompletionDate: string;
  applicantDetails: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

// Mock RTI requests data
const rtiRequests: RTIRequest[] = [
  {
    id: '1',
    title: 'Request for Brahmaputra River Basin Study Information',
    description: 'Requesting details about the methodology and findings of the Brahmaputra River Basin Study',
    createdBy: 'public@example.com',
    assignedTo: '1',
    status: 'open',
    priority: 'medium',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    category: 'rti',
    requestType: 'information',
    publicInformationOfficer: '2',
    targetCompletionDate: '2023-10-30',
    applicantDetails: {
      name: 'Public User',
      email: 'public@example.com',
      phone: '9876543210',
      address: 'Guwahati, Assam'
    }
  }
];

// Public information categories that are proactively disclosed
export interface PublicInformation {
  id: string;
  title: string;
  description: string;
  category: 'organization' | 'budget' | 'projects' | 'tenders' | 'reports';
  documentUrl?: string;
  publishedDate: string;
  lastUpdated: string;
}

// Mock public information data
const publicInformation: PublicInformation[] = [
  {
    id: '1',
    title: 'Annual Report 2022-23',
    description: 'Annual report of the Brahmaputra Board for the financial year 2022-23',
    category: 'reports',
    documentUrl: '/documents/annual-report-2022-23.pdf',
    publishedDate: '2023-06-15',
    lastUpdated: '2023-06-15'
  },
  {
    id: '2',
    title: 'Budget Allocation 2023-24',
    description: 'Budget allocation for various projects and administrative expenses for FY 2023-24',
    category: 'budget',
    documentUrl: '/documents/budget-2023-24.pdf',
    publishedDate: '2023-04-01',
    lastUpdated: '2023-04-01'
  },
  {
    id: '3',
    title: 'Organizational Structure',
    description: 'Organizational structure and hierarchy of the Brahmaputra Board',
    category: 'organization',
    documentUrl: '/documents/org-structure.pdf',
    publishedDate: '2023-01-10',
    lastUpdated: '2023-01-10'
  }
];

// RTI Service API
export const rtiService = {
  // RTI Requests
  getRTIRequests: async (): Promise<RTIRequest[]> => {
    return rtiRequests;
  },
  
  getRTIRequestById: async (id: string): Promise<RTIRequest | null> => {
    return rtiRequests.find(req => req.id === id) || null;
  },
  
  createRTIRequest: async (request: Omit<RTIRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<RTIRequest> => {
    const newRequest: RTIRequest = {
      ...request,
      id: (rtiRequests.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    rtiRequests.push(newRequest);
    return newRequest;
  },
  
  updateRTIRequestStatus: async (id: string, status: RTIRequest['status']): Promise<RTIRequest | null> => {
    const request = rtiRequests.find(req => req.id === id);
    if (request) {
      request.status = status;
      request.updatedAt = new Date().toISOString();
      return request;
    }
    return null;
  },
  
  // Public Information
  getPublicInformation: async (): Promise<PublicInformation[]> => {
    return publicInformation;
  },
  
  getPublicInformationById: async (id: string): Promise<PublicInformation | null> => {
    return publicInformation.find(info => info.id === id) || null;
  },
  
  getPublicInformationByCategory: async (category: PublicInformation['category']): Promise<PublicInformation[]> => {
    return publicInformation.filter(info => info.category === category);
  },
  
  addPublicInformation: async (info: Omit<PublicInformation, 'id' | 'publishedDate' | 'lastUpdated'>): Promise<PublicInformation> => {
    const now = new Date().toISOString();
    const newInfo: PublicInformation = {
      ...info,
      id: (publicInformation.length + 1).toString(),
      publishedDate: now,
      lastUpdated: now
    };
    publicInformation.push(newInfo);
    return newInfo;
  },
  
  updatePublicInformation: async (id: string, updates: Partial<PublicInformation>): Promise<PublicInformation | null> => {
    const info = publicInformation.find(i => i.id === id);
    if (info) {
      Object.assign(info, { ...updates, lastUpdated: new Date().toISOString() });
      return info;
    }
    return null;
  }
};