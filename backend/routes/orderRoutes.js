const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { Order, OrderItem, Product, Address } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validate = require('../middleware/validator');


// get user's orders
router.get('/my-orders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'brand', 'price']
                }]
            }],
            order: [['createdAt', 'DESC']]
        });

        const formattedOrders = orders.map(order => ({
            id: order.id,
            status: order.status,
            total: order.totalPrice,
            createdAt: order.createdAt,
            items: order.OrderItems.map(item => ({
                productId: item.Product.id,
                name: item.Product.name,
                brand: item.Product.brand,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            }))
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({
            message: 'Error while recovering orders',
            error: error.message
        });
    }
});


// cancel order
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        const order = await Order.findOne({
            where: { id: orderId, userId },
            include: [{
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'brand', 'stock', 'price']
                }]
            }]
        });
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

       if(order.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending order can be cancelled' });
       }
       for(const item of order.OrderItems) {
        await Product.increment('stock', {
            by: item.quantity,
            where: {id: item.productId}
        });
       }
       order.status = 'cancelled';
       await order.save();

        res.json({ message: 'order cancelled successfully', orderId: order.id });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
});


// pay order
router.post('/:id/pay', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        
        const order = await Order.findOne({
            where: { id: orderId, userId },
            include: [{
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'brand', 'stock', 'price']
                }]
            }]
        });
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if(order.status !== 'pending') {
            return res.status(400).json({ message: 'Only pending orders can be paid' });
        }

        order.status = 'paid';
        await order.save();

        res.json({ message: 'order paid successfully' });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
});


// check single order
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        
        const order = await Order.findOne({
            where: { id: orderId, userId },
            include: [{
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'brand', 'price']
                }]
            }]
        });
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const formattedOrders = {
            id: order.id,
            status: order.status,
            total: Number(order.totalPrice),
            createdAt: order.createdAt,
            items: order.OrderItems.map(item => ({
                productId: item.Product.id,
                name: item.Product.name,
                brand: item.Product.brand,
                price: Number(item.Product.price),
                quantity: item.quantity,
                subtotal: Number(item.price) * item.quantity
            }))
        };

        res.json(formattedOrders);
    } catch(error) {
        res.status(500).json({ message: 'Error while retrieving order', error: error.message });
    }
});


// link the shipping address to an order
router.post('/:id/address', authMiddleware, [
    body('addressId').isInt().withMessage('addressId must be an int')
], validate, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const { addressId } = req.body;

        const order = await Order.findOne({
            where: { id: orderId, userId }
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.status !== 'paid') {
            return res.status(400).json({
                message: 'Address can be added only to paid orders'
            });
        }
        const address = await Address.findOne({
            where: { id: addressId, userId }
        });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        order.shippingAddressId = address.id;
        await order.save();

        res.json({
            message: 'Shipping address attached successfully',
            orderId: order.id,
            addressId: address.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;
