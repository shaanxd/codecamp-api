const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Examination = sequelize.define('exam', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  easyQuestionCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  moderateQuestionCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  advanceQuestionCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  durationInMinutes: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Examination;
