import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
        </Link>

        {/* Site Başlığı */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Edadan Aksesuar
          <Typography variant="subtitle2" component="div">
            Şık ve Zarif Tasarımlar
          </Typography>
        </Typography>

        {/* Navigasyon Linkleri */}
        <Button color="inherit" component={Link} to="/">
          Ana Sayfa
        </Button>
        <Button color="inherit" component={Link} to="/categories">
          Kategoriler
        </Button>

        {/* Sepet İkonu */}
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Favoriler */}
        <IconButton color="inherit" component={Link} to="/favorites">
          <FavoriteIcon />
        </IconButton>

        {/* Kullanıcı Menüsü */}
        {user ? (
          <>
            <IconButton color="inherit" component={Link} to="/profile">
              <PersonIcon />
            </IconButton>
            {user.isAdmin && (
              <IconButton color="inherit" component={Link} to="/dashboard">
                <AdminPanelSettingsIcon />
              </IconButton>
            )}
            <Button color="inherit" onClick={logout}>
              Çıkış
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Giriş
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 