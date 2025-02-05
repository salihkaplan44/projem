import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (localStorage.getItem('token')) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setUser(data);
      toast.success('Kayıt başarılı!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Kayıt olurken bir hata oluştu');
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data);
      toast.success('Giriş başarılı!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Giriş yaparken bir hata oluştu');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Çıkış yapıldı');
  };

  const forgotPassword = async (email) => {
    try {
      await authService.forgotPassword(email);
      toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await authService.resetPassword(token, password);
      toast.success('Şifreniz başarıyla güncellendi');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 