import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Mobil menüyü aç/kapat
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (isCartOpen) setIsCartOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  // Sepet drawer'ını aç/kapat
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  // Arama drawer'ını aç/kapat
  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isCartOpen) setIsCartOpen(false);
  };

  // Modal yönetimi
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Loading durumu
  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  // Bildirim gösterme yardımcı fonksiyonları
  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showInfo = (message) => {
    toast.info(message);
  };

  const showWarning = (message) => {
    toast.warning(message);
  };

  const value = {
    // Drawer durumları
    isMenuOpen,
    isCartOpen,
    isSearchOpen,
    toggleMenu,
    toggleCart,
    toggleSearch,

    // Modal yönetimi
    activeModal,
    openModal,
    closeModal,

    // Loading durumu
    isLoading,
    showLoading,
    hideLoading,

    // Bildirimler
    showSuccess,
    showError,
    showInfo,
    showWarning
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}; 