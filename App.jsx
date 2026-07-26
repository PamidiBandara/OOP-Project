import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context Providers
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

// Layout Components
import ClientLayout from './components/layout/ClientLayout'
import AdminLayout from './components/layout/AdminLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import BooksPage from './pages/public/BooksPage'
import StationeryPage from './pages/public/StationeryPage'
import StudyKitsPage from './pages/public/StudyKitsPage'
import AnnouncementsPage from './pages/public/AnnouncementsPage'
import ProductDetailsPage from './pages/public/ProductDetailsPage'
import ContactPage from './pages/public/ContactPage'
import AboutPage from './pages/public/AboutPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import NotFoundPage from './pages/public/NotFoundPage'

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard'
import CustomerProfile from './pages/customer/Profile'
import MyOrders from './pages/customer/MyOrders'
import OrderDetails from './pages/customer/OrderDetails'
import Wishlist from './pages/customer/Wishlist'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import Notifications from './pages/customer/Notifications'
import DeliveryAddresses from './pages/customer/DeliveryAddresses'
import RecentlyViewed from './pages/customer/RecentlyViewed'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ManageCategories from './pages/admin/ManageCategories'
import ManageOrders from './pages/admin/ManageOrders'
import ManageCustomers from './pages/admin/ManageCustomers'

// Protected Routes
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              <Route element={<ClientLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/stationery" element={<StationeryPage />} />
                <Route path="/study-kits" element={<StudyKitsPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Customer Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <CustomerProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <OrderDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/addresses"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <DeliveryAddresses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recently-viewed"
                  element={
                    <ProtectedRoute requiredRole="CUSTOMER">
                      <RecentlyViewed />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute requiredRole="ADMIN"><AdminLayout /></ProtectedRoute>}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/categories" element={<ManageCategories />} />
                <Route path="/admin/orders" element={<ManageOrders />} />
                <Route path="/admin/customers" element={<ManageCustomers />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
