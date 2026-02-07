import { useState, useEffect } from 'react';
import api from '../../services/api.js';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'In Attesa',
  paid: 'Pagato',
  shipped: 'Spedito',
  completed: 'Completato',
  cancelled: 'Annullato'
};



export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      alert('Stato aggiornato!');
      loadOrders();
    } catch (error) {
      console.error('Error:', error);
      alert('Errore: ' + (error.response?.data?.message || error.message));
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestione Ordini</h1>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['pending', 'paid', 'shipped', 'completed'].map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1">{statusLabels[status]}</div>
              <div className="text-2xl font-bold">{count}</div>
            </div>
          );
        })}
      </div>

      {/* tab */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Totale</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cambia Stato</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">Caricamento...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">Nessun ordine</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{order.user?.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{order.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('it-IT')}
                  </td>
                  <td className="px-6 py-4 font-medium">€{order.total}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className={`px-3 py-1.5 text-sm font-semibold rounded border-2 cursor-pointer ${statusColors[order.status]}`}
                    >
                      <option value="pending">In Attesa</option>
                      <option value="paid">Pagato</option>
                      <option value="shipped">Spedito</option>
                      <option value="completed">Completato</option>
                      <option value="cancelled">Annullato</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
