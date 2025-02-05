import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', pt: 4, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        {/* Üst Kısım - Özellikler */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SecurityIcon sx={{ mr: 1 }} />
              <Typography>Güvenli Alışveriş</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LocalShippingIcon sx={{ mr: 1 }} />
              <Typography>Hızlı Teslimat</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SupportAgentIcon sx={{ mr: 1 }} />
              <Typography>7/24 Destek</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Orta Kısım - İletişim ve Sosyal Medya */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>İletişim</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography>Adres bilgisi buraya gelecek</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography>+90 555 555 5555</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography>info@edadanaksesuar.com</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Sosyal Medya</Typography>
            <IconButton 
              color="inherit" 
              href="https://instagram.com/edadanaksesuar" 
              target="_blank"
              sx={{ mr: 2 }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://wa.me/905555555555" 
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Hızlı Linkler</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginBottom: '8px' }}>
                Hakkımızda
              </Link>
              <Link to="/privacy" style={{ color: 'white', textDecoration: 'none', marginBottom: '8px' }}>
                Gizlilik Politikası
              </Link>
              <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>
                Kullanım Koşulları
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Alt Kısım - Telif Hakkı */}
        <Typography variant="body2" align="center" sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          © {new Date().getFullYear()} Edadan Aksesuar. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 