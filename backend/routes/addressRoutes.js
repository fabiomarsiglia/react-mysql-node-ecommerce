const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { Address } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validate = require('../middleware/validator');



// create address
router.post('/', authMiddleware, [
    body('street').notEmpty().withMessage('Street field required'),
    body('city').notEmpty().withMessage('City field is required'),
    body('zip').notEmpty().withMessage('Zip is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('isDefault').optional().isBoolean(),
    body('type').optional().isString()
], validate, async (req, res) => {
    try {
        const userId = req.user.id;
        const {type, street, city, zip, country, isDefault} = req.body;

        if(isDefault) {
            await Address.update(
                {isDefault: false},
                {where: {userId}}
            );
        }
        const address = await Address.create({
            userId,
            type,
            street,
            city,
            zip,
            country,
            isDefault: !!isDefault
        });

        res.status(201).json(address);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});


// reas user addresses
router.get('/', authMiddleware, async (req, res) => {
    const addresses = await Address.findAll({
        where: {userId: req.user.id},
        order: [['isDefault', 'DESC']]
    });

    res.json(addresses);
});


// setting default address
router.patch('/:id/default', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const addressId = req.params.id;
    
    const address = await Address.findOne({
        where: {id: addressId, userId}
    });
    if(!address) {
        return res.status(404).json({ message: 'Address not found' });
    }

    await Address.update(
        {isDefault: false},
        {where: {userId}}
    );

    address.isDefault = true;
    await address.save();

    res.json({ message: 'Default address set' });
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.id;
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId
            }
        });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        await address.destroy();

        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;