import { RotateCcw, ShieldCheck, Package, Clock, AlertCircle } from 'lucide-react';



export default function ReturnsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Resi e Garanzie</h1>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <RotateCcw className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold">Diritto di Recesso - 14 Giorni</h2>
        </div>
        <p className="text-lg text-gray-700">
          Hai <strong>14 giorni</strong> di tempo dalla ricezione del prodotto per esercitare il diritto 
          di recesso senza dover fornire alcuna motivazione.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-bold">Come Effettuare un Reso</h3>
        </div>
        <ol className="space-y-4 text-gray-700 list-decimal list-inside">
          <li>
            <strong>Contattaci</strong> entro 14 giorni dalla ricezione via email a 
            <span className="text-blue-600"> resi@marsigliaricambi.it</span>
          </li>
          <li>
            <strong>Comunica</strong> il numero d'ordine e il motivo del reso (facoltativo)
          </li>
          <li>
            <strong>Ricevi</strong> l'etichetta di reso via email con le istruzioni
          </li>
          <li>
            <strong>Imballa</strong> il prodotto nella confezione originale
          </li>
          <li>
            <strong>Spedisci</strong> il pacco utilizzando l'etichetta fornita
          </li>
          <li>
            <strong>Ricevi</strong> il rimborso entro 14 giorni dalla ricezione del reso
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-yellow-600" />
          <h3 className="text-xl font-bold">Condizioni per il Reso</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              ✓
            </div>
            <p className="text-gray-700">
              <strong>Prodotto integro:</strong> Il prodotto deve essere restituito nelle stesse 
              condizioni in cui è stato ricevuto
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              ✓
            </div>
            <p className="text-gray-700">
              <strong>Confezione originale:</strong> Includi tutti gli accessori e la documentazione
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              ✓
            </div>
            <p className="text-gray-700">
              <strong>Non utilizzato:</strong> Il prodotto non deve essere stato montato o utilizzato
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              ✗
            </div>
            <p className="text-gray-700">
              <strong>Prodotti su misura:</strong> Non è possibile restituire prodotti realizzati 
              su misura o personalizzati
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-purple-600" />
          <h3 className="text-xl font-bold">Garanzia Prodotti</h3>
        </div>
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Garanzia Legale - 24 Mesi
            </h4>
            <p>
              Tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi 
              ai sensi del Codice del Consumo (D.Lgs. 206/2005).
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cosa Copre la Garanzia:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Difetti di conformità presenti al momento della consegna</li>
              <li>Difetti di fabbricazione dei materiali</li>
              <li>Malfunzionamenti non dovuti a uso improprio</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cosa NON Copre la Garanzia:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Danni da installazione errata</li>
              <li>Usura normale del prodotto</li>
              <li>Danni causati da incidenti o uso improprio</li>
              <li>Modifiche non autorizzate al prodotto</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold mb-3 text-lg">Hai Bisogno di Aiuto?</h4>
        <p className="text-gray-700 mb-4">
          Per qualsiasi domanda su resi o garanzie, contatta il nostro servizio clienti:
        </p>
        <div className="space-y-2 text-gray-700">
          <p>📧 Email: <span className="text-blue-600 font-semibold">resi@marsigliaricambi.it</span></p>
          <p>📞 Telefono: <span className="font-semibold">+39 049 123 4567</span></p>
          <p>🕐 Orari: Lun-Ven 9:00-18:00</p>
        </div>
      </div>
    </div>
  );
}
