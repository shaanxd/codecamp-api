const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Question = sequelize.define('question', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  difficulty: {
    type: Sequelize.STRING,
    allowNull: false
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Question;
