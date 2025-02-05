import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Box, 
  Typography,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import { useProducts } from '../../hooks/useProducts';

const CategoryList = () => {
  const { categoryId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState({
    sort: 'newest',
    search: '',
    priceRange: [0, 1000],
    category: categoryId
  });

  const { products, loading, error } = useProducts({
    ...filters,
    category: categoryId
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filterDrawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <ProductFilters filters={filters} setFilters={setFilters} />
    </Box>
  );

  if (loading) return <div className="spinner" />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {categoryId ? 'Kategori Ürünleri' : 'Tüm Ürünler'}
        </Typography>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Filtreler */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <ProductFilters filters={filters} setFilters={setFilters} />
          </Grid>
        )}

        {/* Ürün Listesi */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Mobil Filtre Drawer'ı */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Daha iyi mobil performansı için
        }}
      >
        {filterDrawer}
      </Drawer>
    </Container>
  );
};

export default CategoryList; 