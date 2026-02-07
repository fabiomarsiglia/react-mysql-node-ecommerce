import { Truck, Package, Clock, MapPin, Euro, CheckCircle } from 'lucide-react';



export default function ShippingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Spedizioni e Consegne</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Truck className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold">Spedizione Gratuita</h2>
        </div>
        <p className="text-lg text-gray-700">
          Per ordini superiori a <strong>€100</strong> la spedizione è completamente gratuita in tutta Italia!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold">Tempi di Consegna</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>Italia:</strong> 2-4 giorni lavorativi</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>Grandi città:</strong> 24-48 ore</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>Isole:</strong> 3-5 giorni lavorativi</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Euro className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold">Costi di Spedizione</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span><strong>Standard:</strong> €9.99</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span><strong>Ordini {'>'} €100:</strong> GRATIS</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span><strong>Express (24h):</strong> €19.99</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-purple-600" />
          <h3 className="text-xl font-bold">Modalità di Spedizione</h3>
        </div>
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">📦 Standard</h4>
            <p>Corriere espresso nazionale. Consegna in 2-4 giorni lavorativi. Tracking incluso.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">⚡ Express</h4>
            <p>Consegna garantita entro 24 ore per le principali città italiane (ordini entro le 12:00).</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🏪 Ritiro in Sede</h4>
            <p>Ritiro gratuito presso la nostra sede a Marina di Ginosa (TA). Disponibile entro 24 ore dall'ordine.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-8 h-8 text-red-600" />
          <h3 className="text-xl font-bold">Tracciamento Spedizione</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Riceverai un'email con il codice di tracking non appena il tuo ordine verrà spedito. 
          Potrai seguire la spedizione in tempo reale dal sito del corriere.
        </p>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Nota:</strong> I tempi di consegna sono indicativi e potrebbero variare in base 
            alla disponibilità del corriere e a condizioni meteorologiche eccezionali.
          </p>
        </div>
      </div>
    </div>
  );
}
