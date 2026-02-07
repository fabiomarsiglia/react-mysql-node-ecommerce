import { Link } from 'react-router-dom';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../services/api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    lowStock: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/admin/orders')
      ]);
      
      const products = productsRes.data.products || productsRes.data || [];
      const orders = ordersRes.data || [];
      
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        lowStock: products.filter(p => p.stock < 10).length
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Prodotti Totali</p>
              <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
            </div>
            <Package className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ordini Totali</p>
              <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
            </div>
            <ShoppingCart className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ordini in Attesa</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingOrders}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Prodotti Scarsi</p>
              <p className="text-3xl font-bold mt-2">{stats.lowStock}</p>
            </div>
            <Users className="w-12 h-12 text-red-600" />
          </div>
        </div>
      </div>

      {/* action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Gestione Prodotti</h2>
              <p className="text-gray-600">Crea, modifica ed elimina prodotti</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Gestione Ordini</h2>
              <p className="text-gray-600">Visualizza e gestisci gli ordini</p>
            </div>
          </div>
        </Link>
      </div>

      {/* back to website */}
      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Torna al Sito
        </Link>
      </div>
    </div>
  );
}
