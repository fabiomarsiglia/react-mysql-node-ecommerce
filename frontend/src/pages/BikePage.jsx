import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Bike } from 'lucide-react';



export default function BiciPage() {
  const [searchParams] = useSearchParams();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const brand = searchParams.get('brand');

  useEffect(() => {
    loadBikes();
  }, [brand]);

  const loadBikes = async () => {
    setLoading(true);
    try {
      const url = brand 
        ? `http://localhost:3000/api/vehicles?vehicleType=bici&brand=${brand}`
        : 'http://localhost:3000/api/vehicles?vehicleType=bici';
      
      const response = await fetch(url);
      const data = await response.json();
      setBikes(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Caricamento...</div>;

  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {brand ? `Biciclette ${brand}` : 'Tutte le Biciclette'}
      </h1>

      {bikes.length === 0 ? (
        <div className="text-center py-12">
          <p>Nessuna bici disponibile</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map(bike => (
            <div key={bike.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bike className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg">{bike.brand}</h3>
                  <p className="text-gray-600">{bike.model}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Tipo:</strong> {bike.engine}</p>
                {bike.fuelType && <p><strong>Motore:</strong> {bike.fuelType} ({bike.powerKW} kW)</p>}
                <p><strong>Anno:</strong> {bike.yearStart} {bike.yearEnd ? `- ${bike.yearEnd}` : '- oggi'}</p>
              </div>

              <Link
                to={`/prodotti?brand=${bike.brand}`}
                className="btn-primary w-full mt-4"
              >
                Vedi Ricambi
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
