import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Alert
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
    } catch (err) {
      console.error('Login error:', err);
      setError('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Giriş Yap
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Şifre"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş Yap
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Şifremi Unuttum
            </Link>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" display="inline">
                Hesabınız yok mu?{' '}
              </Typography>
              <Link component={RouterLink} to="/register" variant="body2">
                Kayıt Ol
              </Link>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 