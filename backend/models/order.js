const { DataTypes } = require('sequelize');
const sequelize = require ('../config/db.js');

// Order model definition
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    shippingAddressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    shippingAddressSnapshot: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true,
});


module.exports = Order;
