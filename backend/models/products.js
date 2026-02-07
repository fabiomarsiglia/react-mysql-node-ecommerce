const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/db.js');

// Products model definition
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sku: {             // unique warehouse code
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
    },
    oemCode: { 
        type: DataTypes.STRING 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // instead of using float, i can have max 10 numbers, with 2 decimals 
        defaultValue: 0.00,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    brand: {
        type: DataTypes.STRING,
    }, 
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
        tableName: 'products',
        timestamps: true,
});


module.exports = Product;
