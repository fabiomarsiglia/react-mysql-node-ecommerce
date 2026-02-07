import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import CategoryBar from './CategoryBar.jsx';
import Footer from './Footer.jsx';
import { STORAGE_KEYS } from '../../utils/constants.js';


export default function Layout() {

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_VEHICLE);
    if (stored) {
      try {
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, []);

  // update when i change localstorage
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_VEHICLE);
      if (stored) {
        try {
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // custom event for updates in the same window
    window.addEventListener('vehicleSelected', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('vehicleSelected', handleStorageChange);
    };
  }, []);

  const clearVehicle = () => {
    localStorage.removeItem(STORAGE_KEYS.SELECTED_VEHICLE);
    window.dispatchEvent(new Event('vehicleSelected'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <CategoryBar />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
