const sequelize = require('../config/db');
const initCategories = require('./categories_dbinit');
const initVehicles = require('./vehicles_dbinit');
const initProducts = require('./products_dbinit');
const initCompatibilities = require('./compatibilities_dbinit');
const initBikeProducts = require('./bike_products_dbinit');

async function initDB() {
  try {
    await sequelize.sync({ force: true });
    console.log(' Database synchronized');

    await initCategories();
    await initVehicles();
    await initProducts();
    await initBikeProducts();  
    await initCompatibilities();

    console.log('Database initialization complete!');
    console.log('Totals:');
    console.log('  - Auto categories: done');
    console.log('  - Bike categories: done');
    console.log('  - Vehicles (cars): done');
    console.log('  - Vehicles (bikes): done');
    console.log('  - Products (auto): done');
    console.log('  - Products (bike): done');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB();
