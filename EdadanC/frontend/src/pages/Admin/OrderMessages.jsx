import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon
} from '@mui/icons-material';
import axios from '../../utils/api';

const OrderMessages = () => {
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/admin/orders');
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError('Siparişler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      setError('Sipariş durumu güncellenirken bir hata oluştu');
    }
  };

  const handleSendMessage = async (orderId) => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(`/admin/orders/${orderId}/messages`, {
        message: newMessage
      });
      setNewMessage('');
      fetchOrders();
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sipariş ve Mesaj Yönetimi
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Tüm Siparişler" />
        <Tab label="Yeni Mesajlar" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          {orders.map((order) => (
            <Accordion
              key={order.id}
              expanded={selectedOrder === order.id}
              onChange={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography>Sipariş #{order.id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography color="text.secondary">
                      {order.user.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MenuItem value="pending">Beklemede</MenuItem>
                        <MenuItem value="processing">İşleniyor</MenuItem>
                        <MenuItem value="shipped">Kargoda</MenuItem>
                        <MenuItem value="delivered">Teslim Edildi</MenuItem>
                        <MenuItem value="cancelled">İptal Edildi</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={3}>
                  {/* Sipariş Detayları */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Sipariş Detayları
                    </Typography>
                    <List>
                      {order.items.map((item) => (
                        <ListItem key={item.id}>
                          <ListItemText
                            primary={item.name}
                            secondary={`${item.quantity} adet - ${item.price} ₺`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">
                        Toplam: {order.total} ₺
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Mesajlar */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Mesajlar
                    </Typography>
                    <Paper sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                      {order.messages?.map((message) => (
                        <Box key={message.id} sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {message.sender === 'admin' ? 'Admin' : order.user.name}
                          </Typography>
                          <Typography>{message.message}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(message.createdAt).toLocaleString()}
                          </Typography>
                          <Divider sx={{ mt: 1 }} />
                        </Box>
                      ))}
                    </Paper>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Mesajınızı yazın..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => handleSendMessage(order.id)}
                      >
                        Gönder
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          {/* Yeni mesajlar sekmesi içeriği */}
          <Typography>Yeni mesajlar burada listelenecek</Typography>
        </Box>
      )}
    </Container>
  );
};

export default OrderMessages; 