import api from './api.js';




export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId, params = {}) => {
  const response = await api.get('/products', { params: { ...params, categoryId } });
  return response.data;
};

export const getProductsByBrand = async (brand, params = {}) => {
  const response = await api.get('/products', { params: { ...params, brand } });
  return response.data;
};

export const getProductsByVehicle = async (vehicleId) => {
  const response = await api.get(`/products/filterbyvehicle/${vehicleId}`);
  return response.data;
};

export const searchProducts = async (searchTerm) => {
  const response = await api.get('/products', { params: { search: searchTerm } });
  return response.data;
};