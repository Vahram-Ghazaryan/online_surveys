'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.Result, { foreignKey: 'questionId', as: 'results' });
    }
  }
  Question.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'text'
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Ընդհանուր'
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
