import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AUTH_KEY = '@marketing_agency_auth_user';
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await AsyncStorage.getItem(AUTH_KEY);
        if (data) {
          setUser(JSON.parse(data));
        }
      } catch (error) {
        console.log('Sin sesión previa guardada');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    if (email.trim().toLowerCase() === 'admin@apex.com' && pass === '123456') {
      const userData: User = { email, name: 'Media Buyer Lead', role: 'Agency Admin' };
      setUser(userData);
      try {
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);