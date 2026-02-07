const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');
const { body } = require('express-validator');
const { Cart, CartItem, Product, Order, OrderItem, Address } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validator');


// get user's cart
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    let cart = await Cart.findOne({
        where: { userId, status: 'active' },
        include: [{
            model: CartItem,
            as: 'items',
            include: [{
            model: Product  
            }]
        }]
    });

    if(!cart) {
        cart = await Cart.create({userId});
    }

    const formattedCart = {
        cartId: cart.id,
        items: cart.items.map(item => ({
            productId: item.Product.id,
            name: item.Product.name,
            brand: item.Product.brand,
            price: Number(item.priceAtAdd),
            quantity: item.quantity,
            subtotal: Number(item.priceAtAdd) * item.quantity
            })),
        total: cart.items.reduce(
            (sum, item) => sum + (item.priceAtAdd * item.quantity),
            0
        )
    };

    res.json(formattedCart);
});

// add product to cart
router.post('/add', authMiddleware, [
    body('productId').isInt().withMessage('productId must be an integer'),
    body('quantity').isInt({min: 1 }).withMessage('quantity must be > 0')
], validate, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // check product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.stock <= 0) {
            return res.status(400).json({ message: 'Product out of stock' });
        }
        
        let cart = await Cart.findOne({
            where: { userId, status: 'active' }
        });
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        const existingItem = await CartItem.findOne({
            where: { cartId: cart.id, productId }
        });

        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock) {
                return res.status(400).json({
                    message: 'Not enough stock available'
                });
            }
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            if (quantity > product.stock) {
                return res.status(400).json({
                    message: 'Not enough stock available'
                });
            }

            await CartItem.create({
                cartId: cart.id,
                productId,
                quantity: quantity,
                priceAtAdd: product.price
            });
        }

        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding product to cart',
            error: error.message
        });
    }
});


// update quantity of item in a cart
router.put('/update', authMiddleware, [
    body('productId').isInt().withMessage('productId must be integer'),
    body('quantity').isInt({min: 1}).withMessage('quantity must be int > 0')
], validate, async (req, res) => {
    try{
        const userId = req.user.id;
        const {productId, quantity} = req.body;

        const cart = await Cart.findOne({ where: {userId, status: 'active'} });
        if(!cart) return res.status(404).json({ message: 'Cart not found' });

        const cartItem = await CartItem.findOne({ where: {cartId: cart.id, productId} });
        if(!cartItem) return res.status(404).json({ message: 'Product not in the cart' });

        const product = await Product.findByPk(productId);
        if(!product) return res.status(404).json({ message: 'Product not found' });

        if(quantity > product.stock) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Quantity updated', productId, quantity });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});


// remove a product from cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const {productId} = req.params;
    const cart = await Cart.findOne({ where: {userId, status: 'active'} });
    if(!cart) return res.status(404).json({ message: 'Cart not found' });

    await CartItem.destroy({
        where: {cartId: cart.id, productId}
    });

    res.json({ message: 'Product removed' })
});


router.post('/checkout', authMiddleware, [
    body('shippingAddressId').isInt().withMessage('shippingAddressId must be an int')
], validate, async (req, res) => {
    const transac = await sequelize.transaction();

    try {
        const userId = req.user.id;
        const { shippingAddressId } = req.body;

        const address = await Address.findOne({
            where: { id: shippingAddressId, userId },
            transaction: transac
        });
        if (!address) {
            await transac.rollback();
            return res.status(400).json({ message: 'Invalid shipping address' });
        }

        const cart = await Cart.findOne({
            where: { userId, status: 'active' },
            include: [{
                model: CartItem,
                as: 'items',
                include: [Product]
            }],
            transaction: transac
        });

        if (!cart || cart.items.length === 0) {
            await transac.rollback();
            return res.status(400).json({ message: 'Cart is empty' });
        }

        for (const item of cart.items) {
            if (item.Product.stock < item.quantity) {
                await transac.rollback();
                return res.status(400).json({
                    message: `Not enough stock for ${item.Product.name}`
                });
            }
        }

        const total = cart.items.reduce(
            (sum, i) => sum + i.quantity * Number(i.priceAtAdd),
            0
        );

        const order = await Order.create({
            userId,
            totalPrice: total,
            status: 'pending',
            shippingAddressId: address.id,
            shippingAddressSnapshot: {
                street: address.street,
                city: address.city,
                zip: address.zip,
                country: address.country
            }
        }, { transaction: transac });

        for (const item of cart.items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.priceAtAdd
            }, { transaction: transac });

            await Product.decrement('stock', {
                by: item.quantity,
                where: { id: item.productId },
                transaction: transac
            });
        }

        cart.status = 'closed';
        await cart.save({ transaction: transac });

        await transac.commit();

        res.json({ message: 'Order created successfully', orderId: order.id });

    } catch (error) {
        await transac.rollback();
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;