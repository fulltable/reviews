const generateRestaurantId = (userContext, events, done) => {
  const restaurantId = Math.floor(Math.random() * 10000000) + 1;
  userContext.vars.restaurantId = restaurantId;
  return done();
}

module.exports = {
  generateRestaurantId,
};
