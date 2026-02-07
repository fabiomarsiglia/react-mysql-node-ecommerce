import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import useAuth from './hooks/useAuth.js';
import {
  ProductsPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  OrderConfirmationPage,
  ProfilePage,
  OrdersPage,
  LoginPage,
  RegisterPage,
  AboutPage,
  ContactPage,
  ShippingPage,
  ReturnsPage,
  NotFoundPage,
  HomePage,
  BikePage
} from './pages';

import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx'; 
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import {ProtectedRoute} from './components/AuthComponents.jsx';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="prodotti" element={<ProductsPage />} />
              <Route path="prodotti/:id" element={<ProductDetailPage />} />
              <Route path="bici" element={<BikePage />} />
              <Route path="carrello" element={<CartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="returns" element={<ReturnsPage />} />

              
              <Route path="checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="profilo" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="ordini" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

