const express = require('express');
const { body } = require('express-validator');
const { Product, Category, Vehicle } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validate = require('../middleware/validator');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.json(categories);
    } catch(error) {
        return res.status(500).json({ message: 'Error recovering category' })
    }
});



module.exports = router;
