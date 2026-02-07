const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


// Cart mode definition
const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'closed'),
        defaultValue: 'active',
    },
 }, {
        tableName: 'cart',
        timestamps: true,   
});


module.exports = Cart;