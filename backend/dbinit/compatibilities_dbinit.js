const { Product, Vehicle, ProductCompatibility } = require('../models');




module.exports = async () => {
  const allProducts = await Product.findAll();
  const allVehicles = await Vehicle.findAll();
  const links = [];

  const getRandomSubset = (array, min, max) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return array.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  allProducts.forEach(product => {
    let compatibleVehicles = [];
    const productBrand = product.brand.toLowerCase();
    const productCategory = product.name.toLowerCase();

    if (['brembo', 'bosch', 'ate', 'mann-filter', 'sachs', 'bilstein'].includes(productBrand)) {
      const premiumVehicles = allVehicles.filter(v => 
        ['Volkswagen', 'Audi', 'BMW', 'Mercedes'].includes(v.brand)
      );
      compatibleVehicles = getRandomSubset(premiumVehicles, 
        Math.floor(premiumVehicles.length * 0.6), 
        Math.floor(premiumVehicles.length * 0.8)
      );
    } 
    else if (['valeo', 'ufi', 'magneti marelli', 'pagid'].includes(productBrand)) {
      const europeanVehicles = allVehicles.filter(v => 
        ['Fiat', 'Alfa Romeo', 'Renault', 'Peugeot', 'Citroën'].includes(v.brand)
      );
      compatibleVehicles = getRandomSubset(europeanVehicles, 
        Math.floor(europeanVehicles.length * 0.5), 
        Math.floor(europeanVehicles.length * 0.7)
      );
    }
    // compatible with more vehicles
    else if (productCategory.includes('filter') || 
             productCategory.includes('fluid') || 
             productCategory.includes('bulb') ||
             productCategory.includes('oil')) {
      compatibleVehicles = getRandomSubset(allVehicles, 
        Math.floor(allVehicles.length * 0.4), 
        Math.floor(allVehicles.length * 0.7)
      );
    }
    else if (productCategory.includes('timing') || // compatible with fewer vehicles
             productCategory.includes('clutch') || 
             productCategory.includes('flywheel') ||
             productCategory.includes('turbo')) {
      compatibleVehicles = getRandomSubset(allVehicles, 
        Math.floor(allVehicles.length * 0.1), 
        Math.floor(allVehicles.length * 0.3)
      );
    }
    else {
      compatibleVehicles = getRandomSubset(allVehicles, 
        Math.floor(allVehicles.length * 0.2), 
        Math.floor(allVehicles.length * 0.5)
      );
    }

    // compatibility links
    compatibleVehicles.forEach(v => {
      links.push({
        productId: product.id,
        vehicleId: v.id
      });
    });
  });

  // remove duplicates
  const uniqueLinks = Array.from(
    new Set(links.map(l => `${l.productId}-${l.vehicleId}`))
  ).map(key => {
    const [productId, vehicleId] = key.split('-');
    return { productId: parseInt(productId), vehicleId: parseInt(vehicleId) };
  });

  await ProductCompatibility.bulkCreate(uniqueLinks);
  console.log(`${uniqueLinks.length} compatibility links created`);
};
