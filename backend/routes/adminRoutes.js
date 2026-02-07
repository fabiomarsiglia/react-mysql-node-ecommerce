const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const sequelize = require('../config/db');
const {Cart, CartItem, Category, User, Order, OrderItem, Address, Product, Vehicle, ProductCompatibility} = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {body} = require('express-validator');
const validate = require('../middleware/validator');

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));



// dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalRevenue = await Order.sum('totalPrice', { where: { status: ['paid', 'completed'] } });
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const ordersToday = await Order.count({ where: { createdAt: { [Op.gte]: todayStart } } });
    const revenueToday = await Order.sum('totalPrice', { 
      where: { 
        createdAt: { [Op.gte]: todayStart },
        status: ['paid', 'completed']
      } 
    });
    const lowStockProducts = await Product.count({ where: { stock: { [Op.lt]: 10 } } });
    const pendingOrders = await Order.count({ where: { status: 'pending' } });

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue || 0,
      ordersToday,
      revenueToday: revenueToday || 0,
      lowStockProducts,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// low stock report
router.get('/reports/low-stock', async (req, res) => {
  try {
    const { threshold = 10 } = req.query;
    
    const products = await Product.findAll({
      where: { stock: { [Op.lt]: threshold } },
      include: [{ model: Category, as: 'category', attributes: ['name'] }],
      order: [['stock', 'ASC']]
    });
    
    res.json({
      products,
      total: products.length,
      threshold
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create new category - ADMIN
router.post('/add-category', [
    body('name').notEmpty().withMessage('Category name required')
], validate, async (req, res) => {
    try {
        const {name} = req.body;
        const newCategory = await Category.create({name});
        res.status(201).json(newCategory);
    } catch(error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
});

// delete category
router.delete('/category/:id', async (req, res) => {
    try {
        const deleted = await Category.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            return res.json({ message: "Category removed successfully" });
        }
        return res.status(404).json({ message: "Category not found" });
    } catch (error) {
        return res.status(500).json({ message: "Error: verify the category doesn't have any product linked to it", error: error.message });
    }
});

// ADMIN modify order status
router.patch('/orders/:id/status', [
    body('status').isIn(['pending', 'paid', 'shipped', 'completed', 'cancelled']).withMessage('invalid status')
], validate, async (req, res) => {
    const {status} = req.body;

    const order = await Order.findByPk(req.params.id);
    if(!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if (status === 'shipped' && order.status !== 'paid') {
        return res.status(400).json({ message: 'Order must be paid before shipping' });
    }

    if (status === 'completed' && order.status !== 'shipped') {
        return res.status(400).json({ message: 'Order must be shipped before completion' });
    }

    if (status === 'paid' && order.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending orders can be paid' });
    }

    if (status === 'cancelled' && order.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    order.status = status;
    await order.save();
    res.json({ message: 'Order status updated', status });
});

// create new product - ADMIN
router.post('/', [
    body('sku').notEmpty().withMessage('SKU is necessary'),
    body('oemCode').optional().isString().withMessage('OEM invalid'),
    body('name').notEmpty().withMessage('Name necessary'),
    body('brand').isString().withMessage('Invalid brand'),
    body('price').isFloat({gt: 0}).withMessage('Invalid Price'),
    body('stock').optional().isInt({min: 0}).withMessage('Invalid stock'),
    body('categoryId').isInt().withMessage('Invalid category')
], validate, async (req, res) => {
    try {
        const { sku, oemCode, name, brand, price, stock, categoryId, description } = req.body;
     
        const newProduct = await Product.create({
            sku,
            oemCode,
            name,
            brand,
            price,
            stock: stock || 0,
            categoryId,
            description
        });

        res.status(201).json(newProduct);
    } catch(error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Error: SKU already exists' });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// update product - ADMIN
router.put('/:id', [
    body('price').optional().isFloat({gt: 0}).withMessage('Invalid price'),
    body('stock').optional().isInt({min: 0}).withMessage('Invalid stock')
], validate, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });

        const { sku, oemCode, name, brand, price, stock, categoryId, description } = req.body;
        await product.update({ sku, oemCode, name, brand, price, stock, categoryId, description });
        return res.json({ message: "Product updated", product });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
});

// delete product - ADMIN
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });

        if(deleted) {
            return res.json({ message: "Product removed successfully" });
        }
        return res.status(404).json({ message: "Product not found" });
    } catch (error) {
        return res.status(500).json({ message: "Error while removing", error: error.message });
    }
});

// restock product - ADMIN
router.patch('/:id/restock', [
    body('quantity').isInt({gt: 0}).withMessage('Quantity must be positive')
], validate, async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.stock += quantity;
        await product.save();

        res.json({
            message: 'Product restocked successfully',
            product: {
                id: product.id,
                name: product.name,
                stock: product.stock
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error while restocking product',
            error: error.message
        });
    }
});

// link product to vehicle - ADMIN
router.post('/compatibility', [
    body('productId').isInt().withMessage('Invalid productId'),
    body('vehicleId').isInt().withMessage('Invalid vehicleId')
], validate, async (req, res) => {
    try {
        const {productId, vehicleId, notes} = req.body;
        
        const compatibility = await ProductCompatibility.create({
            productId,
            vehicleId,
            notes
        });
        res.status(201).json({ message: "Link created correctly", compatibility });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// ADMIN get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                },
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        
        res.json(orders.map(order => ({
            id: order.id,
            status: order.status,
            total: order.totalPrice,
            createdAt: order.createdAt,
            user: order.User ? {
                name: order.User.name,
                email: order.User.email
            } : null,
            items: order.OrderItems.map(i => ({
                productId: i.productId,
                name: i.Product.name,
                price: i.price,
                quantity: i.quantity
            }))
        })));
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// create vehicle - ADMIN
router.post('/addvehicle', [
    body('brand').notEmpty().withMessage('Brand is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('engine').notEmpty().withMessage('Engine is required'),
    body('yearStart').isInt().withMessage('yearStart must be an integer'),
    body('yearEnd').optional().isInt().withMessage('yearEnd must be an integer')
], validate, async(req, res) => {
    try {
      const { brand, model, engine, yearStart, yearEnd, vehicleType, powerKW, fuelType, vin } = req.body;

      const vehicle = await Vehicle.create({
        brand,
        model,
        engine,
        yearStart,
        yearEnd,
        vehicleType: vehicleType || 'auto',
        powerKW,
        fuelType,
        vin
      });
      res.status(201).json(vehicle);
    } catch(error) {
        res.status(500).json({ message: "Internal error", error: error.message });
    }
});

module.exports = router;
