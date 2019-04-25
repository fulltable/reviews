const Sequelize = require('sequelize');
const { pg } = require('./index');

const Review = pg.define('review', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  restaurant_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  overall_score: {
    type: Sequelize.INTEGER,
  },
  food_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  service_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  ambience_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  value_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  date_dined: {
    type: Sequelize.DATEONLY,
  },
  user_recommended: {
    type: Sequelize.BOOLEAN,
  },
  review: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  review_count: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.STRING,
  },
  vip: {
    type: Sequelize.BOOLEAN,
  },
}, {
  timestamps: false,
});

//pg.sync(); // uncomment on initial set up to create tables

module.exports.Review = Review;
