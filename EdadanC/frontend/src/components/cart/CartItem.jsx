import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        src={item.images[0]}
        alt={item.name}
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 1,
          mr: 2
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="text.secondary" gutterBottom>
          Birim Fiyat: {item.price} ₺
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            type="number"
            label="Adet"
            value={item.quantity}
            onChange={handleQuantityChange}
            InputProps={{ inputProps: { min: 1 } }}
            size="small"
            sx={{ width: 100 }}
          />
          <Typography>
            Toplam: {(item.price * item.quantity).toFixed(2)} ₺
          </Typography>
        </Box>
      </Box>

      <IconButton 
        onClick={() => removeFromCart(item.id)}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default CartItem; 