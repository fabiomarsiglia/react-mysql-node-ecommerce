import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, Search } from 'lucide-react';
import { getProducts } from '../../services/productService.js';
import { getCategories } from '../../services/categoryService.js';
import api from '../../services/api.js';


export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    stock: '',
    sku: '',
    oemCode: '',
    categoryId: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, [selectedCategory, searchTerm]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts({ categoryId: selectedCategory, search: searchTerm }),
        getCategories()
      ]);
      
      setProducts(Array.isArray(productsData) ? productsData : productsData.products || []);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        sku: product.sku,
        oemCode: product.oemCode,
        categoryId: product.categoryId,
        description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        brand: '',
        price: '',
        stock: '',
        sku: '',
        oemCode: '',
        categoryId: '',
        description: ''
      });
    }
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Update
        await api.put(`/admin/${editingProduct.id}`, formData);
        alert('Prodotto aggiornato!');
      } else {
        // Create
        await api.post('/admin', formData);
        alert('Prodotto creato!');
      }
      
      handleCloseModal();
      loadData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Errore: ' + (error.response?.data?.message || error.message));
    }
  };


  const handleDelete = async (id, name) => {
    if (!window.confirm(`Eliminare "${name}"?`)) return;
    
    try {
      await api.delete(`/products/${id}`);
      alert('Prodotto eliminato!');
      loadData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Errore: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRestock = async (id, name) => {
    const quantity = prompt(`Quantità da aggiungere a "${name}":`);
    if (!quantity || isNaN(quantity)) return;
    
    try {
      await api.patch(`/admin/${id}/restock`, { quantity: parseInt(quantity) });
      alert('Ricaricato!');
      loadData();
    } catch (error) {
      console.error('Error restocking:', error);
      alert('Errore: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuovo Prodotto
        </button>
      </div>

      {/* fikters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">Tutte le categorie</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* tab */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prodotto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU/OEM</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prezzo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Azioni</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">Caricamento...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">Nessun prodotto trovato</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>{product.sku}</div>
                    <div className="text-gray-500">{product.oemCode}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-medium">€{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleRestock(product.id, product.name)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Ricarica stock"
                    >
                      <Package className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Modifica"
                    >
                      <Edit2 className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-600 hover:text-red-900"
                      title="Elimina"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Marca *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Codice OEM</label>
                  <input
                    type="text"
                    value={formData.oemCode}
                    onChange={(e) => setFormData({...formData, oemCode: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Prezzo (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Stock *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Categoria *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    className="input-field w-full"
                  >
                    <option value="">-- Seleziona --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descrizione</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Annulla
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Aggiorna' : 'Crea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}