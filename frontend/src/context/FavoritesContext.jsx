import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import * as userService from '../services/userService';
import api from '../utils/api';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Kullanıcı girişi yapıldığında favorileri yükle
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (user) {
          // Kullanıcı giriş yapmışsa API'den favorileri al
          const response = await api.get('/users/favorites');
          setFavorites(response.data || []);
        } else {
          // Kullanıcı giriş yapmamışsa local storage'dan al
          const savedFavorites = localStorage.getItem('favorites');
          setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        }
      } catch (error) {
        // Hata durumunda sessizce local storage'a dön
        const savedFavorites = localStorage.getItem('favorites');
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Favorileri local storage'a kaydet (giriş yapmayan kullanıcılar için)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = async (product) => {
    try {
      if (user) {
        await api.post(`/users/favorites/${product._id}`);
        setFavorites(prev => [...prev, product]);
        toast.success('Ürün favorilere eklendi');
      } else {
        // Giriş yapmamışsa local storage'a kaydet
        setFavorites(prev => {
          if (prev.find(item => item._id === product._id)) {
            return prev;
          }
          return [...prev, product];
        });
        toast.success('Ürün favorilere eklendi');
      }
    } catch (error) {
      toast.error('Favorilere eklenirken bir hata oluştu');
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      if (user) {
        // Kullanıcı giriş yapmışsa API'ye gönder
        await userService.removeFromFavorites(productId);
        setFavorites(prev => prev.filter(item => item._id !== productId));
        toast.info('Ürün favorilerden kaldırıldı');
      } else {
        // Giriş yapmamışsa local storage'dan kaldır
        setFavorites(prev => prev.filter(item => item._id !== productId));
        toast.info('Ürün favorilerden kaldırıldı');
      }
    } catch (error) {
      toast.error('Favorilerden kaldırılırken bir hata oluştu');
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item._id === productId);
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite: (product) => {
      if (isFavorite(product._id)) {
        removeFromFavorites(product._id);
      } else {
        addToFavorites(product);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={value}>
      {!loading && children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 