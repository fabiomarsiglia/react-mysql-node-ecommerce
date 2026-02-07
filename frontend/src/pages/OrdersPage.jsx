import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService.js';
import { formatPrice } from '../utils/formatters.js';
import Loader from '../components/common/Loader.jsx';




export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8"><Loader /></div>;



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">I miei ordini</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">Nessun ordine</h2>
          <p className="text-gray-600 mb-6">Non hai ancora effettuato ordini</p>
          <Link to="/prodotti" className="btn-primary inline-block">
            Vai ai prodotti
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Ordine #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-blue-600">
                    {formatPrice(order.totalPrice || order.total)}
                  </p>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {order.OrderItems && order.OrderItems.length > 0 && (
                <div className="border-t pt-4">
                  <p className="font-semibold mb-2">Prodotti:</p>
                  <ul className="space-y-2">
                    {order.OrderItems.map((item, idx) => (
                      <li key={idx} className="flex justify-between text-sm">
                        <span>{item.Product?.name || item.name} x{item.quantity}</span>
                        <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
