import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import HomeFeatured from './HomeFeatured';
import HomeNewProducts from './HomeNewProducts';
import ProductCarousel from '../../components/product/ProductCarousel';

const HomeMain = () => {
  return (
    <Container maxWidth="lg">
      {/* Üst Banner */}
      <Box sx={{ mb: 6, mt: 4 }}>
        <ProductCarousel />
      </Box>

      {/* Göz Alıcı Tasarımlar */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
          Göz Alıcı Tasarımlarımız
        </Typography>
        <HomeFeatured />
      </Box>

      {/* Rastgele Ürünler */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
          Sizin İçin Seçtiklerimiz
        </Typography>
        <Grid container spacing={3}>
          {/* ProductCard bileşenleri buraya gelecek */}
        </Grid>
      </Box>

      {/* En Yeni Ürünler */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
          En Yeni Ürünler
        </Typography>
        <HomeNewProducts />
      </Box>
    </Container>
  );
};

export default HomeMain; 