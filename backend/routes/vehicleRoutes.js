const express = require('express');
const router = express.Router();
const {Vehicle, sequelize} = require('../models');
const {Op} = require('sequelize');
const {body, query} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validate = require('../middleware/validator');



// list all vehicles
router.get('/', async (req, res) => {
  try {
    const { vehicleType, brand } = req.query;
    
    const where = {};
    if (vehicleType) {
      where.vehicleType = vehicleType; // 'auto' o 'bici'
    }
    if (brand) {
      where.brand = brand;
    }
    
    const vehicles = await Vehicle.findAll({
      where,
      order: [['brand', 'ASC'], ['model', 'ASC']]
    });
    
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// list brands
router.get('/brands', async (req, res) => {
  try {
    const { vehicleType } = req.query;
    
    const where = {};
    if (vehicleType) {
      where.vehicleType = vehicleType;
    }
    
    const vehicles = await Vehicle.findAll({
      where,
      attributes: ['brand'],
      group: ['brand'],
      order: [['brand', 'ASC']]
    });
    
    const brands = vehicles.map(v => v.brand);
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// list models
router.get('/models/:brand', async (req, res) => {
  try {
    const { brand } = req.params;
    const { vehicleType } = req.query;
    
    const where = { brand };
    if (vehicleType) {
      where.vehicleType = vehicleType;
    }
    
    const vehicles = await Vehicle.findAll({
      where,
      order: [['model', 'ASC']]
    });
    
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// list version per model
router.get('/versions', [
  query('brand').notEmpty().withMessage('brand is required'),
  query('model').notEmpty().withMessage('model is required')
], validate, async (req, res) => {
  try {
   const { brand, model } = req.query;
   const versions = await Vehicle.findAll({
      where: {
        brand,
        model
      },
      attributes: ['id', 'engine', 'yearStart', 'yearEnd'],
      order: [['yearStart', 'ASC']]
    });

    res.json(versions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// Search vehicle by VIN (partial or complete)
router.get('/search-vin', [
  query('vin').notEmpty().withMessage('VIN is required').isLength({min: 4}).withMessage('VIN must be at least 4 characters')
], validate, async (req, res) => {
  try {
    const { vin } = req.query;
    
    // Search for vehicles with matching VIN (case insensitive, partial match)
    const vehicles = await Vehicle.findAll({
      where: {
        vin: {
          [Op.like]: `%${vin}%`
        }
      },
      limit: 10,
      order: [['brand', 'ASC'], ['model', 'ASC']]
    });

    if (vehicles.length === 0) {
      return res.status(404).json({ 
        message: 'No vehicles found with this VIN',
        suggestions: 'Please check the VIN and try again'
      });
    }

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});



module.exports = router;
