const Sequelize = require('sequelize');

const db = new Sequelize(
  'fulltable',
  'evankaplan',
  '',
  {
    dialect: 'postgres',
  }
);

module.exports = db;
