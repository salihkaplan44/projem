import api from '../utils/api';

export const getProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const formData = new FormData();
  
  // Form verilerini ekle
  Object.keys(productData).forEach(key => {
    if (key !== 'images') {
      formData.append(key, productData[key]);
    }
  });

  // Görselleri ekle
  if (productData.images) {
    productData.images.forEach(image => {
      formData.append('images', image);
    });
  }

  const response = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  
  Object.keys(productData).forEach(key => {
    if (key !== 'images') {
      formData.append(key, productData[key]);
    }
  });

  if (productData.images) {
    productData.images.forEach(image => {
      formData.append('images', image);
    });
  }

  const response = await api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}; 