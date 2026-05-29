'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('online_surveys');
    await queryInterface.createTable({
      tableName: 'Questions',
      schema: 'online_surveys'
    }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'text'
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'Ընդհանուր'
      },
      options: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: 'Questions',
      schema: 'online_surveys'
    });
    await queryInterface.dropSchema('online_surveys');
  }
};
