import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Divider
} from '@mui/material';
import { 
  FavoriteBorder, 
  Favorite, 
  ShoppingCart,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useProducts } from '../../hooks/useProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { products, loading, error } = useProducts({ id: productId });

  if (loading) return <div className="spinner" />;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!products || products.length === 0) return <div>Ürün bulunamadı</div>;

  const product = products[0];
  const favorite = isFavorite(product.id);

  const handlePrevImage = () => {
    setCurrentImage(current => 
      current === 0 ? product.images.length - 1 : current - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage(current => 
      current === product.images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Ürün Görselleri */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={product.images[currentImage]}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <NavigateNext />
            </IconButton>
          </Box>
          
          {/* Küçük Resimler */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto', pb: 1 }}>
            {product.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`${product.name} ${index + 1}`}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: currentImage === index ? '2px solid' : 'none',
                  borderColor: 'primary.main'
                }}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </Box>
        </Grid>

        {/* Ürün Bilgileri */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price} ₺
          </Typography>

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => addToCart(product)}
              size="large"
            >
              Sepete Ekle
            </Button>
            
            <IconButton
              onClick={() => toggleFavorite(product.id)}
              color={favorite ? 'primary' : 'default'}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              {favorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 