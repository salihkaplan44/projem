import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useProducts } from '../../hooks/useProducts';

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { products, loading } = useProducts({ featured: true, limit: 3 });

  if (loading || products.length === 0) {
    return <div className="spinner" />;
  }

  const handlePrevious = () => {
    setCurrentSlide(current => (current === 0 ? products.length - 1 : current - 1));
  };

  const handleNext = () => {
    setCurrentSlide(current => (current === products.length - 1 ? 0 : current + 1));
  };

  const handleClick = () => {
    navigate(`/product/${products[currentSlide].id}`);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <Box
          component="img"
          src={products[currentSlide].images[0]}
          alt={products[currentSlide].name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out'
          }}
        />
      </Paper>

      <IconButton
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
        }}
        onClick={handlePrevious}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
        }}
        onClick={handleNext}
      >
        <ArrowForward />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        {products.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductCarousel; 