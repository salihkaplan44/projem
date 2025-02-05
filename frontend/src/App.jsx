import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home/HomeMain';
import CategoryList from './pages/Categories/CategoryList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import CartPage from './pages/Cart/CartPage';
import ProfilePage from './pages/Profile/ProfilePage';
import OrdersList from './pages/Orders/OrdersList';
import Dashboard from './pages/Admin/Dashboard';
import ManageProducts from './pages/Admin/ManageProducts';
import ManageCategories from './pages/Admin/ManageCategories';
import OrderMessages from './pages/Admin/OrderMessages';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <CartProvider>
            <FavoritesProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/:categoryId" element={<CategoryList />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Protected Routes */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/orders" element={<OrdersList />} />

                    {/* Admin Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/products" element={<ManageProducts />} />
                    <Route path="/dashboard/categories" element={<ManageCategories />} />
                    <Route path="/dashboard/messages" element={<OrderMessages />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App; 