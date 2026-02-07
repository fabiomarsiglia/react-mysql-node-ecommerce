import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, PackageCheck, Truck } from 'lucide-react';
import { useState } from 'react';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contattaci</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* contact info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">I Nostri Contatti</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Sede</h3>
                <p className="text-gray-700">Via Marina di Ginosa, 42</p>
                <p className="text-gray-700">74013 Marina di Ginosa (TA), Italia</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefono</h3>
                <p className="text-gray-700">+39 049 123 4567</p>
                <p className="text-sm text-gray-500">Lun-Ven 9:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-700">info@marsigliaricambi.it</p>
                <p className="text-gray-700">supporto@marsigliaricambi.it</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Orari di Apertura</h3>
                <p className="text-gray-700">Lun - Ven: 9:00 - 18:00</p>
                <p className="text-gray-700">Sab: 9:00 - 13:00</p>
                <p className="text-gray-700">Dom: Chiuso</p>
              </div>
            </div>
          </div>
        </div>

        {/* why us box */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Perché Sceglierci</h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-900">Siamo Qui per Te!</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Per ogni esigenza, dubbio o richiesta speciale, il nostro team è sempre pronto ad assisterti. 
              Contattaci attraverso uno dei nostri canali di comunicazione e riceverai supporto professionale e personalizzato.
            </p>

            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 rounded-full p-2">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Assistenza Dedicata</h4>
                  <p className="text-sm text-gray-600">Consulenza personalizzata per ogni tuo acquisto</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-600 rounded-full p-2">
                  <PackageCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Prodotti Garantiti</h4>
                  <p className="text-sm text-gray-600">Solo ricambi originali e di qualità certificata</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-600 rounded-full p-2">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Spedizione Rapida</h4>
                  <p className="text-sm text-gray-600">Consegna in 24-48 ore su tutto il territorio nazionale</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-300">
              <p className="text-center text-sm text-blue-800 font-medium">
                📞 Chiamaci ora o scrivici un'email per ricevere assistenza immediata!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* map placeholder*/}
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Vieni a trovarci!</p>
          <p className="text-sm text-gray-500">Via Marina di Ginosa, 42 - Marina di Ginosa (TA)</p>
        </div>
      </div>
    </div>
  );
}
