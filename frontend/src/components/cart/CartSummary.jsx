import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

const CartSummary = ({ total }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sipariş Özeti
      </Typography>
      
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Ara Toplam</Typography>
          <Typography>{total.toFixed(2)} ₺</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>KDV (%18)</Typography>
          <Typography>{(total * 0.18).toFixed(2)} ₺</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Toplam</Typography>
        <Typography variant="h6" color="primary">
          {(total * 1.18).toFixed(2)} ₺
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartSummary; 