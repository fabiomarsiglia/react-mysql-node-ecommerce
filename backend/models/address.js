const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Address model definition
const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.ENUM('shipping', 'billing', 'home'),
        allowNull: false,
        defaultValue: 'home',
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDefault: {          // is_default: useful to select user's favourite address during checkuot in the frontend
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'address',
});


module.exports = Address;