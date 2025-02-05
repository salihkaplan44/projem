import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../../components/product/ProductCard';
import { useProducts } from '../../hooks/useProducts';

const HomeFeatured = () => {
  const { products, loading, error } = useProducts({ featured: true, limit: 3 });

  if (loading) return <div className="spinner" />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeFeatured; 