import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useCart from '../hooks/useCart.js';
import { CartItem, CartSummary } from '../components/CartComponents.jsx'; 
import Loader from '../components/common/Loader.jsx';




export default function CartPage() {
  const { user } = useAuth();
  const { cart, loading } = useCart();
  const navigate = useNavigate();


  if (!user) {
    navigate('/login');
    return null;
  }
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Loader />
      </div>
    );
  }
  const handleCheckout = () => {
    navigate('/checkout');
  };

  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrello</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Il tuo carrello è vuoto</h2>
          <p className="text-gray-600 mb-6">Aggiungi prodotti per iniziare</p>
          <button 
            onClick={() => navigate('/prodotti')}
            className="btn-primary"
          >
            Vai ai prodotti
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>

          <div>
            <CartSummary total={cart.total} onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  );
}