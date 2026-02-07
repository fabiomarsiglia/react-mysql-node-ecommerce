import api from './api.js';

export const getCategories = async () => {
  const response = await api.get('/category');
  return response.data;
};

export const getCategoryById = async (id) => {
  const categories = await getCategories();
  return categories.find(c => c.id === parseInt(id));
};

export async function getBikeCategories() {
  const res = await api.get('/categories');
  return res.data.filter(c =>
    c.vehicleType === 'bici' || c.name.startsWith('Bike')
  );
}