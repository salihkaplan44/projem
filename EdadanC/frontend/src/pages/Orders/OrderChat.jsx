import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const OrderChat = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Her 10 saniyede bir mesajları güncelle
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/orders/${orderId}/messages`);
      setMessages(response.data);
      setError('');
    } catch (err) {
      setError('Mesajlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post(`/orders/${orderId}/messages`, {
        message: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      setError('Mesaj gönderilemedi');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="spinner" />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Sipariş #{orderId} - Mesajlar
        </Typography>
        
        <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
          <List sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body1"
                        color="text.primary"
                        sx={{
                          backgroundColor: message.sender === user.id ? 'primary.light' : 'grey.200',
                          p: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}
                      >
                        {message.message}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: 'block' }}
                      >
                        {message.sender === user.id ? 'Siz' : 'Admin'} -{' '}
                        {new Date(message.createdAt).toLocaleString()}
                      </Typography>
                    }
                    sx={{
                      textAlign: message.sender === user.id ? 'right' : 'left'
                    }}
                  />
                </ListItem>
                {index < messages.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </List>

          <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Mesajınızı yazın..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              size="small"
            />
            <Button 
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Gönder
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderChat; 