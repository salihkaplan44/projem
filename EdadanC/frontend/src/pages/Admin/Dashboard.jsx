import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import {
  ShoppingCart as OrderIcon,
  Message as MessageIcon,
  Inventory as ProductIcon,
  Category as CategoryIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, value, icon, color, onClick }) => (
  <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={onClick}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
        <Box sx={{ 
          backgroundColor: `${color}.light`,
          borderRadius: '50%',
          p: 1,
          display: 'flex'
        }}>
          {icon}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Detayları Görüntüle
        </Typography>
        <IconButton size="small">
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Toplam Sipariş',
      value: '150',
      icon: <OrderIcon sx={{ color: 'primary.main' }} />,
      color: 'primary',
      path: '/dashboard/messages'
    },
    {
      title: 'Yeni Mesajlar',
      value: '12',
      icon: <MessageIcon sx={{ color: 'warning.main' }} />,
      color: 'warning',
      path: '/dashboard/messages'
    },
    {
      title: 'Toplam Ürün',
      value: '89',
      icon: <ProductIcon sx={{ color: 'success.main' }} />,
      color: 'success',
      path: '/dashboard/products'
    },
    {
      title: 'Kategoriler',
      value: '15',
      icon: <CategoryIcon sx={{ color: 'info.main' }} />,
      color: 'info',
      path: '/dashboard/categories'
    }
  ];

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <DashboardCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              onClick={() => navigate(stat.path)}
            />
          </Grid>
        ))}

        {/* Son Siparişler */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Son Siparişler
            </Typography>
            {/* Sipariş listesi buraya gelecek */}
          </Paper>
        </Grid>

        {/* Son Mesajlar */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Son Mesajlar
            </Typography>
            {/* Mesaj listesi buraya gelecek */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 