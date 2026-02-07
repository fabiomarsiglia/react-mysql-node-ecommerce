const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Category model definition
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'categories',
    timestamps: false,
});

module.exports = Category;