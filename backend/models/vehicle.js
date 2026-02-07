const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Vechile model definiton
const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleType: {
        type: DataTypes.ENUM('auto', 'bici'),
        allowNull: false,
        defaultValue: 'auto'
    },
    engine: {
        type: DataTypes.STRING,
    },
    engineCode: {
        type: DataTypes.STRING,
    },
    powerKW: {
        type: DataTypes.INTEGER,
    },
    fuelType: {
        type: DataTypes.ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid'),
        allowNull: true
    },
    yearStart: {
        type: DataTypes.INTEGER,
    },
    yearEnd: {
        type: DataTypes.INTEGER,
    },
    vin: {
        type: DataTypes.STRING(17),
        unique: true,
    },
}, {
    tableName: 'vehicles',
});

module.exports = Vehicle;