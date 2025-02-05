import api from '../utils/api';

export const getCurrentUser = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const addToFavorites = async (productId) => {
  const response = await api.post(`/users/favorites/${productId}`);
  return response.data;
};

export const removeFromFavorites = async (productId) => {
  const response = await api.delete(`/users/favorites/${productId}`);
  return response.data;
}; 