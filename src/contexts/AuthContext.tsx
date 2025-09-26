import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '@/routes/routes';
import { setLogoutHandler } from '@/contexts/authEvents';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('AUTH_TOKEN_CONDFYNEWS');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('AUTH_TOKEN_CONDFYNEWS');
    } catch (e) {
      // noop
    }
    setIsAuthenticated(false);

    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    setLogoutHandler(logout);
    return () => setLogoutHandler(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};