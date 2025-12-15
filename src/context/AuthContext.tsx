import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, api } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Frontend attempting login for: ${email}`);
      const user = await api.login(email, password);
      console.log('Login response:', user ? 'Success' : 'Failure', user);

      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User saved to localStorage and context updated');
      } else {
        const errorMsg = 'Invalid credentials';
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred during login';
      setError(msg);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};