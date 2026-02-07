import api from './api.js';



export const getMyOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data;
};

export const payOrder = async (id) => {
  const response = await api.post(`/orders/${id}/pay`);
  return response.data;
};

export const addShippingAddress = async (orderId, addressId) => {
  const response = await api.post(`/orders/${orderId}/address`, { addressId });
  return response.data;
};