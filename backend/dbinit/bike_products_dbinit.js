const { Product, Category } = require('../models');


const biciProducts = [

  { name: 'Shimano Deore XT M8100', brand: 'Shimano', price: 189.99, stock: 15, sku: 'SHI-BRK-001', oemCode: 'BR-M8100', categoryName: 'Bike Brakes' },
  { name: 'SRAM Level TLM', brand: 'SRAM', price: 159.99, stock: 12, sku: 'SRA-BRK-001', oemCode: 'LEVEL-TLM', categoryName: 'Bike Brakes' },
  { name: 'Shimano 105 R7000', brand: 'Shimano', price: 89.99, stock: 20, sku: 'SHI-BRK-002', oemCode: 'BR-R7000', categoryName: 'Bike Brakes' },
  { name: 'Tektro HD-M275', brand: 'Tektro', price: 69.99, stock: 18, sku: 'TEK-BRK-001', oemCode: 'HD-M275', categoryName: 'Bike Brakes' },
  { name: 'Magura MT5', brand: 'Magura', price: 219.99, stock: 10, sku: 'MAG-BRK-001', oemCode: 'MT5-4P', categoryName: 'Bike Brakes' },
  { name: 'Shimano XT CN-M8100', brand: 'Shimano', price: 45.99, stock: 25, sku: 'SHI-CHA-001', oemCode: 'CN-M8100', categoryName: 'Bike Chains' },
  { name: 'SRAM Eagle PC-X01', brand: 'SRAM', price: 59.99, stock: 20, sku: 'SRA-CHA-001', oemCode: 'PC-X01', categoryName: 'Bike Chains' },
  { name: 'KMC X11', brand: 'KMC', price: 35.99, stock: 30, sku: 'KMC-CHA-001', oemCode: 'X11-93', categoryName: 'Bike Chains' },
  { name: 'Shimano HG601', brand: 'Shimano', price: 29.99, stock: 40, sku: 'SHI-CHA-002', oemCode: 'CN-HG601', categoryName: 'Bike Chains' },
  { name: 'SRAM PC-1110', brand: 'SRAM', price: 32.99, stock: 35, sku: 'SRA-CHA-002', oemCode: 'PC-1110', categoryName: 'Bike Chains' },
  { name: 'Schwalbe Marathon Plus 700x28C', brand: 'Schwalbe', price: 54.99, stock: 25, sku: 'SCH-TIR-001', oemCode: 'MAR-PLUS-28', categoryName: 'Bike Tires' },
  { name: 'Continental GP 5000 700x25C', brand: 'Continental', price: 64.99, stock: 20, sku: 'CON-TIR-001', oemCode: 'GP5000-25', categoryName: 'Bike Tires' },
  { name: 'Maxxis Minion DHF 29x2.5', brand: 'Maxxis', price: 69.99, stock: 18, sku: 'MAX-TIR-001', oemCode: 'DHF-29-25', categoryName: 'Bike Tires' },
  { name: 'Schwalbe Nobby Nic 27.5x2.35', brand: 'Schwalbe', price: 59.99, stock: 22, sku: 'SCH-TIR-002', oemCode: 'NOBBY-27', categoryName: 'Bike Tires' },
  { name: 'Continental Race 28 Tube', brand: 'Continental', price: 9.99, stock: 50, sku: 'CON-TUB-001', oemCode: 'RACE28', categoryName: 'Bike Tires' },
  { name: 'Selle Italia SLR Boost', brand: 'Selle Italia', price: 149.99, stock: 12, sku: 'SEL-SAD-001', oemCode: 'SLR-BOOST', categoryName: 'Bike Saddles' },
  { name: 'Fizik Antares R5', brand: 'Fizik', price: 119.99, stock: 15, sku: 'FIZ-SAD-001', oemCode: 'ANT-R5', categoryName: 'Bike Saddles' },
  { name: 'WTB Volt Sport', brand: 'WTB', price: 49.99, stock: 20, sku: 'WTB-SAD-001', oemCode: 'VOLT-SPT', categoryName: 'Bike Saddles' },
  { name: 'Brooks B17 Leather', brand: 'Brooks', price: 139.99, stock: 8, sku: 'BRO-SAD-001', oemCode: 'B17-STD', categoryName: 'Bike Saddles' },
  { name: 'Specialized Power', brand: 'Specialized', price: 89.99, stock: 18, sku: 'SPE-SAD-001', oemCode: 'POW-EXP', categoryName: 'Bike Saddles' },
  { name: 'Shimano XT PD-M8100', brand: 'Shimano', price: 89.99, stock: 20, sku: 'SHI-PED-001', oemCode: 'PD-M8100', categoryName: 'Bike Pedals' },
  { name: 'Shimano Ultegra PD-R8000', brand: 'Shimano', price: 139.99, stock: 15, sku: 'SHI-PED-002', oemCode: 'PD-R8000', categoryName: 'Bike Pedals' },
  { name: 'Race Face Chester', brand: 'Race Face', price: 54.99, stock: 25, sku: 'RAF-PED-001', oemCode: 'CHESTER', categoryName: 'Bike Pedals' },
  { name: 'Crankbrothers Stamp 7', brand: 'Crankbrothers', price: 119.99, stock: 12, sku: 'CRB-PED-001', oemCode: 'STAMP-7L', categoryName: 'Bike Pedals' },
  { name: 'Look Keo Classic 3', brand: 'Look', price: 79.99, stock: 18, sku: 'LOO-PED-001', oemCode: 'KEO-C3', categoryName: 'Bike Pedals' },
  { name: 'Lezyne Mega Drive 1800i', brand: 'Lezyne', price: 119.99, stock: 15, sku: 'LEZ-LIG-001', oemCode: 'MEGA-1800', categoryName: 'Bike Lights' },
  { name: 'Cateye Volt 1700', brand: 'Cateye', price: 139.99, stock: 12, sku: 'CAT-LIG-001', oemCode: 'VOLT-1700', categoryName: 'Bike Lights' },
  { name: 'Exposure Sirius MK11', brand: 'Exposure', price: 89.99, stock: 18, sku: 'EXP-LIG-001', oemCode: 'SIR-MK11', categoryName: 'Bike Lights' },
  { name: 'Lezyne Zecto Drive', brand: 'Lezyne', price: 39.99, stock: 25, sku: 'LEZ-LIG-002', oemCode: 'ZECTO', categoryName: 'Bike Lights' },
  { name: 'Cateye Rapid X3', brand: 'Cateye', price: 49.99, stock: 20, sku: 'CAT-LIG-002', oemCode: 'RAPID-X3', categoryName: 'Bike Lights' },
  { sku: 'BIKE-MTB-001', oemCode: 'TREK-MARLIN7-2024', name: 'Trek Marlin 7 MTB', brand: 'Trek', price: 749.99, stock: 3, categoryName: 'Bike', description: 'MTB hardtail 29" - Shimano Deore 1x12' },
  { sku: 'BIKE-MTB-002', oemCode: 'TREK-XCAL8-2024', name: 'Trek X-Caliber 8 MTB', brand: 'Trek', price: 899.99, stock: 2, categoryName: 'Bike', description: 'MTB hardtail 29" - RockShox fork' },
  { sku: 'BIKE-MTB-003', oemCode: 'SPEC-ROCK-2024', name: 'Specialized Rockhopper Comp', brand: 'Specialized', price: 849.99, stock: 4, categoryName: 'Bike', description: 'MTB hardtail 29" - Shimano SLX' },
  { sku: 'BIKE-MTB-004', oemCode: 'SPEC-PITCH-2024', name: 'Specialized Pitch Sport', brand: 'Specialized', price: 649.99, stock: 5, categoryName: 'Bike', description: 'MTB hardtail 27.5" - entry level' },
  { sku: 'BIKE-MTB-005', oemCode: 'GIANT-TAL2-2024', name: 'Giant Talon 2', brand: 'Giant', price: 699.99, stock: 3, categoryName: 'Bike', description: 'MTB hardtail 29" - Shimano Altus' },
  { sku: 'BIKE-MTB-006', oemCode: 'CANN-TRAIL6-2024', name: 'Cannondale Trail 6', brand: 'Cannondale', price: 799.99, stock: 2, categoryName: 'Bike', description: 'MTB hardtail 29" - SR Suntour fork' },
  { sku: 'BIKE-MTB-007', oemCode: 'SCOTT-ASP940-2024', name: 'Scott Aspect 940', brand: 'Scott', price: 729.99, stock: 4, categoryName: 'Bike', description: 'MTB hardtail 29" - Shimano Deore' },
  { sku: 'BIKE-MTB-008', oemCode: 'CUBE-AIM-2024', name: 'Cube Aim Pro', brand: 'Cube', price: 679.99, stock: 3, categoryName: 'Bike', description: 'MTB hardtail 27.5" - versatile' },
  { sku: 'BIKE-ROAD-001', oemCode: 'BIAN-SEMP-2024', name: 'Bianchi Sempre Pro Ultegra', brand: 'Bianchi', price: 2499.99, stock: 2, categoryName: 'Bike', description: 'Road bike - Shimano Ultegra R8000' },
  { sku: 'BIKE-ROAD-002', oemCode: 'SPEC-ALLEZ-2024', name: 'Specialized Allez Elite', brand: 'Specialized', price: 1199.99, stock: 4, categoryName: 'Bike', description: 'Road bike - Shimano 105' },
  { sku: 'BIKE-ROAD-003', oemCode: 'TREK-DOM-2024', name: 'Trek Domane AL 3', brand: 'Trek', price: 1099.99, stock: 3, categoryName: 'Bike', description: 'Endurance road bike - Shimano Sora' },
  { sku: 'BIKE-ROAD-004', oemCode: 'GIANT-CONT2-2024', name: 'Giant Contend 2', brand: 'Giant', price: 899.99, stock: 5, categoryName: 'Bike', description: 'Road bike - Shimano Claris' },
  { sku: 'BIKE-ROAD-005', oemCode: 'CANN-CAAD13-2024', name: 'Cannondale CAAD13 105', brand: 'Cannondale', price: 1899.99, stock: 2, categoryName: 'Bike', description: 'Race road bike - Shimano 105' },
  { sku: 'BIKE-EBIKE-001', oemCode: 'HAIB-SDURO-2024', name: 'Haibike SDuro HardSeven 5.0', brand: 'Haibike', price: 2799.99, stock: 2, categoryName: 'Bike', description: 'E-MTB - Yamaha 250W motor' },
  { sku: 'BIKE-EBIKE-002', oemCode: 'CUBE-REAC-2024', name: 'Cube Reaction Hybrid Pro 625', brand: 'Cube', price: 2999.99, stock: 1, categoryName: 'Bike', description: 'E-MTB - Bosch Performance CX 625Wh' },
  { sku: 'BIKE-EBIKE-003', oemCode: 'TREK-POW5-2024', name: 'Trek Powerfly 5', brand: 'Trek', price: 3299.99, stock: 2, categoryName: 'Bike', description: 'E-MTB - Bosch Active Line Plus' },
  { sku: 'BIKE-EBIKE-004', oemCode: 'SPEC-LEVO-2024', name: 'Specialized Turbo Levo Comp', brand: 'Specialized', price: 4999.99, stock: 1, categoryName: 'Bike', description: 'E-MTB Full - Custom motor 700Wh' },
  { sku: 'BIKE-EBIKE-005', oemCode: 'GIANT-EXP-2024', name: 'Giant Explore E+ 2', brand: 'Giant', price: 2499.99, stock: 3, categoryName: 'Bike', description: 'E-Trekking - Yamaha SyncDrive Sport' },
  { sku: 'BIKE-CITY-001', oemCode: 'GAZ-ORANGE-2024', name: 'Gazelle Orange C7 HMB', brand: 'Gazelle', price: 899.99, stock: 4, categoryName: 'Bike', description: 'City bike - 7 speed hub' },
  { sku: 'BIKE-CITY-002', oemCode: 'BATA-DIVA-2024', name: 'Batavus Diva Plus', brand: 'Batavus', price: 799.99, stock: 3, categoryName: 'Bike', description: 'City bike - comfort' },
  { sku: 'BIKE-CITY-003', oemCode: 'BIAN-CITY-2024', name: 'Bianchi Classica Dama', brand: 'Bianchi', price: 599.99, stock: 5, categoryName: 'Bike', description: 'Classic city bike - vintage style' },
  { sku: 'BIKE-CITY-004', oemCode: 'CUBE-TOWN-2024', name: 'Cube Town Pro Comfort', brand: 'Cube', price: 649.99, stock: 4, categoryName: 'Bike', description: 'City bike - ergonomic' },
  { sku: 'BIKE-GRAV-001', oemCode: 'CANN-TOP4-2024', name: 'Cannondale Topstone 4', brand: 'Cannondale', price: 1399.99, stock: 2, categoryName: 'Bike', description: 'Gravel bike - Shimano GRX 400' },
  { sku: 'BIKE-GRAV-002', oemCode: 'SPEC-DIV-2024', name: 'Specialized Diverge E5 Comp', brand: 'Specialized', price: 1799.99, stock: 3, categoryName: 'Bike', description: 'Gravel bike - Future Shock suspension' },
  { sku: 'BIKE-GRAV-003', oemCode: 'GIANT-REV1-2024', name: 'Giant Revolt 1', brand: 'Giant', price: 1299.99, stock: 2, categoryName: 'Bike', description: 'Gravel bike - Shimano GRX 600' }

];


async function initBikeProducts() {
  try {

    const categoryMap = {};
    const allCategories = await Category.findAll();
    
    allCategories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    for (const prod of biciProducts) {
      const categoryId = categoryMap[prod.categoryName];
      delete prod.categoryName;
      await Product.create({ ...prod, categoryId });
    }


    console.log(`Prodotti BICI inseriti`);
  } catch (error) {
    console.error('Errore prodotti BICI:', error.message);
  }
}

module.exports = initBikeProducts;
