const { DataTypes, BelongsTo } = require('sequelize');
const sequelize = require('../config/db.js');

// Order Items model definition
const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 }, // forbids negative quantities
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
    },
}, {
    tableName: 'orderItem',
});


module.exports = OrderItem;