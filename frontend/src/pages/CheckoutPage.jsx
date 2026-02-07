import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import { CreditCard, Lock, MapPin } from 'lucide-react';
import { getAddresses, createAddress } from '../services/addressService.js';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, checkout, clearCart } = useCart();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '', 
    city: '', 
    zip: '', 
    country: 'Italia',
    type: 'shipping'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '', expiry: '', cvv: '', name: ''
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadSavedAddresses();
  }, []);

  const loadSavedAddresses = async () => {
    try {
      const addresses = await getAddresses();
      setSavedAddresses(addresses);
      
      // auto-select the default address
      const defaultAddr = addresses.find(a => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      if (cardData.number.length !== 16) {
        alert('Numero carta deve essere 16 cifre');
        return;
      }
      if (cardData.cvv.length !== 3) {
        alert('CVV deve essere 3 cifre');
        return;
      }
    }
    
    setProcessing(true);
    
    try {
      let addressIdToUse = selectedAddressId;

      // if there's no address selected create a new one
      if (!addressIdToUse && showNewAddressForm) {
        const addressResponse = await createAddress({
          street: newAddress.street,
          city: newAddress.city,
          zip: newAddress.zip,
          country: newAddress.country,
          type: 'shipping',
          isDefault: savedAddresses.length === 0
        });
        addressIdToUse = addressResponse.id;
      }

      if (!addressIdToUse) {
        alert('Seleziona o crea un indirizzo di spedizione');
        setProcessing(false);
        return;
      }
      // simulate payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await checkout(addressIdToUse);
      
      if (result.success) {
        clearCart();
        alert('Pagamento completato! Ordine confermato.');
        navigate('/ordini');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Errore: ' + (error.message || 'Riprova'));
    } finally {
      setProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Carrello Vuoto</h2>
        <button onClick={() => navigate('/prodotti')} className="btn-primary">
          Vai allo Shop
        </button>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* saved addresses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Indirizzo di Spedizione
              </h2>
              
              {savedAddresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  <p className="text-sm font-medium text-gray-700">Seleziona indirizzo salvato:</p>
                  {savedAddresses.map(addr => (
                    <label 
                      key={addr.id} 
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedAddressId === addr.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => {
                          setSelectedAddressId(addr.id);
                          setShowNewAddressForm(false);
                        }}
                        className="mr-3"
                      />
                      <div className="inline-block">
                        <div className="font-semibold">{addr.street}</div>
                        <div className="text-sm text-gray-600">
                          {addr.zip} {addr.city}, {addr.country}
                        </div>
                        {addr.isDefault && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Predefinito
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowNewAddressForm(!showNewAddressForm);
                  setSelectedAddressId('');
                }}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {showNewAddressForm ? '− Nascondi nuovo indirizzo' : '+ Usa nuovo indirizzo'}
              </button>

              {showNewAddressForm && (
                <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <input 
                    type="text" 
                    placeholder="Via e numero *" 
                    required={showNewAddressForm && !selectedAddressId}
                    value={newAddress.street} 
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} 
                    className="input-field w-full" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Città *" 
                      required={showNewAddressForm && !selectedAddressId}
                      value={newAddress.city} 
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} 
                      className="input-field" 
                    />
                    <input 
                      type="text" 
                      placeholder="CAP *" 
                      required={showNewAddressForm && !selectedAddressId}
                      value={newAddress.zip} 
                      onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})} 
                      className="input-field" 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Paese *" 
                    required={showNewAddressForm && !selectedAddressId}
                    value={newAddress.country} 
                    onChange={(e) => setNewAddress({...newAddress, country: e.target.value})} 
                    className="input-field w-full" 
                  />
                </div>
              )}
            </div>

            {/* payment */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">💳 Metodo di Pagamento</h2>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    className="w-4 h-4" 
                  />
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Carta di Credito/Debito</span>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paypal" 
                    checked={paymentMethod === 'paypal'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    className="w-4 h-4" 
                  />
                  <span className="font-bold text-blue-600">PayPal</span>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="bank" 
                    checked={paymentMethod === 'bank'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    className="w-4 h-4" 
                  />
                  <span className="font-medium">Bonifico Bancario</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Lock className="w-4 h-4" />
                    <span>Pagamento sicuro simulato - sempre successo</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Numero Carta (16 cifre)" 
                    maxLength="16" 
                    required 
                    value={cardData.number} 
                    onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\D/g, '')})} 
                    className="input-field w-full" 
                  />
                  <input 
                    type="text" 
                    placeholder="Nome sulla Carta" 
                    required 
                    value={cardData.name} 
                    onChange={(e) => setCardData({...cardData, name: e.target.value})} 
                    className="input-field w-full" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength="5" 
                      required 
                      value={cardData.expiry} 
                      onChange={(e) => setCardData({...cardData, expiry: e.target.value})} 
                      className="input-field" 
                    />
                    <input 
                      type="text" 
                      placeholder="CVV" 
                      maxLength="3" 
                      required 
                      value={cardData.cvv} 
                      onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})} 
                      className="input-field" 
                    />
                  </div>
                  <p className="text-xs text-gray-500">Pagamento demo: usa 16 cifre qualsiasi</p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-gray-700">Verrai reindirizzato a PayPal</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456</p>
                  <p className="text-sm text-gray-700"><strong>Causale:</strong> Ordine #{Date.now()}</p>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={processing} 
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Elaborazione...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Conferma e Paga €{cart.total.toFixed(2)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* summary */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Riepilogo Ordine</h2>
            
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">€{item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotale</span>
                <span>€{cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Spedizione</span>
                <span className="text-green-600 font-medium">
                  {cart.total >= 100 ? 'GRATIS' : '€9.99'}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Totale</span>
                <span>€{(cart.total >= 100 ? cart.total : cart.total + 9.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
