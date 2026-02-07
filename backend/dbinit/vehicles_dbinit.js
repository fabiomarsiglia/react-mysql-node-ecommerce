const { Vehicle } = require('../models');



const autoVehicles = [
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Golf VII', engine: '1.6 TDI', engineCode: 'CAYC', powerKW: 77, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2017, vin: 'WVW-GOLF7-001' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Golf VII', engine: '2.0 TDI', engineCode: 'CRLB', powerKW: 110, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2019, vin: 'WVW-GOLF7-002' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Golf VI', engine: '1.4 TSI', engineCode: 'CAXA', powerKW: 90, fuelType: 'Petrol', yearStart: 2008, yearEnd: 2012, vin: 'WVW-GOLF6-001' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Passat B7', engine: '2.0 TDI', engineCode: 'CFFB', powerKW: 103, fuelType: 'Diesel', yearStart: 2010, yearEnd: 2014, vin: 'WVW-PASSB7-001' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Polo V', engine: '1.2 TSI', engineCode: 'CBZB', powerKW: 66, fuelType: 'Petrol', yearStart: 2009, yearEnd: 2017, vin: 'WVW-POLO5-001' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Tiguan', engine: '2.0 TDI', engineCode: 'CFFB', powerKW: 103, fuelType: 'Diesel', yearStart: 2007, yearEnd: 2016, vin: 'WVW-TIGUAN-001' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Caddy', engine: '1.6 TDI', engineCode: 'CAYC', powerKW: 75, fuelType: 'Diesel', yearStart: 2010, yearEnd: 2015, vin: 'WVW-CADDY-001' },
  { vehicleType: 'auto', brand: 'Volkswagen', model: 'Touran', engine: '1.9 TDI', engineCode: 'BKC', powerKW: 77, fuelType: 'Diesel', yearStart: 2003, yearEnd: 2010, vin: 'WVW-TOURAN-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: 'Panda III', engine: '1.2', engineCode: '169A4000', powerKW: 51, fuelType: 'Petrol', yearStart: 2012, yearEnd: 2020, vin: 'ZFA-PANDA3-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: 'Punto Evo', engine: '1.3 Multijet', engineCode: '199A2000', powerKW: 55, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2012, vin: 'ZFA-PUNTOEVO-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: '500', engine: '1.2', engineCode: '169A4000', powerKW: 51, fuelType: 'Petrol', yearStart: 2007, yearEnd: 2015, vin: 'ZFA-500-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: 'Ducato III', engine: '2.3 Multijet', engineCode: 'F1AE0481D', powerKW: 96, fuelType: 'Diesel', yearStart: 2011, yearEnd: 2014, vin: 'ZFA-DUCATO3-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: 'Tipo', engine: '1.6 Multijet', engineCode: '55263170', powerKW: 88, fuelType: 'Diesel', yearStart: 2016, yearEnd: 2021, vin: 'ZFA-TIPO-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: 'Doblo II', engine: '1.3 Multijet', engineCode: '199A2000', powerKW: 66, fuelType: 'Diesel', yearStart: 2010, yearEnd: 2015, vin: 'ZFA-DOBLO2-001' },
  { vehicleType: 'auto', brand: 'Fiat', model: 'Bravo II', engine: '1.9 Multijet', engineCode: '192A8000', powerKW: 88, fuelType: 'Diesel', yearStart: 2007, yearEnd: 2014, vin: 'ZFA-BRAVO2-001' },
  { vehicleType: 'auto', brand: 'Renault', model: 'Clio IV', engine: '1.5 dCi', engineCode: 'K9K', powerKW: 66, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2019, vin: 'VF1-CLIO4-001' },
  { vehicleType: 'auto', brand: 'Renault', model: 'Megane III', engine: '1.5 dCi', engineCode: 'K9K', powerKW: 81, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2016, vin: 'VF1-MEGANE3-001' },
  { vehicleType: 'auto', brand: 'Renault', model: 'Scenic III', engine: '1.9 dCi', engineCode: 'F9Q', powerKW: 96, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2016, vin: 'VF1-SCENIC3-001' },
  { vehicleType: 'auto', brand: 'Renault', model: 'Captur', engine: '1.5 dCi', engineCode: 'K9K', powerKW: 66, fuelType: 'Diesel', yearStart: 2013, yearEnd: 2019, vin: 'VF1-CAPTUR-001' },
  { vehicleType: 'auto', brand: 'Renault', model: 'Kangoo II', engine: '1.5 dCi', engineCode: 'K9K', powerKW: 63, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2021, vin: 'VF1-KANGOO2-001' },
  { vehicleType: 'auto', brand: 'Renault', model: 'Twingo III', engine: '0.9 TCe', engineCode: 'H4B', powerKW: 66, fuelType: 'Petrol', yearStart: 2014, yearEnd: 2019, vin: 'VF1-TWINGO3-001' },
  { vehicleType: 'auto', brand: 'BMW', model: '320d (E90)', engine: '2.0d', engineCode: 'N47D20', powerKW: 120, fuelType: 'Diesel', yearStart: 2005, yearEnd: 2011, vin: 'WBA-320D-E90-001' },
  { vehicleType: 'auto', brand: 'BMW', model: '520d (F10)', engine: '2.0d', engineCode: 'N47D20', powerKW: 135, fuelType: 'Diesel', yearStart: 2010, yearEnd: 2017, vin: 'WBA-520D-F10-001' },
  { vehicleType: 'auto', brand: 'BMW', model: 'X3 (F25)', engine: '2.0d', engineCode: 'N47D20', powerKW: 135, fuelType: 'Diesel', yearStart: 2010, yearEnd: 2017, vin: 'WBA-X3-F25-001' },
  { vehicleType: 'auto', brand: 'BMW', model: '118d (F20)', engine: '2.0d', engineCode: 'N47D20', powerKW: 105, fuelType: 'Diesel', yearStart: 2011, yearEnd: 2015, vin: 'WBA-118D-F20-001' },
  { vehicleType: 'auto', brand: 'BMW', model: '318d (F30)', engine: '2.0d', engineCode: 'N47D20', powerKW: 105, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2018, vin: 'WBA-318D-F30-001' },
  { vehicleType: 'auto', brand: 'Mercedes-Benz', model: 'C220 CDI (W204)', engine: '2.2 CDI', engineCode: 'OM651', powerKW: 125, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2014, vin: 'WDD-C220-W204-001' },
  { vehicleType: 'auto', brand: 'Mercedes-Benz', model: 'E220 CDI (W212)', engine: '2.2 CDI', engineCode: 'OM651', powerKW: 125, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2016, vin: 'WDD-E220-W212-001' },
  { vehicleType: 'auto', brand: 'Mercedes-Benz', model: 'Sprinter 313 CDI', engine: '2.2 CDI', engineCode: 'OM651', powerKW: 95, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2018, vin: 'WDD-SPRINTER-001' },
  { vehicleType: 'auto', brand: 'Mercedes-Benz', model: 'A180 CDI (W176)', engine: '1.5 CDI', engineCode: 'OM607', powerKW: 80, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2018, vin: 'WDD-A180-W176-001' },
  { vehicleType: 'auto', brand: 'Mercedes-Benz', model: 'Vito 111 CDI', engine: '1.6 CDI', engineCode: 'OM622', powerKW: 84, fuelType: 'Diesel', yearStart: 2014, yearEnd: 2019, vin: 'WDD-VITO-001' },
  { vehicleType: 'auto', brand: 'Audi', model: 'A3 (8P)', engine: '2.0 TDI', engineCode: 'CBAB', powerKW: 103, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2012, vin: 'WAU-A3-8P-001' },
  { vehicleType: 'auto', brand: 'Audi', model: 'A4 (B8)', engine: '2.0 TDI', engineCode: 'CAGA', powerKW: 105, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2015, vin: 'WAU-A4-B8-001' },
  { vehicleType: 'auto', brand: 'Audi', model: 'Q5', engine: '2.0 TDI', engineCode: 'CGLC', powerKW: 130, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2017, vin: 'WAU-Q5-001' },
  { vehicleType: 'auto', brand: 'Audi', model: 'A6 (C7)', engine: '2.0 TDI', engineCode: 'CGLC', powerKW: 130, fuelType: 'Diesel', yearStart: 2011, yearEnd: 2018, vin: 'WAU-A6-C7-001' },
  { vehicleType: 'auto', brand: 'Audi', model: 'Q3', engine: '2.0 TDI', engineCode: 'CFFA', powerKW: 103, fuelType: 'Diesel', yearStart: 2011, yearEnd: 2018, vin: 'WAU-Q3-001' },
  { vehicleType: 'auto', brand: 'Ford', model: 'Fiesta VII', engine: '1.4 TDCi', engineCode: 'F6JA', powerKW: 50, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2017, vin: 'WF0-FIESTA7-001' },
  { vehicleType: 'auto', brand: 'Ford', model: 'Focus III', engine: '1.6 TDCi', engineCode: 'T1DA', powerKW: 70, fuelType: 'Diesel', yearStart: 2011, yearEnd: 2018, vin: 'WF0-FOCUS3-001' },
  { vehicleType: 'auto', brand: 'Ford', model: 'Transit Custom', engine: '2.2 TDCi', engineCode: 'CVRA', powerKW: 92, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2016, vin: 'WF0-TRANSIT-001' },
  { vehicleType: 'auto', brand: 'Ford', model: 'Kuga II', engine: '2.0 TDCi', engineCode: 'TXDB', powerKW: 110, fuelType: 'Diesel', yearStart: 2013, yearEnd: 2019, vin: 'WF0-KUGA2-001' },
  { vehicleType: 'auto', brand: 'Ford', model: 'Mondeo IV', engine: '2.0 TDCi', engineCode: 'TXBA', powerKW: 103, fuelType: 'Diesel', yearStart: 2007, yearEnd: 2014, vin: 'WF0-MONDEO4-001' },
  { vehicleType: 'auto', brand: 'Peugeot', model: '208', engine: '1.4 HDi', engineCode: '8HX', powerKW: 50, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2019, vin: 'VF3-208-001' },
  { vehicleType: 'auto', brand: 'Peugeot', model: '308 II', engine: '1.6 HDi', engineCode: '9HZ', powerKW: 68, fuelType: 'Diesel', yearStart: 2013, yearEnd: 2021, vin: 'VF3-308-2-001' },
  { vehicleType: 'auto', brand: 'Peugeot', model: '2008', engine: '1.6 HDi', engineCode: '9HP', powerKW: 68, fuelType: 'Diesel', yearStart: 2013, yearEnd: 2019, vin: 'VF3-2008-001' },
  { vehicleType: 'auto', brand: 'Peugeot', model: 'Partner Tepee', engine: '1.6 HDi', engineCode: '9HZ', powerKW: 66, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2018, vin: 'VF3-PARTNER-001' },
  { vehicleType: 'auto', brand: 'Peugeot', model: '3008', engine: '1.6 HDi', engineCode: '9HZ', powerKW: 84, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2016, vin: 'VF3-3008-001' },
  { vehicleType: 'auto', brand: 'Opel', model: 'Corsa D', engine: '1.3 CDTI', engineCode: 'Z13DTJ', powerKW: 55, fuelType: 'Diesel', yearStart: 2006, yearEnd: 2014, vin: 'W0L-CORSAD-001' },
  { vehicleType: 'auto', brand: 'Opel', model: 'Astra J', engine: '1.7 CDTI', engineCode: 'A17DTR', powerKW: 81, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2015, vin: 'W0L-ASTRAJ-001' },
  { vehicleType: 'auto', brand: 'Opel', model: 'Insignia', engine: '2.0 CDTI', engineCode: 'A20DTH', powerKW: 118, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2017, vin: 'W0L-INSIGNIA-001' },
  { vehicleType: 'auto', brand: 'Opel', model: 'Mokka', engine: '1.7 CDTI', engineCode: 'A17DTS', powerKW: 96, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2019, vin: 'W0L-MOKKA-001' },
  { vehicleType: 'auto', brand: 'Toyota', model: 'Yaris III', engine: '1.4 D-4D', engineCode: '1ND', powerKW: 66, fuelType: 'Diesel', yearStart: 2011, yearEnd: 2020, vin: 'VNK-YARIS3-001' },
  { vehicleType: 'auto', brand: 'Toyota', model: 'Auris II', engine: '1.4 D-4D', engineCode: '1ND', powerKW: 66, fuelType: 'Diesel', yearStart: 2012, yearEnd: 2018, vin: 'VNK-AURIS2-001' },
  { vehicleType: 'auto', brand: 'Toyota', model: 'RAV4 IV', engine: '2.0 D-4D', engineCode: '1AD', powerKW: 91, fuelType: 'Diesel', yearStart: 2013, yearEnd: 2018, vin: 'VNK-RAV4-4-001' },
  { vehicleType: 'auto', brand: 'Citroen', model: 'C3 II', engine: '1.4 HDi', engineCode: '8HX', powerKW: 50, fuelType: 'Diesel', yearStart: 2009, yearEnd: 2016, vin: 'VF7-C3-2-001' },
  { vehicleType: 'auto', brand: 'Citroen', model: 'Berlingo II', engine: '1.6 HDi', engineCode: '9HZ', powerKW: 66, fuelType: 'Diesel', yearStart: 2008, yearEnd: 2018, vin: 'VF7-BERLINGO2-001' }
];


async function initVehicles() {
  try {
    for (const vehicle of autoVehicles) {
      await Vehicle.create(vehicle);
    }
    console.log(`AUTO inserite`);
  } catch (error) {
    console.error('Errore AUTO:', error.message);
  }
}

module.exports = initVehicles;
