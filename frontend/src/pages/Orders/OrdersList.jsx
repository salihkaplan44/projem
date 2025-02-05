import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Divider,
  TextField,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../utils/api';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data);
    } catch (err) {
      setError('Siparişler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (orderId) => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`/orders/${orderId}/messages`, {
        message: newMessage
      });
      setNewMessage('');
      fetchOrders(); // Mesajları güncellemek için siparişleri yeniden yükle
    } catch (err) {
      setError('Mesaj gönderilemedi');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Beklemede',
      processing: 'İşleniyor',
      shipped: 'Kargoda',
      delivered: 'Teslim Edildi',
      cancelled: 'İptal Edildi'
    };
    return texts[status] || status;
  };

  if (loading) return <div className="spinner" />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>

      {orders.map(order => (
        <Accordion 
          key={order.id}
          expanded={selectedOrder === order.id}
          onChange={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography>Sipariş #{order.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography color="text.secondary">
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Chip 
                  label={getStatusText(order.status)}
                  color={getStatusColor(order.status)}
                  size="small"
                />
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Box>
              <Typography variant="h6" gutterBottom>
                Sipariş Detayları
              </Typography>
              
              <Grid container spacing={2}>
                {order.items.map(item => (
                  <Grid item xs={12} key={item.id}>
                    <Paper sx={{ p: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ width: '100%', borderRadius: 1 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>{item.quantity} adet</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>{item.price} ₺</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Mesajlar
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {order.messages?.map(message => (
                    <Paper key={message.id} sx={{ p: 2, mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {message.sender} - {new Date(message.createdAt).toLocaleString()}
                      </Typography>
                      <Typography>{message.message}</Typography>
                    </Paper>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Mesajınızı yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    size="small"
                  />
                  <Button 
                    variant="contained"
                    onClick={() => handleSendMessage(order.id)}
                  >
                    Gönder
                  </Button>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default OrdersList; 