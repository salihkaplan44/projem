import api from '../utils/api';

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const addOrderMessage = async (orderId, message) => {
  const response = await api.post(`/orders/${orderId}/messages`, { message });
  return response.data;
};

// Admin fonksiyonları
export const getAllOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
}; 