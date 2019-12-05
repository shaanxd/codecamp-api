const Sequelize = require('sequelize').Sequelize;

const CONSTANTS = require('../constants/constants');

const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = CONSTANTS;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
