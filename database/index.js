const Sequelize = require('sequelize');

const db = new Sequelize('test_reviews', 'root', '', {
  dialect: 'mysql',
});

module.exports = db;
