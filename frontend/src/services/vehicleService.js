import api from './api.js';





export const getAllVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const searchByVIN = async (vin) => {
  const response = await api.get('/vehicles/search-vin', { params: { vin } });
  return response.data;
};

export const getVehicleById = async (id) => {
  const vehicles = await getAllVehicles();
  return vehicles.find(v => v.id === parseInt(id));
};

export const getBrands = async (type) => {
  const { data } = await api.get('/vehicles/brands', {
    params: { type }
  });
  return data;
};

export const getModels = async (type, brand) => {
  const { data } = await api.get('/vehicles/models', {
    params: { type, brand }
  });
  return data;
};

export const getVersions = async (type, brand, model) => {
  const { data } = await api.get('/vehicles/versions', {
    params: { type, brand, model }
  });
  return data;
};
