const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userType: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
