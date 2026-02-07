import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { getCategories } from '../../services/categoryService.js';



export default function CategoryBar() {
  const [showAutoMenu, setShowAutoMenu] = useState(false);
  const [showBikeMenu, setShowBikeMenu] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(console.error);
  }, []);
  const autoCategories = categories.filter(cat => !cat.name.startsWith('Bike') && cat.name !== 'Bike');
  const bikeCategories = categories.filter(cat => cat.name.startsWith('Bike') && cat.name !== 'Bike');


  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 py-3">
          <Link to="/" className="font-semibold text-gray-900">
            Home
          </Link>

          {/* auto products menu */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowAutoMenu(true)}
              onMouseLeave={() => setShowAutoMenu(false)}
              className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600"
            >
              Ricambi Auto
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showAutoMenu && (
              <div
                onMouseEnter={() => setShowAutoMenu(true)}
                onMouseLeave={() => setShowAutoMenu(false)}
                className="absolute top-full left-0 mt-1 bg-white border shadow-lg rounded-lg p-4 w-64 z-50"
              >
                <div className="grid gap-2">
                  {autoCategories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/prodotti?categoria=${cat.id}`}
                      className="px-3 py-2 hover:bg-blue-50 rounded text-sm"
                      onClick={() => setShowAutoMenu(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* bike products menu */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowBikeMenu(true)}
              onMouseLeave={() => setShowBikeMenu(false)}
              className="flex items-center gap-1 font-semibold text-gray-900 hover:text-green-600"
            >
              Ricambi Bici
              <ChevronDown className="w-4 h-4" />
            </button>
            {showBikeMenu && (
              <div
                onMouseEnter={() => setShowBikeMenu(true)}
                onMouseLeave={() => setShowBikeMenu(false)}
                className="absolute top-full left-0 mt-1 bg-white border shadow-lg rounded-lg p-4 w-64 z-50"
              >
                <div className="grid gap-2">
                  {bikeCategories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/prodotti?categoria=${cat.id}`}
                      className="px-3 py-2 hover:bg-green-50 rounded text-sm"
                      onClick={() => setShowBikeMenu(false)}
                    >
                      {cat.name.replace('Bike ', '')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
