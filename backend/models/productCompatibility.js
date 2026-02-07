const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Product COmpatibility definition
const ProductCompatibility = sequelize.define('ProductCompatibility', {}, {
    tableName: 'productCompatibility',
    timestamp: false,
});



module.exports = ProductCompatibility;