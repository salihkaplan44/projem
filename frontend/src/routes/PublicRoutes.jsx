import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import Home from '../pages/Home/HomeMain';
import CategoryList from '../pages/Categories/CategoryList';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import CartPage from '../pages/Cart/CartPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import OrdersList from '../pages/Orders/OrdersList';

const PublicRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/categories/:categoryId" element={<CategoryList />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/" /> : <Register />} 
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route 
        path="/profile" 
        element={user ? <ProfilePage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/orders" 
        element={user ? <OrdersList /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

export default PublicRoutes; 