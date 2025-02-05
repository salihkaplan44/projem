import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100)}...
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          {product.price} ₺
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          aria-label="favorilere ekle"
          onClick={handleFavoriteClick}
          color={favorite ? 'primary' : 'default'}
        >
          {favorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton 
          aria-label="sepete ekle"
          onClick={handleAddToCart}
          sx={{ marginLeft: 'auto' }}
        >
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 