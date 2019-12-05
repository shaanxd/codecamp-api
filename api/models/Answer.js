const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Answer = sequelize.define('answer', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isCorrect: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Answer;
