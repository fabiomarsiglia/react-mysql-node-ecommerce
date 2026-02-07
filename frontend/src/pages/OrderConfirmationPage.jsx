import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { getOrderById } from '../services/orderService.js';
import Loader from '../components/common/Loader.jsx';





export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);
  if (loading) return <div className="py-12"><Loader /></div>;


  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
      
      <h1 className="text-3xl font-bold mb-4">Ordine Confermato!</h1>
      <p className="text-lg text-gray-600 mb-2">
        Il tuo ordine è stato ricevuto con successo
      </p>
      <p className="text-gray-500 mb-8">
        Numero ordine: <strong>#{order?.id}</strong>
      </p>

      <div className="card text-left mb-8">
        <h2 className="text-xl font-bold mb-4">Dettagli Ordine</h2>
        <div className="space-y-3">
          {order?.items?.map((item) => (
            <div key={item.productId} className="flex justify-between border-b pb-2">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-semibold">€{item.subtotal.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-lg font-bold pt-2">
            <span>Totale</span>
            <span className="text-blue-600">€{order?.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Link to="/ordini" className="btn-primary">
          Vedi i Miei Ordini
        </Link>
        <Link to="/" className="btn-secondary">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
