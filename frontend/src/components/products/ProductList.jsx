import ProductCard from './ProductCard.jsx';
import { ShoppingCart } from 'lucide-react';

export default function ProductList({ products }) {
  return (
    <div className="space-y-4">
      {products.map(p => (
        <div
          key={p.id}
          className="bg-white border rounded-xl p-4 flex gap-6 hover:shadow"
        >
          <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">IMG</span>
          </div>

          <div className="flex-1">
            <p className="text-sm text-blue-600">{p.category?.name}</p>
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.brand}</p>
            <p className="text-sm mt-2">{p.description}</p>
          </div>

          <div className="text-right flex flex-col justify-between">
            <p className="text-2xl font-bold text-blue-600">
              €{p.price}
            </p>
            <button className="btn-primary flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Aggiungi
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
