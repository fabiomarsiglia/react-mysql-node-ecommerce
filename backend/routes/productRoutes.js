const express = require('express');
const { body } = require('express-validator');
const { Product, Category, Vehicle } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validate = require('../middleware/validator');
const router = express.Router();


// recovering products list adding search and limiting 
router.get('/', async (req, res) => {
    try {
        const { categoryId, brand, page = 1, limit = 300 } = req.query;
        const offset = (page - 1) * limit;

        let whereCondition = {};
        if (categoryId) whereCondition.categoryId = categoryId;
        if (brand) whereCondition.brand = brand;

        const products = await Product.findAll({
            where: whereCondition,
            include: [{ model: Category, as: 'category', attributes: ['name'] }],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error recovering products' });
    }
});



// get a specific product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: Category, as: 'category' }
            ]
        });
        if(!product) return res.status(404).json({ message: "Product not found" });
        return res.json(product);
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
});


// obtain the filtered by ID for the selected vehicle
router.get('/filterbyvehicle/:vehicleId', async (req, res) => {
    try {
        const {vehicleId} = req.params;
        const products = await Product.findAll({
            include: [{
                model: Vehicle,
                as: 'compatibleVehicles',
                where: {id: vehicleId},
                attributes: ['brand', 'model', 'engine', 'powerKW', 'fuelType', 'yearStart', 'yearEnd', 'vin']
            }, {
                model: Category,
                as: 'category'
            }]
        });
        res.json(products);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;