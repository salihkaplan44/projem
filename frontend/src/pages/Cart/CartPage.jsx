import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box,
  Paper 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadIcon from '@mui/icons-material/Download';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import CheckoutForm from './CheckoutForm';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, getTotal } = useCart();
  const cartRef = useRef(null);
  const [openCheckout, setOpenCheckout] = React.useState(false);

  const handleCapture = () => {
    if (cartRef.current) {
      html2canvas(cartRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'sepetim.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Sepetiniz Boş
          </Typography>
          <Typography color="text.secondary" paragraph>
            Alışverişe başlamak için ürünlerimize göz atın.
          </Typography>
          <Button variant="contained" href="/" color="primary">
            Alışverişe Başla
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sepetim
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper ref={cartRef} id="cart-container" sx={{ p: 2 }}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary total={getTotal()} />
          
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleCapture}
            >
              Sepeti İndir
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenCheckout(true)}
            >
              Siparişi Tamamla
            </Button>
          </Box>
        </Grid>
      </Grid>

      <CheckoutForm 
        open={openCheckout} 
        onClose={() => setOpenCheckout(false)} 
        cartItems={cartItems}
        total={getTotal()}
      />
    </Container>
  );
};

export default CartPage; 