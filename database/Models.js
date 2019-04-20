const Sequelize = require('sequelize');
const db = require('../database/index');

const Restaurant = db.define('restaurant', {
  restaurant_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const User = db.define('user', {
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
}, {
  timestamps: false,
});

const Review = db.define('review', {
  restaurant_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
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
  review: {
    type: Sequelize.STRING,
  },
  user_recommended: {
    type: Sequelize.BOOLEAN,
  },
}, {
  timestamps: false,
});

User.hasMany(Review, { foreignKey: 'user_id' });
Restaurant.hasMany(Review, { foreignKey: 'restaurant_id' });

db.sync(); // create the tables in the db with these models

module.exports = {
  Restaurant,
  User,
  Review,
};
