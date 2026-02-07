import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Tag } from 'lucide-react';
import useCart from '../../hooks/useCart.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  return (
    <Link
      to={`/prodotti/${product.id}`}
      className="flex gap-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300 overflow-hidden group"
    >
      {/* image */}
      <div className="relative bg-gray-100 w-32 h-32 flex-shrink-0 flex items-center justify-center">
        <Package className="w-16 h-16 text-gray-400 group-hover:scale-110 transition-transform" />
        
        {/* badge for stock */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
          product.stock > 10 
            ? 'bg-green-500 text-white' 
            : product.stock > 0 
            ? 'bg-yellow-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {product.stock > 0 ? `${product.stock}` : '0'}
        </div>
      </div>

      {/* prod info */}
      <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
        <div>
          {/* category */}
          <div className="text-xs text-blue-600 font-semibold mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {product.category?.name || 'Prodotto'}
          </div>
          
          {/* prdo name */}
          <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
            {product.name}
          </h3>
          
          {/* brand */}
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          
          {/* sku and oem */}
          <div className="flex gap-4 text-xs text-gray-500 mb-3">
            <span>SKU: <span className="font-mono">{product.sku}</span></span>
            {product.oemCode && <span>OEM: <span className="font-mono">{product.oemCode}</span></span>}
          </div>
        </div>

        {/* price */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-blue-600">
            €{Number(product.price).toFixed(2)}
          </div>

          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
            >
              <ShoppingCart className="w-5 h-5" />
              Aggiungi
            </button>
          ) : (
            <div className="px-6 py-2 bg-gray-200 text-gray-500 rounded-lg font-semibold">
              Non disponibile
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
