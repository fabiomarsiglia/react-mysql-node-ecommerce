import { useEffect, useState } from 'react';
import { getCategories } from '../../services/categoryService.js';
import { X } from 'lucide-react';



export default function ProductFilters({ filters, onChange, onClear }) {
  const [categories, setCategories] = useState([]);
  const [brands] = useState(['Brembo', 'Bosch', 'Mann-Filter', 'Dayco', 'Monroe', 'LuK', 'Philips', 'Walker', 'Gates']);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const hasActiveFilters = filters.categoryId || filters.brand || filters.minPrice || filters.maxPrice;

  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filtri</h3>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            <X className="w-4 h-4" />
            Cancella tutti
          </button>
        )}
      </div>

      {/* category */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categoria</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.categoryId === cat.id}
                onChange={() => onChange({ categoryId: cat.id })}
                className="w-4 h-4"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* brand */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Marca</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand === brand}
                onChange={() => onChange({ brand: filters.brand === brand ? '' : brand })}
                className="w-4 h-4"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* price ranget */}
      <div>
        <h4 className="font-medium mb-3">Prezzo</h4>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Min €"
            value={filters.minPrice || ''}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="input-field text-sm"
          />
          <input
            type="number"
            placeholder="Max €"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="input-field text-sm"
          />
        </div>
      </div>
    </div>
  );
}
