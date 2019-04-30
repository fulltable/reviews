const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: '54.241.169.67',
    port: 5432, // postgres
    dialect: 'postgres',
  }
);

module.exports = db;
