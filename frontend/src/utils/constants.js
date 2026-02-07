export const API_BASE_URL = 'http://localhost:3000/api';

export const APP_NAME = 'Marsiglia Ricambi';
export const PRODUCTS_PER_PAGE = 12;
export const ORDERS_PER_PAGE = 10;
export const MIN_ORDER_AMOUNT = 0;
export const FREE_SHIPPING_THRESHOLD = 100;
export const LOW_STOCK_THRESHOLD = 10;
export const OUT_OF_STOCK = 0;

export const ORDER_STATUSES = {
  pending: { label: 'In attesa', color: 'yellow' },
  paid: { label: 'Pagato', color: 'blue' },
  shipped: { label: 'Spedito', color: 'purple' },
  completed: { label: 'Completato', color: 'green' },
  cancelled: { label: 'Cancellato', color: 'red' }
};

export const STORAGE_KEYS = {
  TOKEN: 'marsiglia_auth_token',
  USER: 'marsiglia_user',
  SELECTED_VEHICLE: 'marsiglia_selected_vehicle'
};

export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

export const CATEGORY_ICONS = {
  'Braking System': 'disc',
  'Filters': 'filter',
  'Suspension and Arms': 'settings',
  'Engine and Belts': 'cog',
  'Lighting': 'lightbulb',
  'Exhaust System': 'wind',
  'Clutch and Transmission': 'settings-2',
  'Cooling System': 'droplet'
};
