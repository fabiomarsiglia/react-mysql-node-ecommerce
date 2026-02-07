import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import { getAddresses, createAddress, deleteAddress } from '../services/addressService.js';
import { User, MapPin, Mail, Plus, Trash2 } from 'lucide-react';



export default function ProfilePage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    zip: '',
    country: 'Italia'
  });

  useEffect(() => {
    loadAddresses();
  }, []);
  const loadAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await createAddress(newAddress);
      setNewAddress({ street: '', city: '', zip: '', country: 'Italia'});
      setShowAddForm(false);
      loadAddresses();
    } catch (error) {
      console.error('Error creating address:', error);
      alert('Errore creazione indirizzo');
    }
  };
  const handleDeleteAddress = async (id) => {
    if (!confirm('Sei sicuro di voler eliminare questo indirizzo?')) return;
    
    try {
      await deleteAddress(id);
      loadAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Errore eliminazione indirizzo');
    }
  };



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Il mio profilo</h1>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4">Informazioni account</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Nome</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* my addresses */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">I miei indirizzi</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Aggiungi indirizzo
          </button>
        </div>

        {/* new address form */}
        {showAddForm && (
          <form onSubmit={handleAddAddress} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Via e numero civico"
                value={newAddress.street}
                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Città"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="CAP"
                value={newAddress.zipCode}
                onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Paese"
                value={newAddress.country}
                onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn-primary">Salva</button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Annulla
              </button>
            </div>
          </form>
        )}

        {/* addresses List */}
        {addresses.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Nessun indirizzo salvato</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold">{address.street}</p>
                    <p className="text-sm text-gray-600">
                      {address.zipCode} {address.city}, {address.country}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}