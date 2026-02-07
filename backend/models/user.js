// connect to database 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');   
const bcrypt = require('bcrypt');

// User model definition
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,    
    primaryKey: true, 
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,   // email cannot be null
    unique: true,       // email must be unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user', // default role is 'user'
    },
}, {
  tableName: 'users', // specify custom table name
  hooks: {
    // Before creating the user, hash the password [SECURITY]
    beforeCreate: async (user) => {
      const func = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, func);
    },
    // Before uptading the password, hash the new password [SECURITY]
    beforeUpdate: async (user) => {
      if(user.changed('password')) {
        const func = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, func);
      }
    }
  },
  timestamps: true,   // adds createdAt and updatedAt fields
});

module.exports = User;