import { useState, useEffect } from 'react';
import axios from '../utils/api';

export const useProducts = (options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/products', { params: options });
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu.');
        console.error('Ürün yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.featured, options.sort, options.limit, options.category]);

  return { products, loading, error };
}; 