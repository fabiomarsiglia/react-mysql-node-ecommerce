const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// CartItem model definition
const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtAdd: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }, 
}, {
        tableName: 'cartItem',
        timestamps: true,
});

module.exports = CartItem;