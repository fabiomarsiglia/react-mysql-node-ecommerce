import { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';
import api from '../services/api.js';



export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      loadCart();
    } else {
      setCart({ items: [], total: 0, count: 0 });
      setLoading(false);
    }
  }, []);

  const loadCart = async () => {
    try {
      const response = await api.get('/cart');
      const items = response.data.items || [];

      const total = items.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0);
      const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCart({ items, total, count });
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart({ items: [], total: 0, count: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart/add', { productId, quantity });
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Add to cart error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Errore aggiunta al carrello' 
      };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put('/cart/update', { productId, quantity });
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Update quantity error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Errore aggiornamento quantità' 
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Remove from cart error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Errore rimozione prodotto' 
      };
    }
  };

  const checkout = async (shippingAddressId) => {
    try {
      const response = await api.post('/cart/checkout', { shippingAddressId });
      setCart({ items: [], total: 0, count: 0 });
      return { success: true, orderId: response.data.orderId };
    } catch (error) {
      console.error('Checkout error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Errore durante il checkout' 
      };
    }
  };
  const clearCart = () => {
    setCart({ items: [], total: 0, count: 0 });
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        loading, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        checkout,
        clearCart,
        refreshCart: loadCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
