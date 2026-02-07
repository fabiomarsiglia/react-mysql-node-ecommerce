import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/categoryService.js';
import { getProducts } from '../services/productService.js';
import { Disc, Filter, Settings, Cog, Lightbulb, Wind, Droplet, Truck, ShieldCheck, CreditCard, Clock, Car, Bike, Zap, Search } from 'lucide-react';
import {VehicleSearchVIN, VehicleSearchGuided, BikeSearch} from './SearchComponents.jsx';
import ProductCard from './products/ProductCard.jsx';
import Loader from './common/Loader.jsx';

const iconMap = {
  'Braking System': Disc, 'Filters': Filter, 'Suspension and Arms': Settings,
  'Engine and Belts': Cog, 'Lighting': Lightbulb, 'Exhaust System': Wind,
  'Clutch and Transmission': Settings, 'Cooling System': Droplet
};


export function HeroSection() {
  const [mode, setMode] = useState('auto');
  const [autoTab, setAutoTab] = useState('guided');

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background  */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* header */}
        <div className="text-center mb-10">

          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Ricambi Auto e Bici
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Trova il pezzo giusto per il tuo veicolo. Consegna rapida e qualità garantita.
          </p>
        </div>

        {/* toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('auto')}
            className={`group relative px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
              mode === 'auto'
                ? 'bg-white text-blue-900 shadow-2xl shadow-blue-500/50 scale-105'
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Car className="w-7 h-7" />
              <div className="text-left">
                <div>Automobili</div>
                <div className="text-xs opacity-75 font-normal">50+ modelli</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode('bici')}
            className={`group relative px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
              mode === 'bici'
                ? 'bg-white text-green-900 shadow-2xl shadow-green-500/50 scale-105'
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bike className="w-7 h-7" />
              <div className="text-left">
                <div>Biciclette</div>
                <div className="text-xs opacity-75 font-normal">25+ modelli</div>
              </div>
            </div>
          </button>
        </div>

        {/* auto */}
        {mode === 'auto' && (
          <>
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setAutoTab('guided')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  autoTab === 'guided'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Ricerca Guidata
              </button>
              <button
                onClick={() => setAutoTab('vin')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  autoTab === 'vin'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                }`}
              >
                Ricerca per VIN
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-gray-900 border border-white/20">
              {autoTab === 'guided' ? <VehicleSearchGuided /> : <VehicleSearchVIN />}
            </div>
          </>
        )}

        {/* bike */}
        {mode === 'bici' && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-gray-900 border border-white/20">
            <BikeSearch />
          </div>
        )}
      </div>
    </div>
  );
}



export function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Categorie Prodotti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.name] || Settings;
            return (
              <Link key={cat.id} to={`/prodotti?categoria=${cat.id}`} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-500 transition-all text-center group">
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export  function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts({ limit: 8 }).then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="py-12"><Loader /></div>;
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Prodotti in Evidenza</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

export  function TrustBadges() {
  const badges = [
    { icon: Truck, title: 'Spedizione Gratuita', description: 'Su ordini oltre €100' },
    { icon: ShieldCheck, title: 'Qualità garantita', description: 'Su tutti i prodotti' },
    { icon: CreditCard, title: 'Pagamento Sicuro', description: 'Bonifico' },
    { icon: Clock, title: 'Consegna Rapida', description: '24-48 ore' }
  ];
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="text-center">
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}