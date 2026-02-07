import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package, Tag } from 'lucide-react';
import useCart from '../hooks/useCart.js';
import api from '../services/api.js';



export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    loadProduct();
  }, [id]);
  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Prodotto non trovato</h2>
          <Link to="/prodotti" className="btn-primary">
            Torna ai Prodotti
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/prodotti" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        Torna ai Prodotti
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* image */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center p-12">
          <Package className="w-48 h-48 text-gray-400" />
        </div>
        {/* info */}
        <div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">{product.category?.name}</span>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{product.brand}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="text-4xl font-bold text-blue-600">€{product.price}</div>
          </div>

          {/* details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-500" />
              <span className="text-sm">SKU: <strong>{product.sku}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-500" />
              <span className="text-sm">OEM: <strong>{product.oemCode}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              <span className="text-sm">
                Disponibilità: 
                <strong className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? ` ${product.stock} disponibili` : ' Non disponibile'}
                </strong>
              </span>
            </div>
          </div>
          {product.description && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Descrizione</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {/* add to cart */}
          {product.stock > 0 && (
            <div className="flex gap-4 items-center">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Aggiungi al Carrello
              </button>
            </div>
          )}
        </div>
      </div>

      {/* compatibility */}
      {product.compatibleVehicles && product.compatibleVehicles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Compatibilità</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.compatibleVehicles.map((vehicle, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded border">
                  <div className="font-semibold">{vehicle.brand} {vehicle.model}</div>
                  <div className="text-sm text-gray-600">
                    {vehicle.engine} - {vehicle.yearStart}-{vehicle.yearEnd || 'oggi'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}