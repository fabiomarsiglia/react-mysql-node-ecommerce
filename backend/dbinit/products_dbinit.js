const { Product, Category } = require('../models');


const autoProducts = [

  { name: 'Front Brake Disc Ventilated 280mm', brand: 'Brembo', price: 89.99, stock: 25, sku: 'BRE-DISC-001', oemCode: '09.9772.11', categoryName: 'Braking System' },
  { name: 'Rear Brake Disc 260mm', brand: 'Bosch', price: 69.99, stock: 30, sku: 'BOS-DISC-001', oemCode: '0986479R47', categoryName: 'Braking System' },
  { name: 'Front Brake Pads Ceramic', brand: 'Brembo', price: 45.99, stock: 40, sku: 'BRE-PAD-001', oemCode: 'P85020', categoryName: 'Braking System' },
  { name: 'Rear Brake Pads', brand: 'Textar', price: 35.99, stock: 45, sku: 'TEX-PAD-001', oemCode: '2355401', categoryName: 'Braking System' },
  { name: 'Brake Caliper Front Left', brand: 'ATE', price: 159.99, stock: 15, sku: 'ATE-CAL-001', oemCode: '24.3541-1703.5', categoryName: 'Braking System' },
  { name: 'Brake Caliper Rear', brand: 'TRW', price: 149.99, stock: 12, sku: 'TRW-CAL-001', oemCode: 'BHN934E', categoryName: 'Braking System' },
  { name: 'Brake Master Cylinder', brand: 'ATE', price: 89.99, stock: 18, sku: 'ATE-MAS-001', oemCode: '24.2123-1711.3', categoryName: 'Braking System' },
  { name: 'Brake Hose Kit', brand: 'Ferodo', price: 29.99, stock: 35, sku: 'FER-HOS-001', oemCode: 'FHY2855', categoryName: 'Braking System' },
  { name: 'Handbrake Cable', brand: 'Brembo', price: 39.99, stock: 25, sku: 'BRE-CAB-001', oemCode: 'T85073', categoryName: 'Braking System' },
  { name: 'Brake Fluid DOT 4', brand: 'Castrol', price: 12.99, stock: 100, sku: 'CAS-FLU-001', oemCode: 'DOT4-1L', categoryName: 'Braking System' },
  { name: 'Oil Filter', brand: 'Mann', price: 9.99, stock: 80, sku: 'MAN-OIL-001', oemCode: 'W712/75', categoryName: 'Filters' },
  { name: 'Air Filter', brand: 'Bosch', price: 14.99, stock: 70, sku: 'BOS-AIR-001', oemCode: '1457433529', categoryName: 'Filters' },
  { name: 'Cabin Filter Carbon', brand: 'Mann', price: 19.99, stock: 60, sku: 'MAN-CAB-001', oemCode: 'CUK2945', categoryName: 'Filters' },
  { name: 'Fuel Filter Diesel', brand: 'Bosch', price: 24.99, stock: 50, sku: 'BOS-FUEL-001', oemCode: 'F026402128', categoryName: 'Filters' },
  { name: 'Fuel Filter Petrol', brand: 'Mann', price: 22.99, stock: 45, sku: 'MAN-FUEL-002', oemCode: 'WK614/23', categoryName: 'Filters' },
  { name: 'Hydraulic Filter', brand: 'Febi', price: 29.99, stock: 30, sku: 'FEB-HYD-001', oemCode: '26054', categoryName: 'Filters' },
  { name: 'Oil Filter Kit', brand: 'Mahle', price: 12.99, stock: 75, sku: 'MAH-OIL-001', oemCode: 'OX371D', categoryName: 'Filters' },
  { name: 'Air Filter Sport', brand: 'K&N', price: 79.99, stock: 20, sku: 'KN-AIR-001', oemCode: '33-2865', categoryName: 'Filters' },
  { name: 'DPF Filter', brand: 'BM Catalysts', price: 399.99, stock: 8, sku: 'BMC-DPF-001', oemCode: 'BM11027', categoryName: 'Filters' },
  { name: 'AdBlue Filter', brand: 'Bosch', price: 34.99, stock: 25, sku: 'BOS-ADB-001', oemCode: '1457436031', categoryName: 'Filters' },
  { name: 'Front Shock Absorber', brand: 'Bilstein', price: 189.99, stock: 15, sku: 'BIL-SHO-001', oemCode: '22-248760', categoryName: 'Suspension and Arms' },
  { name: 'Rear Shock Absorber', brand: 'Monroe', price: 159.99, stock: 18, sku: 'MON-SHO-001', oemCode: 'E1014', categoryName: 'Suspension and Arms' },
  { name: 'Front Coil Spring', brand: 'Eibach', price: 119.99, stock: 20, sku: 'EIB-SPR-001', oemCode: 'E10-85-021-01-22', categoryName: 'Suspension and Arms' },
  { name: 'Rear Coil Spring', brand: 'Sachs', price: 99.99, stock: 22, sku: 'SAC-SPR-001', oemCode: '996078', categoryName: 'Suspension and Arms' },
  { name: 'Lower Control Arm', brand: 'Lemförder', price: 89.99, stock: 12, sku: 'LEM-ARM-001', oemCode: '31126', categoryName: 'Suspension and Arms' },
  { name: 'Upper Control Arm', brand: 'TRW', price: 79.99, stock: 14, sku: 'TRW-ARM-001', oemCode: 'JTC968', categoryName: 'Suspension and Arms' },
  { name: 'Anti-Roll Bar Link', brand: 'Meyle', price: 24.99, stock: 40, sku: 'MEY-LIN-001', oemCode: '1160600008', categoryName: 'Suspension and Arms' },
  { name: 'Ball Joint Front', brand: 'Febi', price: 34.99, stock: 30, sku: 'FEB-BAL-001', oemCode: '14426', categoryName: 'Suspension and Arms' },
  { name: 'Wheel Bearing Kit', brand: 'SKF', price: 54.99, stock: 25, sku: 'SKF-BEA-001', oemCode: 'VKBA3643', categoryName: 'Suspension and Arms' },
  { name: 'Strut Mount', brand: 'Lemförder', price: 44.99, stock: 28, sku: 'LEM-MOU-001', oemCode: '31340', categoryName: 'Suspension and Arms' },
  { name: 'Timing Belt Kit', brand: 'Gates', price: 129.99, stock: 22, sku: 'GAT-TIM-001', oemCode: 'K015578XS', categoryName: 'Engine and Belts' },
  { name: 'V-Belt Multi-Ribbed', brand: 'Continental', price: 29.99, stock: 45, sku: 'CON-BEL-001', oemCode: '6PK1193', categoryName: 'Engine and Belts' },
  { name: 'Water Pump', brand: 'Hepu', price: 69.99, stock: 20, sku: 'HEP-WAT-001', oemCode: 'P534', categoryName: 'Engine and Belts' },
  { name: 'Tensioner Pulley', brand: 'INA', price: 39.99, stock: 30, sku: 'INA-TEN-001', oemCode: '531071420', categoryName: 'Engine and Belts' },
  { name: 'Alternator Belt', brand: 'Dayco', price: 19.99, stock: 50, sku: 'DAY-ALT-001', oemCode: '6PK1080', categoryName: 'Engine and Belts' },
  { name: 'Engine Mount Front', brand: 'Corteco', price: 54.99, stock: 18, sku: 'COR-MOU-001', oemCode: '80001301', categoryName: 'Engine and Belts' },
  { name: 'Gearbox Mount', brand: 'Lemförder', price: 49.99, stock: 16, sku: 'LEM-GEA-001', oemCode: '3725801', categoryName: 'Engine and Belts' },
  { name: 'Thermostat', brand: 'Wahler', price: 44.99, stock: 25, sku: 'WAH-THE-001', oemCode: '3091.87D', categoryName: 'Engine and Belts' },
  { name: 'Coolant Hose', brand: 'Gates', price: 34.99, stock: 28, sku: 'GAT-HOS-001', oemCode: 'MH1098', categoryName: 'Engine and Belts' },
  { name: 'Engine Oil 5W30', brand: 'Castrol', price: 49.99, stock: 60, sku: 'CAS-OIL-001', oemCode: 'EDGE-5W30-5L', categoryName: 'Engine and Belts' },
  { name: 'H7 Bulb 12V Pair', brand: 'Philips', price: 19.99, stock: 80, sku: 'PHI-H7-001', oemCode: '12972PRC2', categoryName: 'Lighting' },
  { name: 'H4 LED Bulb', brand: 'Osram', price: 89.99, stock: 30, sku: 'OSR-H4-001', oemCode: 'LEDriving', categoryName: 'Lighting' },
  { name: 'Headlight Left', brand: 'Valeo', price: 199.99, stock: 10, sku: 'VAL-HEA-001', oemCode: '43540', categoryName: 'Lighting' },
  { name: 'Fog Light Right', brand: 'TYC', price: 54.99, stock: 18, sku: 'TYC-FOG-001', oemCode: '19-0775-01-2', categoryName: 'Lighting' },
  { name: 'Tail Light Left', brand: 'Hella', price: 79.99, stock: 15, sku: 'HEL-TAI-001', oemCode: '2SK010776-801', categoryName: 'Lighting' },
  { name: 'Indicator Bulb PY21W', brand: 'Philips', price: 4.99, stock: 100, sku: 'PHI-IND-001', oemCode: '12496NAB2', categoryName: 'Lighting' },
  { name: 'License Plate Light', brand: 'Osram', price: 14.99, stock: 50, sku: 'OSR-LIC-001', oemCode: 'LED6000K', categoryName: 'Lighting' },
  { name: 'Interior Light Kit', brand: 'Philips', price: 24.99, stock: 35, sku: 'PHI-INT-001', oemCode: 'X-tremeVision', categoryName: 'Lighting' },
  { name: 'Brake Light P21W', brand: 'Bosch', price: 3.99, stock: 120, sku: 'BOS-BRA-001', oemCode: '1987302201', categoryName: 'Lighting' },
  { name: 'Leveling Motor', brand: 'Valeo', price: 39.99, stock: 20, sku: 'VAL-LEV-001', oemCode: '087299', categoryName: 'Lighting' },
  { name: 'Front Exhaust Pipe', brand: 'Bosal', price: 89.99, stock: 15, sku: 'BOS-EXH-001', oemCode: '850-047', categoryName: 'Exhaust System' },
  { name: 'Catalytic Converter', brand: 'Walker', price: 299.99, stock: 8, sku: 'WAL-CAT-001', oemCode: '20514', categoryName: 'Exhaust System' },
  { name: 'Rear Silencer', brand: 'Bosal', price: 119.99, stock: 12, sku: 'BOS-SIL-001', oemCode: '190-009', categoryName: 'Exhaust System' },
  { name: 'Centre Silencer', brand: 'Fenno', price: 79.99, stock: 14, sku: 'FEN-SIL-001', oemCode: 'P4471', categoryName: 'Exhaust System' },
  { name: 'Exhaust Mount Rubber', brand: 'Bosal', price: 9.99, stock: 60, sku: 'BOS-MOU-001', oemCode: '255-071', categoryName: 'Exhaust System' },
  { name: 'Lambda Sensor Front', brand: 'Bosch', price: 79.99, stock: 18, sku: 'BOS-LAM-001', oemCode: '0258006537', categoryName: 'Exhaust System' },
  { name: 'Lambda Sensor Rear', brand: 'NGK', price: 69.99, stock: 20, sku: 'NGK-LAM-001', oemCode: 'OZA659-EE21', categoryName: 'Exhaust System' },
  { name: 'EGR Valve', brand: 'Pierburg', price: 189.99, stock: 10, sku: 'PIE-EGR-001', oemCode: '7.22875.09.0', categoryName: 'Exhaust System' },
  { name: 'Exhaust Gasket Kit', brand: 'Elring', price: 19.99, stock: 40, sku: 'ELR-GAS-001', oemCode: '495.990', categoryName: 'Exhaust System' },
  { name: 'DPF Pressure Sensor', brand: 'Bosch', price: 54.99, stock: 16, sku: 'BOS-DPF-002', oemCode: '0281006082', categoryName: 'Exhaust System' },
  { name: 'Clutch Kit 3-Piece', brand: 'LuK', price: 189.99, stock: 15, sku: 'LUK-CLU-001', oemCode: '623304509', categoryName: 'Clutch and Transmission' },
  { name: 'Clutch Disc', brand: 'Sachs', price: 89.99, stock: 20, sku: 'SAC-DIS-001', oemCode: '1878001550', categoryName: 'Clutch and Transmission' },
  { name: 'Flywheel DMF', brand: 'LuK', price: 349.99, stock: 8, sku: 'LUK-FLY-001', oemCode: '415054710', categoryName: 'Clutch and Transmission' },
  { name: 'Release Bearing', brand: 'SKF', price: 29.99, stock: 35, sku: 'SKF-REL-001', oemCode: 'VKC2214', categoryName: 'Clutch and Transmission' },
  { name: 'Clutch Master Cylinder', brand: 'ATE', price: 79.99, stock: 12, sku: 'ATE-MAS-002', oemCode: '24.2419-1716.3', categoryName: 'Clutch and Transmission' },
  { name: 'Slave Cylinder', brand: 'LPR', price: 39.99, stock: 18, sku: 'LPR-SLA-001', oemCode: '3058', categoryName: 'Clutch and Transmission' },
  { name: 'Gear Oil 75W90', brand: 'Castrol', price: 14.99, stock: 50, sku: 'CAS-GEA-001', oemCode: 'SYNTRAX-75W90', categoryName: 'Clutch and Transmission' },
  { name: 'Linkage Cable', brand: 'Febi', price: 44.99, stock: 16, sku: 'FEB-LIN-001', oemCode: '21572', categoryName: 'Clutch and Transmission' },
  { name: 'Gearbox Mount', brand: 'Corteco', price: 34.99, stock: 22, sku: 'COR-MOU-002', oemCode: '80001440', categoryName: 'Clutch and Transmission' },
  { name: 'ATF Fluid', brand: 'Fuchs', price: 19.99, stock: 45, sku: 'FUC-ATF-001', oemCode: 'TITAN-ATF4000', categoryName: 'Clutch and Transmission' },
  { name: 'Radiator', brand: 'Valeo', price: 149.99, stock: 12, sku: 'VAL-RAD-001', oemCode: '734574', categoryName: 'Cooling System' },
  { name: 'Fan Assembly', brand: 'NRF', price: 119.99, stock: 10, sku: 'NRF-FAN-001', oemCode: '47396', categoryName: 'Cooling System' },
  { name: 'Expansion Tank', brand: 'Febi', price: 29.99, stock: 30, sku: 'FEB-EXP-001', oemCode: '22627', categoryName: 'Cooling System' },
  { name: 'Radiator Hose Upper', brand: 'Gates', price: 24.99, stock: 35, sku: 'GAT-RAD-001', oemCode: 'MH3937', categoryName: 'Cooling System' },
  { name: 'Radiator Hose Lower', brand: 'Dayco', price: 22.99, stock: 32, sku: 'DAY-RAD-001', oemCode: 'DRM048', categoryName: 'Cooling System' },
  { name: 'Coolant G12', brand: 'Febi', price: 12.99, stock: 60, sku: 'FEB-COO-001', oemCode: '26580', categoryName: 'Cooling System' },
  { name: 'Thermostat Housing', brand: 'Wahler', price: 39.99, stock: 20, sku: 'WAH-HOU-001', oemCode: '710255D', categoryName: 'Cooling System' },
  { name: 'Temperature Sensor', brand: 'FAE', price: 19.99, stock: 40, sku: 'FAE-TEM-001', oemCode: '33220', categoryName: 'Cooling System' },
  { name: 'Heater Valve', brand: 'Valeo', price: 34.99, stock: 18, sku: 'VAL-HEA-002', oemCode: '515041', categoryName: 'Cooling System' },
  { name: 'Radiator Cap', brand: 'Stant', price: 9.99, stock: 70, sku: 'STA-CAP-001', oemCode: '10230', categoryName: 'Cooling System' }
];


async function initAutoProducts() {
  try {
    const categoryMap = {};
    const allCategories = await Category.findAll();
    
    allCategories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    for (const prod of autoProducts) {
      const categoryId = categoryMap[prod.categoryName];
      delete prod.categoryName;
      await Product.create({ ...prod, categoryId });
    }


    console.log(`prodotti AUTO inseriti`);
  } catch (error) {
    console.error('Errore prodotti AUTO:', error.message);
  }
}

module.exports = initAutoProducts;