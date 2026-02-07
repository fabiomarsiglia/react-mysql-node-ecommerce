import { useState, useEffect } from 'react';
import { Search, Bike, ChevronRight, ShoppingBag, Wrench } from 'lucide-react';
import { searchByVIN } from '../services/vehicleService.js';
import { getCategories } from '../services/categoryService.js';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader.jsx';
import { STORAGE_KEYS } from '../utils/constants.js';



export function VehicleSearchVIN() {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (vin.length < 4) {
      setError('VIN minimo 4 caratteri');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await searchByVIN(vin);
      setResults(data);
      if (!data.length) setError('Nessun veicolo trovato');
    } catch {
      setError('Errore durante la ricerca VIN');
    } finally {
      setLoading(false);
    }
  };

  const selectVehicle = (v) => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_VEHICLE, JSON.stringify(v));
    window.dispatchEvent(new Event('vehicleSelected'));
    navigate(`/prodotti?vehicleId=${v.id}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          className="input-field w-full mb-3"
          placeholder="Inserisci VIN (es. WVWZZZ1JZXW000001)"
        />
        <button className="btn-primary w-full">Cerca Veicolo</button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </form>

      {loading && <Loader text="Ricerca in corso..." />}

      {results.length > 0 && (
        <div className="space-y-2 mt-4">
          {results.map(v => (
            <div
              key={v.id}
              onClick={() => selectVehicle(v)}
              className="border-2 border-gray-200 p-4 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="font-bold text-lg">{v.brand} {v.model}</div>
              <div className="text-sm text-gray-600">
                {v.engine} • {v.powerKW}kW • {v.fuelType}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {v.yearStart} - {v.yearEnd || 'oggi'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function VehicleSearchGuided() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      loadModels(selectedBrand);
    } else {
      setModels([]);
      setVariants([]);
    }
    setSelectedModel('');
    setSelectedVariant(null);
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      loadVariants(selectedBrand, selectedModel);
    } else {
      setVariants([]);
    }
    setSelectedVariant(null);
  }, [selectedModel]);

  const loadBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/vehicles/brands?vehicleType=auto');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadModels = async (brand) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/vehicles/models/${brand}?vehicleType=auto`);
      const data = await response.json();
      const uniqueModels = [...new Set(data.map(v => v.model))];
      setModels(uniqueModels);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVariants = async (brand, model) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/vehicles?vehicleType=auto&brand=${brand}`);
      const data = await response.json();
      const filtered = data.filter(v => v.model === model);
      setVariants(filtered);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!selectedVariant) {
      alert('Seleziona una motorizzazione');
      return;
    }
    
    localStorage.setItem(STORAGE_KEYS.SELECTED_VEHICLE, JSON.stringify(selectedVariant));
    window.dispatchEvent(new Event('vehicleSelected'));
    navigate(`/prodotti?vehicleId=${selectedVariant.id}`);
  };

  return (
    <div className="space-y-6">
      {/* brand */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Marca
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="input-field w-full"
          disabled={loading}
        >
          <option value="">-- Seleziona Marca --</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* model */}
      {selectedBrand && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modello
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="input-field w-full"
            disabled={loading || !models.length}
          >
            <option value="">-- Seleziona Modello --</option>
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
      )}

      {/* engine */}
      {selectedModel && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motorizzazione
          </label>
          <select
            value={selectedVariant?.id || ''}
            onChange={(e) => {
              const variant = variants.find(v => v.id === parseInt(e.target.value));
              setSelectedVariant(variant);
            }}
            className="input-field w-full"
            disabled={loading || !variants.length}
          >
            <option value="">-- Seleziona Motorizzazione --</option>
            {variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.engine} - {variant.powerKW}kW ({variant.yearStart}-{variant.yearEnd || 'oggi'})
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleSearch}
        disabled={!selectedVariant || loading}
        className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
      >
        Trova Ricambi Compatibili
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}



export function BikeSearch() {
  const navigate = useNavigate();
  const [bikeCategories, setBikeCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(data => {
        const onlyBike = data.filter(c => c.name.startsWith('Bike'));
        setBikeCategories(onlyBike);
        console.log('Categorie bici caricate:', onlyBike);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const goToBikeCategoryByName = (categoryName) => {
    console.log('Cercando categoria:', categoryName);
    const category = bikeCategories.find(c => c.name === categoryName);
    
    if (!category) {
      console.error('Categoria bici non trovata:', categoryName);
      console.log('Categorie disponibili:', bikeCategories.map(c => c.name));
      return;
    }

    console.log('Categoria trovata:', category.name, '- ID:', category.id);
    navigate(`/prodotti?categoria=${category.id}`);
  };

  if (loading) {
    return <Loader text="Caricamento categorie..." />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <Bike className="w-16 h-16 text-blue-600 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Cosa cerchi?</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-lg">Biciclette Complete</h3>
        </div>
        <p className="text-gray-700 mb-4">Acquista una bici nuova dal nostro catalogo</p>
        
        <button
          onClick={() => goToBikeCategoryByName('Bike')}
          className="btn-primary w-full"
        >
          Vedi Tutte le Bici
        </button>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <Wrench className="w-6 h-6 text-green-600" />
          <h3 className="font-bold text-lg">Ricambi e Accessori</h3>
        </div>
        <p className="text-gray-700 mb-4">Trova componenti per la tua bici</p>
        
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => goToBikeCategoryByName('Bike Brakes')} className="px-4 py-2 bg-white rounded-lg hover:bg-green-600 hover:text-white transition font-medium border-2 border-green-300">Freni</button>
          <button onClick={() => goToBikeCategoryByName('Bike Chains')} className="px-4 py-2 bg-white rounded-lg hover:bg-green-600 hover:text-white transition font-medium border-2 border-green-300">Catene</button>
          <button onClick={() => goToBikeCategoryByName('Bike Tires')} className="px-4 py-2 bg-white rounded-lg hover:bg-green-600 hover:text-white transition font-medium border-2 border-green-300">Gomme</button>
          <button onClick={() => goToBikeCategoryByName('Bike Saddles')} className="px-4 py-2 bg-white rounded-lg hover:bg-green-600 hover:text-white transition font-medium border-2 border-green-300">Selle</button>
          <button onClick={() => goToBikeCategoryByName('Bike Pedals')} className="px-4 py-2 bg-white rounded-lg hover:bg-green-600 hover:text-white transition font-medium border-2 border-green-300">Pedali</button>
          <button onClick={() => goToBikeCategoryByName('Bike Lights')} className="px-4 py-2 bg-white rounded-lg hover:bg-green-600 hover:text-white transition font-medium border-2 border-green-300">Luci</button>
        </div>
      </div>
    </div>
  );
}
