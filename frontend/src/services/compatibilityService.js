import api from './api.js';

export const createCompatibility = async (productId, vehicleId) => {
  const response = await api.post('/compatibilities', { productId, vehicleId });
  return response.data;
};
