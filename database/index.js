const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  '',
  {
    dialect: 'postgres',
  }
);

module.exports = db;
