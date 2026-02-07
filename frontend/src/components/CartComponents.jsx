import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatters.js';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants.js';
import useCart from '../hooks/useCart.js';



export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
      <img 
        src={item.imageUrl || `https://placehold.co/100x100/e5e7eb/64748b?text=${encodeURIComponent(item.name.substring(0, 10))}`}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
        <p className="text-blue-600 font-semibold">{formatPrice(item.price)}</p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button 
          onClick={() => removeFromCart(item.productId)}
          className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => item.quantity > 1 && updateQuantity(item.productId, item.quantity - 1)}
            className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold min-w-[30px] text-center">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="font-bold text-lg">{formatPrice(item.subtotal)}</p>
      </div>
    </div>
  );
}


export function CartSummary({ total, onCheckout }) {
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const finalTotal = total + shipping;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Riepilogo Ordine</h3>
      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotale</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Spedizione</span>
          <span>{shipping === 0 ? 'GRATIS' : formatPrice(shipping)}</span>
        </div>
        {total < FREE_SHIPPING_THRESHOLD && total > 0 && (
          <p className="text-sm text-blue-600">
            Aggiungi {formatPrice(FREE_SHIPPING_THRESHOLD - total)} per spedizione gratis!
          </p>
        )}
      </div>
      <div className="flex justify-between text-xl font-bold mb-6">
        <span>Totale</span>
        <span className="text-blue-600">{formatPrice(finalTotal)}</span>
      </div>
      <button 
        onClick={onCheckout}
        disabled={total === 0}
        className="btn-primary w-full disabled:opacity-50"
      >
        Procedi al Checkout
      </button>
    </div>
  );
}
