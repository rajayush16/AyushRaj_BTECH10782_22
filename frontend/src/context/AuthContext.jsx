import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setSession = (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  const fetchProfile = async () => {
    const response = await api.get('/users/me');
    setUser(response.data.data);
  };

  const login = async (payload) => {
    const response = await api.post('/auth/login', payload);
    setSession(response.data.data.token);
    setUser(response.data.data.user);
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    setSession(response.data.data.token);
    setUser(response.data.data.user);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setSession(null);
    setUser(null);
  };

  const updateProfile = async (payload) => {
    const response = await api.put('/users/me', payload);
    setUser(response.data.data);
  };

  const deleteProfile = async () => {
    await api.delete('/users/me');
    setSession(null);
    setUser(null);
  };

  useEffect(() => {
    const boot = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await fetchProfile();
      } catch (error) {
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      deleteProfile,
      refreshProfile: fetchProfile,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};