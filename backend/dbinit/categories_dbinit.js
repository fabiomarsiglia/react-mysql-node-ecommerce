const { Category } = require('../models');



module.exports = async () => {
  const categories = [
  { name: 'Braking System', description: 'Brake pads, discs, calipers' },
  { name: 'Filters', description: 'Oil, air, fuel filters' },
  { name: 'Suspension and Arms', description: 'Shock absorbers, control arms' },
  { name: 'Engine and Belts', description: 'Timing belts, engine components' },
  { name: 'Lighting', description: 'Headlights, tail lights, bulbs' },
  { name: 'Exhaust System', description: 'Mufflers, catalytic converters' },
  { name: 'Clutch and Transmission', description: 'Clutch kits, gearbox parts' },
  { name: 'Cooling System', description: 'Radiators, water pumps' },
  { name: 'Bike Brakes', description: 'Brake pads, rotors, levers' },
  { name: 'Bike Chains', description: 'Chains and cassettes' },
  { name: 'Bike Tires', description: 'Tires and tubes' },
  { name: 'Bike Saddles', description: 'Saddles and seatposts' },
  { name: 'Bike Pedals', description: 'Pedals and cleats' },
  { name: 'Bike Lights', description: 'Front and rear lights' },
  { name: 'Bike', description: 'Complete bicycles for sale' }  ];
  
  await Category.bulkCreate(categories);
  console.log('Categorie auto/bici create');
};
