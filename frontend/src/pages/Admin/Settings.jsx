import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Save as SaveIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import axios from '../../utils/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    logo: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    instagram: '',
    aboutUs: '',
    privacyPolicy: '',
    termsOfService: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/admin/settings');
      setSettings(response.data);
      setError('');
    } catch (err) {
      setError('Ayarlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put('/admin/settings', settings);
      setSuccess('Ayarlar başarıyla güncellendi');
    } catch (err) {
      setError('Ayarlar güncellenirken bir hata oluştu');
    }
  };

  if (loading) return <div className="spinner" />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Site Ayarları
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Genel Ayarlar */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Genel Ayarlar
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Site Adı"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {settings.logo && (
                      <Box
                        component="img"
                        src={settings.logo}
                        alt="Logo"
                        sx={{ height: 50 }}
                      />
                    )}
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="logo-upload"
                      type="file"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<ImageIcon />}
                      >
                        Logo Yükle
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Site Açıklaması"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* İletişim Bilgileri */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                İletişim Bilgileri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adres"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="E-posta"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="WhatsApp"
                    name="whatsapp"
                    value={settings.whatsapp}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WhatsAppIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    name="instagram"
                    value={settings.instagram}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sayfa İçerikleri */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sayfa İçerikleri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Hakkımızda"
                    name="aboutUs"
                    value={settings.aboutUs}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Gizlilik Politikası"
                    name="privacyPolicy"
                    value={settings.privacyPolicy}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Kullanım Koşulları"
                    name="termsOfService"
                    value={settings.termsOfService}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            size="large"
          >
            Ayarları Kaydet
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Settings; 