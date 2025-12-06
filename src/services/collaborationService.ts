// Collaboration Service for Project Threads
// This service handles project collaboration with role-based permissions

import { User } from './api';

// Thread message interface
export interface ThreadMessage {
  id: string;
  threadId: string;
  content: string;
  attachmentUrl?: string;
  createdBy: string;
  createdAt: string;
  editedAt?: string;
}

// Project thread interface
export interface ProjectThread {
  id: string;
  projectId: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  participants: ThreadParticipant[];
  status: 'active' | 'archived';
}

// Thread participant with role-based permissions
export interface ThreadParticipant {
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
}

// Mock data
const projectThreads: ProjectThread[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Brahmaputra River Basin Study Discussion',
    description: 'Thread for discussing the methodology and progress of the river basin study',
    createdBy: '2',
    createdAt: '2023-02-01',
    updatedAt: '2023-10-01',
    participants: [
      {
        userId: '2',
        role: 'owner',
        joinedAt: '2023-02-01'
      },
      {
        userId: '3',
        role: 'editor',
        joinedAt: '2023-02-01'
      },
      {
        userId: '1',
        role: 'viewer',
        joinedAt: '2023-02-15'
      }
    ],
    status: 'active'
  }
];

const threadMessages: ThreadMessage[] = [
  {
    id: '1',
    threadId: '1',
    content: 'Initial survey results are now available for review.',
    createdBy: '2',
    createdAt: '2023-02-01'
  },
  {
    id: '2',
    threadId: '1',
    content: 'I have reviewed the survey data and have some concerns about the methodology used.',
    createdBy: '3',
    createdAt: '2023-02-02'
  },
  {
    id: '3',
    threadId: '1',
    content: 'Let\'s schedule a meeting to discuss these concerns in detail.',
    createdBy: '2',
    createdAt: '2023-02-03'
  }
];

// Collaboration Service API
export const collaborationService = {
  // Project Threads
  getThreadsByProject: async (projectId: string): Promise<ProjectThread[]> => {
    return projectThreads.filter(thread => thread.projectId === projectId);
  },
  
  getThreadById: async (id: string): Promise<ProjectThread | null> => {
    return projectThreads.find(thread => thread.id === id) || null;
  },
  
  createThread: async (thread: Omit<ProjectThread, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectThread> => {
    const now = new Date().toISOString();
    const newThread: ProjectThread = {
      ...thread,
      id: (projectThreads.length + 1).toString(),
      createdAt: now,
      updatedAt: now
    };
    projectThreads.push(newThread);
    return newThread;
  },
  
  updateThread: async (id: string, updates: Partial<ProjectThread>): Promise<ProjectThread | null> => {
    const thread = projectThreads.find(t => t.id === id);
    if (thread) {
      Object.assign(thread, { ...updates, updatedAt: new Date().toISOString() });
      return thread;
    }
    return null;
  },
  
  // Thread Participants
  addParticipant: async (threadId: string, participant: Omit<ThreadParticipant, 'joinedAt'>): Promise<ThreadParticipant | null> => {
    const thread = projectThreads.find(t => t.id === threadId);
    if (thread) {
      const newParticipant: ThreadParticipant = {
        ...participant,
        joinedAt: new Date().toISOString()
      };
      thread.participants.push(newParticipant);
      thread.updatedAt = new Date().toISOString();
      return newParticipant;
    }
    return null;
  },
  
  updateParticipantRole: async (threadId: string, userId: string, role: ThreadParticipant['role']): Promise<ThreadParticipant | null> => {
    const thread = projectThreads.find(t => t.id === threadId);
    if (thread) {
      const participant = thread.participants.find(p => p.userId === userId);
      if (participant) {
        participant.role = role;
        thread.updatedAt = new Date().toISOString();
        return participant;
      }
    }
    return null;
  },
  
  removeParticipant: async (threadId: string, userId: string): Promise<boolean> => {
    const thread = projectThreads.find(t => t.id === threadId);
    if (thread) {
      const initialLength = thread.participants.length;
      thread.participants = thread.participants.filter(p => p.userId !== userId);
      thread.updatedAt = new Date().toISOString();
      return thread.participants.length < initialLength;
    }
    return false;
  },
  
  // Thread Messages
  getMessagesByThread: async (threadId: string): Promise<ThreadMessage[]> => {
    return threadMessages.filter(message => message.threadId === threadId);
  },
  
  addMessage: async (message: Omit<ThreadMessage, 'id' | 'createdAt'>): Promise<ThreadMessage> => {
    const newMessage: ThreadMessage = {
      ...message,
      id: (threadMessages.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    threadMessages.push(newMessage);
    
    // Update thread's updatedAt timestamp
    const thread = projectThreads.find(t => t.id === message.threadId);
    if (thread) {
      thread.updatedAt = new Date().toISOString();
    }
    
    return newMessage;
  },
  
  editMessage: async (id: string, content: string): Promise<ThreadMessage | null> => {
    const message = threadMessages.find(m => m.id === id);
    if (message) {
      message.content = content;
      message.editedAt = new Date().toISOString();
      return message;
    }
    return null;
  },
  
  // Permission checks
  canViewThread: async (threadId: string, userId: string): Promise<boolean> => {
    const thread = await collaborationService.getThreadById(threadId);
    if (!thread) return false;
    
    const participant = thread.participants.find(p => p.userId === userId);
    return !!participant; // User can view if they are a participant
  },
  
  canEditThread: async (threadId: string, userId: string): Promise<boolean> => {
    const thread = await collaborationService.getThreadById(threadId);
    if (!thread) return false;
    
    const participant = thread.participants.find(p => p.userId === userId);
    return participant ? ['owner', 'editor'].includes(participant.role) : false;
  },
  
  canManageParticipants: async (threadId: string, userId: string): Promise<boolean> => {
    const thread = await collaborationService.getThreadById(threadId);
    if (!thread) return false;
    
    const participant = thread.participants.find(p => p.userId === userId);
    return participant ? participant.role === 'owner' : false;
  }
};