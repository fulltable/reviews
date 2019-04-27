const faker = require('faker');
const moment = require('moment');

const generateRestaurantId = (context, events, done) => {
  const restaurantId = Math.floor(Math.random() * 10000000) + 1;
  context.vars.restaurantId = restaurantId;
  return done();
}

const setRequestBody = ( context, ee, next) => {
  const user_id = Math.floor(Math.random() * 10000000) + 1;
  const overall_score = Math.floor(Math.random() * 5) + 1;
  const food_score = Math.floor(Math.random() * 5) + 1;
  const service_score = Math.floor(Math.random() * 5) + 1;
  const ambience_score = Math.floor(Math.random() * 5) + 1;
  const value_score = Math.floor(Math.random() * 5) + 1;
  const date_dined = moment().format('YYYY-MM-DD');
  const review = faker.lorem.sentence();
  const user_recommended = faker.random.boolean();

  context.vars.user_id = user_id;
  context.vars.overall_score = overall_score;
  context.vars.food_score = food_score;
  context.vars.service_score = service_score;
  context.vars.ambience_score = ambience_score;
  context.vars.value_score = value_score;
  context.vars.date_dined = date_dined;
  context.vars.review = review;
  context.vars.user_recommended = user_recommended;

  return next(); // MUST be called for the scenario to continue
};

module.exports = {
  generateRestaurantId,
  setRequestBody,
};
