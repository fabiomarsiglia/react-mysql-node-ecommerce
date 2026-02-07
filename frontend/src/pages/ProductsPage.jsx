import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories } from '../services/categoryService.js';
import ProductCard from '../components/products/ProductCard.jsx';
import Loader from '../components/common/Loader.jsx';
import { Filter, X, Package, Car } from 'lucide-react';
import { STORAGE_KEYS } from '../utils/constants.js';



export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const vehicleId = searchParams.get('vehicleId');
  const categoriaParam = searchParams.get('categoria');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  useEffect(() => {
    getCategories().then(setCategories);
    
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_VEHICLE);
    if (stored) {
      try {
        setSelectedVehicle(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing vehicle:', e);
      }
    }
  }, []);
  useEffect(() => {
    if (categories.length > 0) {
      loadProducts();
    }
  }, [vehicleId, categoriaParam, selectedBrand, minPrice, maxPrice, categories]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let data = [];
      
      if (vehicleId) {
        console.log('Carico prodotti per veicolo ID:', vehicleId);
        const response = await fetch(`http://localhost:3000/api/products/filterbyvehicle/${vehicleId}`);
        data = await response.json();
        console.log('Ricevuti', data.length, 'prodotti compatibili');
      } else {
        console.log('Carico catalogo completo');
        const response = await fetch(`http://localhost:3000/api/products?limit=500`);
        const result = await response.json();
        data = Array.isArray(result) ? result : (result.products || []);
        console.log('Ricevuti', data.length, 'prodotti totali');
      }
      let filtered = Array.isArray(data) ? data : [];

      // filters
      if (categoriaParam) {
        const categoryId = parseInt(categoriaParam);
        console.log('Filtro categoria ID:', categoryId);
        
        if (!isNaN(categoryId)) {
          filtered = filtered.filter(p => p.categoryId === categoryId);
          console.log('   Risultato:', filtered.length, 'prodotti');
        }
      }
      if (selectedBrand) {
        filtered = filtered.filter(p => p.brand === selectedBrand);
        console.log('Filtro marca:', selectedBrand, '-', filtered.length, 'prodotti');
      }
      if (minPrice) {
        filtered = filtered.filter(p => Number(p.price) >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter(p => Number(p.price) <= Number(maxPrice));
      }

      console.log('Totale finale:', filtered.length, 'prodotti');
      setProducts(filtered);
    } catch (e) {
      console.error('Errore:', e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  const clearFilters = () => {
    setSelectedBrand('');
    setMinPrice('');
    setMaxPrice('');
    localStorage.removeItem(STORAGE_KEYS.SELECTED_VEHICLE);
    setSelectedVehicle(null);
    setSearchParams({});
  };
  const clearVehicle = () => {
    localStorage.removeItem(STORAGE_KEYS.SELECTED_VEHICLE);
    setSelectedVehicle(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('vehicleId');
    setSearchParams(newParams);
  };
  const setCategory = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('categoria', categoryId.toString());
    setSearchParams(newParams);
  };
  const getCurrentCategoryName = () => {
    if (!categoriaParam) return 'Catalogo Prodotti';
    const categoryId = parseInt(categoriaParam);
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Catalogo Prodotti';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* vehicle banner */}
      {selectedVehicle && vehicleId && (
        <div className="bg-blue-600 text-white rounded-lg p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-6 h-6" />
              <div>
                <div className="text-sm font-semibold">Veicolo selezionato:</div>
                <div className="text-lg">
                  {selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.engine}
                  {selectedVehicle.powerKW && ` - ${selectedVehicle.powerKW}kW`}
                  {selectedVehicle.yearStart && ` (${selectedVehicle.yearStart}${selectedVehicle.yearEnd ? `-${selectedVehicle.yearEnd}` : '+'})`}
                </div>
              </div>
            </div>
            <button
              onClick={clearVehicle}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Rimuovi veicolo
            </button>
          </div>
        </div>
      )}

      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {vehicleId ? 'Prodotti Compatibili' : getCurrentCategoryName()}
        </h1>
        {(categoriaParam || selectedBrand || vehicleId) && (
          <button onClick={clearFilters} className="text-blue-600 hover:underline flex items-center gap-1">
            <X className="w-4 h-4" /> Rimuovi tutti i filtri
          </button>
        )}
      </div>

      <div className="flex gap-8">
        
        {/* sidebar */}
        <aside className="w-72 flex-shrink-0">
          <div className="bg-white p-5 rounded-xl shadow border sticky top-24">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" /> Filtri
            </h2>

            {/* categories */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="font-semibold mb-3">Categoria</h3>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {categories.map(c => {
                  const isActive = categoriaParam && parseInt(categoriaParam) === c.id;
                  
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* brands */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="font-semibold mb-3">🏷️ Marca</h3>
              <div className="space-y-1">
                {['Bosch','Brembo','Valeo','Continental','Shimano','SRAM'].map(b => (
                  <label key={b} className="flex items-center gap-2 text-sm p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="w-4 h-4"
                    />
                    {b}
                  </label>
                ))}
              </div>
              {selectedBrand && (
                <button 
                  onClick={() => setSelectedBrand('')}
                  className="text-xs text-blue-600 hover:underline mt-2"
                >
                  ✕ Rimuovi filtro marca
                </button>
              )}
            </div>

            {/* price */}
            <div>
              <h3 className="font-semibold mb-3">💰 Prezzo</h3>
              <input
                type="number"
                placeholder="Min €"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="input-field mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Max €"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>
        </aside>

        {/* product list */}
        <main className="flex-1">
          {!loading && (
            <div className="mb-4 flex items-center gap-2 text-gray-700">
              <Package className="w-5 h-5" />
              <span><strong>{products.length}</strong> prodotti trovati</span>
              {vehicleId && <span className="text-blue-600">• Compatibili con il tuo veicolo</span>}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Nessun prodotto trovato</h3>
              <p className="text-gray-500 mb-6">Prova a modificare i filtri o rimuovili tutti</p>
              <button onClick={clearFilters} className="btn-primary">
                Rimuovi tutti i filtri
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
