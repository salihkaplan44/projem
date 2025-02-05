import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profil Bilgileri */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Profil Bilgileri</Typography>
              <Button
                component={RouterLink}
                to="/profile/edit"
                startIcon={<EditIcon />}
                size="small"
              >
                Düzenle
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemText 
                  primary="Ad Soyad" 
                  secondary={user?.name || '-'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="E-posta" 
                  secondary={user?.email || '-'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Telefon" 
                  secondary={user?.phone || '-'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Adres" 
                  secondary={user?.address || '-'} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Siparişler */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Son Siparişlerim</Typography>
              <Button
                component={RouterLink}
                to="/orders"
                size="small"
              >
                Tümünü Gör
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {/* Son 5 sipariş listesi buraya gelecek */}
          </Paper>
        </Grid>

        {/* Favoriler */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Favori Ürünlerim</Typography>
              <Button
                component={RouterLink}
                to="/favorites"
                size="small"
              >
                Tümünü Gör
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {/* Favori ürünler grid'i buraya gelecek */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage; 