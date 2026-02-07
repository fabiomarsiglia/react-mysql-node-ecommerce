const sequelize = require('../config/db');
const User = require('./user');
const Product = require('./products');
const Category = require('./category');
const Vehicle = require('./vehicle');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Address = require('./address');
const ProductCompatibility = require('./productCompatibility');
const Cart = require('./cart');
const CartItem = require('./cartItem');

// Foreign key definition; 
Address.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Address, { foreignKey: 'userId' });
Order.belongsTo(Address, { foreignKey: 'shippingAddressId', as: 'shippingAddress' });
Address.hasMany(Order, { foreignKey: 'shippingAddressId' });

// Foreign key definition; one order has one user linked to it, while many orders can be linked to a single user
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, {foreignKey: 'userId'});

// Foreign key relations; 1orderItem->many Orders; 1orderItem->many Products; every Order->many orderItems
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

// Foreign key definition; one product has one category, while one category has many products
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// N:N relation; allows me to have a product linked to many different vehicles
Product.belongsToMany(Vehicle, { through: ProductCompatibility, as: 'compatibleVehicles', foreignKey: 'productId'});
Vehicle.belongsToMany(Product, { through: ProductCompatibility, as: 'compatibleProducts', foreignKey: 'vehicleId' });



User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// CART → ITEMS
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// PRODUCT → ITEMS
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });



module.exports = {
    sequelize,
    User,
    Product,
    Category,
    Vehicle,
    ProductCompatibility,
    Order,
    OrderItem,
    Address,
    Cart,
    CartItem
};