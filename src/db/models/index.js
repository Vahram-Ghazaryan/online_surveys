'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
const sequelizeOptions = { ...config };
sequelizeOptions.define = {
  ...(sequelizeOptions.define || {}),
  schema: 'online_surveys'
};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], sequelizeOptions);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, sequelizeOptions);
}

const Question = require('./question')(sequelize, Sequelize.DataTypes);
const Participant = require('./participant')(sequelize, Sequelize.DataTypes);
const Result = require('./result')(sequelize, Sequelize.DataTypes);

db.Question = Question;
db.Participant = Participant;
db.Result = Result;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
