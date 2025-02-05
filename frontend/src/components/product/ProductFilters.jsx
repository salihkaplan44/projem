import React from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Slider,
  Typography
} from '@mui/material';

const ProductFilters = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters(prev => ({
      ...prev,
      priceRange: newValue
    }));
  };

  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sıralama</InputLabel>
        <Select
          name="sort"
          value={filters.sort}
          label="Sıralama"
          onChange={handleChange}
        >
          <MenuItem value="newest">En Yeniler</MenuItem>
          <MenuItem value="price_asc">Fiyat (Artan)</MenuItem>
          <MenuItem value="price_desc">Fiyat (Azalan)</MenuItem>
          <MenuItem value="name_asc">İsim (A-Z)</MenuItem>
          <MenuItem value="name_desc">İsim (Z-A)</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Ara"
        name="search"
        value={filters.search}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Fiyat Aralığı</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{filters.priceRange[0]} ₺</Typography>
          <Typography variant="body2">{filters.priceRange[1]} ₺</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFilters; 