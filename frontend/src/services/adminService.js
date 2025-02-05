import api from '../utils/api';

export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateUserRole = async (userId, isAdmin) => {
  const response = await api.put(`/admin/users/${userId}/role`, { isAdmin });
  return response.data;
};

export const getSettings = async () => {
  const response = await api.get('/admin/settings');
  return response.data;
};

export const updateSettings = async (settingsData) => {
  const formData = new FormData();
  
  Object.keys(settingsData).forEach(key => {
    if (key === 'logo' && settingsData[key] instanceof File) {
      formData.append('logo', settingsData[key]);
    } else if (typeof settingsData[key] === 'object') {
      formData.append(key, JSON.stringify(settingsData[key]));
    } else {
      formData.append(key, settingsData[key]);
    }
  });

  const response = await api.put('/admin/settings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}; 