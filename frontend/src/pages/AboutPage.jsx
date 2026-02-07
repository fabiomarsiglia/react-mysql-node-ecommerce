import { Award, Users, Target, Heart } from 'lucide-react';



export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Chi Siamo</h1>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>Marsiglia Ricambi</strong> è il tuo partner di fiducia per ricambi auto e bici di qualità. 
          Da anni forniamo componenti originali e aftermarket per soddisfare ogni esigenza di manutenzione e riparazione.
        </p>
        <p className="text-gray-700 leading-relaxed">
          La nostra missione è rendere semplice e veloce la ricerca del ricambio giusto, garantendo 
          prodotti di alta qualità, prezzi competitivi e un servizio clienti sempre disponibile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <Award className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Qualità Garantita</h3>
          <p className="text-gray-700">
            Tutti i nostri prodotti sono certificati e provengono da fornitori autorizzati. 
            Ogni componente è testato per garantire affidabilità e durata nel tempo.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <Users className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Assistenza Dedicata</h3>
          <p className="text-gray-700">
            Il nostro team di esperti è sempre a disposizione per aiutarti a trovare il ricambio 
            perfetto per il tuo veicolo e rispondere a ogni tua domanda.
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <Target className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Vasto Catalogo</h3>
          <p className="text-gray-700">
            Oltre 10.000 prodotti disponibili per auto e biciclette. Dai freni agli oli motore, 
            dalle catene alle gomme: tutto ciò che serve per il tuo veicolo.
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <Heart className="w-12 h-12 text-red-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Passione per i Veicoli</h3>
          <p className="text-gray-700">
            Non vendiamo solo ricambi: condividiamo con te la passione per le auto e le bici. 
            Ogni prodotto è scelto con cura per soddisfare gli appassionati più esigenti.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">I Nostri Valori</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-700">Anni di Esperienza</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50.000+</div>
            <div className="text-gray-700">Clienti Soddisfatti</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10.000+</div>
            <div className="text-gray-700">Prodotti Disponibili</div>
          </div>
        </div>
      </div>
    </div>
  );
}
