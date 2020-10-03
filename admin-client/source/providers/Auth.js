import React, { useEffect, useState, createContext, useContext } from 'react';
// import { API_URL } from '../config';

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // await fetch(`${API_URL}/api/verify-token`, { method: 'GET', credentials: 'include' });
        setAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
