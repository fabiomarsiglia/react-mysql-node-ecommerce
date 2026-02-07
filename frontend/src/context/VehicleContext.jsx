import { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';



export const VehicleContext = createContext();
export function VehicleProvider({ children }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_VEHICLE);
    if (stored) {
      try {
        setSelectedVehicle(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored vehicle:', error);
        localStorage.removeItem(STORAGE_KEYS.SELECTED_VEHICLE);
      }
    }
  }, []);

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    localStorage.setItem(STORAGE_KEYS.SELECTED_VEHICLE, JSON.stringify(vehicle));
  };

  const clearVehicle = () => {
    setSelectedVehicle(null);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_VEHICLE);
  };

  const value = {
    selectedVehicle,
    selectVehicle,
    clearVehicle,
    hasVehicle: !!selectedVehicle,
  };

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}