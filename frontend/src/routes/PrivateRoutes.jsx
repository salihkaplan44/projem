import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Admin Pages
import Dashboard from '../pages/Admin/Dashboard';
import ManageProducts from '../pages/Admin/ManageProducts';
import ManageCategories from '../pages/Admin/ManageCategories';
import OrderMessages from '../pages/Admin/OrderMessages';

const PrivateRoutes = () => {
  const { user } = useAuth();

  // Admin değilse ana sayfaya yönlendir
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<ManageProducts />} />
      <Route path="/categories" element={<ManageCategories />} />
      <Route path="/messages" element={<OrderMessages />} />
    </Routes>
  );
};

export default PrivateRoutes; 