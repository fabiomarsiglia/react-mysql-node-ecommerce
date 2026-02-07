import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';



export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Marsiglia Ricambi</h3>
            <p className="text-gray-400 text-sm">
              Il tuo partner di fiducia per ricambi auto di qualità. Spediamo in tutta Italia.
            </p>
          </div>

          {/* links */}
          <div>
            <h4 className="font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">Chi Siamo</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contatti</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Spedizioni</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Resi e Garanzie</Link></li>
            </ul>
          </div>

          {/* customer support */}
          <div>
            <h4 className="font-semibold mb-4">Servizio Clienti</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/profilo" className="hover:text-white transition-colors">Il mio Account</Link></li>
              <li><Link to="/ordini" className="hover:text-white transition-colors">I miei Ordini</Link></li>
            </ul>
          </div>

          {/* contact info */}
          <div>
            <h4 className="font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@marsigliaricambi.it</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+39 049 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Marina di Ginosa - TA,  Italia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Marsiglia Ricambi - Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  );
}