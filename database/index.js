const Sequelize = require('sequelize');
const Promise = require('promise');

let sql = new Sequelize('', 'root', '', {
  host: '172.17.0.2',
  dialect: 'mysql',
});

sql.query('CREATE DATABASE IF NOT EXISTS`opentable_reviews`;').then(() => {});

sql = new Sequelize('opentable_reviews', 'root', '', {
  host: '172.17.0.2',
  dialect: 'mysql',
});

const User = sql.define('User', {
  username: {
    type: Sequelize.STRING,
  },
  review_count: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.STRING,
  },
  VIP: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports.sql = sql;
module.exports.User = User;
