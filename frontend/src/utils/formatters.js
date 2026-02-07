export const formatPrice = (price) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatStockStatus = (stock) => {
  if (stock <= 0) {
    return { label: 'Esaurito', color: 'red' };
  } else if (stock < 10) {
    return { label: `Solo ${stock} disponibili`, color: 'yellow' };
  } else {
    return { label: 'Disponibile', color: 'green' };
  }
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatVehicleName = (vehicle) => {
  if (!vehicle) return '';
  return `${vehicle.brand} ${vehicle.model} ${vehicle.engine} (${vehicle.yearStart}${vehicle.yearEnd ? `-${vehicle.yearEnd}` : '+'})`;
};

export const formatEngineInfo = (vehicle) => {
  if (!vehicle) return '';
  return `${vehicle.engine} - ${vehicle.powerKW}kW - ${vehicle.fuelType}`;
};

export const cleanVIN = (vin) => {
  if (!vin) return '';
  return vin.toUpperCase().replace(/[^A-Z0-9]/g, '');
};