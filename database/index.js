const Sequelize = require('sequelize');

const pg = new Sequelize(
  'fulltable',
  'evankaplan',
  '',
  {
    dialect: 'postgres',
  }
);

module.exports.pg = pg;
