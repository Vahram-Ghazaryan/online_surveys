'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      Result.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
      Result.belongsTo(models.Participant, { foreignKey: 'participantId', as: 'participant' });
    }
  }
  Result.init({
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};
