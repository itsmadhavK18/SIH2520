import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useAuth } from '../context/AuthContext';
import { collaborationService, ProjectThread, ThreadMessage } from '../services/collaborationService';
import { useProject } from '../context/ProjectContext';

export const ProjectCollaboration: React.FC = () => {
  const { user } = useAuth();
  const { projects, fetchProjects } = useProject();
  const [threads, setThreads] = useState<ProjectThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ProjectThread | null>(null);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
      setLoading(false);
    };
    
    loadProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const loadThreads = async () => {
      if (selectedProject) {
        const projectThreads = await collaborationService.getThreadsByProject(selectedProject);
        setThreads(projectThreads);
        setSelectedThread(null);
        setMessages([]);
      }
    };
    
    loadThreads();
  }, [selectedProject]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedThread) {
        const threadMessages = await collaborationService.getMessagesByThread(selectedThread.id);
        setMessages(threadMessages);
      }
    };
    
    if (selectedThread) {
      loadMessages();
    }
  }, [selectedThread]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value);
  };

  const handleThreadSelect = async (thread: ProjectThread) => {
    setSelectedThread(thread);
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedThread || !messageInput.trim()) return;
    
    try {
      const newMessage = await collaborationService.addMessage({
        threadId: selectedThread.id,
        content: messageInput,
        createdBy: user.id
      });
      
      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading collaboration data...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Project Collaboration</h2>
      
      <div className="mb-4">
        <label htmlFor="projectSelect" className="block text-sm font-medium mb-1">
          Select Project
        </label>
        <select
          id="projectSelect"
          className="w-full p-2 border rounded"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      
      {selectedProject ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 md:col-span-1">
            <h3 className="font-semibold mb-3">Discussion Threads</h3>
            
            {threads.length > 0 ? (
              <div className="space-y-2">
                {threads.map(thread => (
                  <div 
                    key={thread.id}
                    className={`p-3 rounded cursor-pointer ${
                      selectedThread?.id === thread.id 
                        ? 'bg-blue-100' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleThreadSelect(thread)}
                  >
                    <h4 className="font-medium">{thread.title}</h4>
                    <p className="text-sm text-gray-500 truncate">{thread.description}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      Updated: {new Date(thread.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No discussion threads for this project
              </div>
            )}
          </Card>
          
          <Card className="p-4 md:col-span-2">
            {selectedThread ? (
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <h3 className="font-semibold">{selectedThread.title}</h3>
                  <p className="text-sm text-gray-500">{selectedThread.description}</p>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-4 space-y-3" style={{ maxHeight: '400px' }}>
                  {messages.length > 0 ? (
                    messages.map(message => {
                      const isCurrentUser = user && message.createdBy === user.id;
                      return (
                        <div 
                          key={message.id}
                          className={`p-3 rounded-lg ${
                            isCurrentUser 
                              ? 'bg-blue-100 ml-8' 
                              : 'bg-gray-100 mr-8'
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {isCurrentUser ? 'You' : `User ${message.createdBy}`}
                          </div>
                          <div className="mt-1">{message.content}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(message.createdAt).toLocaleString()}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No messages in this thread yet
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleMessageSubmit} className="mt-auto">
                  <div className="flex">
                    <Textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 resize-none"
                      rows={2}
                    />
                    <Button type="submit" className="ml-2 self-end">Send</Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a thread to view messages
              </div>
            )}
          </Card>
        </div>
      ) : (
        <Card className="p-8 text-center text-gray-500">
          Please select a project to view collaboration threads
        </Card>
      )}
    </div>
  );
};

export default ProjectCollaboration;