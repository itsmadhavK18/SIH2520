import React, { createContext, useContext, useState } from 'react';
import { Ticket, api } from '../services/api';

interface TicketContextType {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: Omit<Ticket, 'id'>) => Promise<void>;
  updateTicketStatus: (id: string, status: Ticket['status']) => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTickets();
      setTickets(data);
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTicket = async (ticketData: Omit<Ticket, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newTicket = await api.addTicket(ticketData as Ticket);
      setTickets(prev => [...prev, newTicket]);
    } catch (err) {
      setError('Failed to create ticket');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (id: string, status: Ticket['status']) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTicket = await api.updateTicketStatus(id, status);
      if (updatedTicket) {
        setTickets(prev => 
          prev.map(ticket => ticket.id === id ? updatedTicket : ticket)
        );
      }
    } catch (err) {
      setError('Failed to update ticket status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        fetchTickets,
        addTicket,
        updateTicketStatus,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
};