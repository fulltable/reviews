const faker = require('faker');
//const db = require('./index.js');
const Models = require('./Models');

const seedRestaurants = () => {
  for (let i = 0; i < 100; i += 1) {
    const restaurant_name = faker.lorem.word();
    Models.Restaurant.create({ restaurant_name })
      .catch(err => console.error(err));
  }
};

const seedUsernames = () => {
  for (let i = 0; i < 400; i += 1) {
    const username = faker.name.firstName();
    const review_count = faker.random.number({
      min: 10,
      max: 40,
    });
    const location = 'San Francisco';
    const vip = faker.random.boolean();
    Models.User.create({
      username,
      review_count,
      location,
      VIP: vip,
    })
      .catch(err => console.error(err));
  }
};

const seedReviews = () => {
  for (let i = 0; i < 300; i += 1) {
    const restaurant_id = faker.random.number({
      min: 1,
      max: 100,
    });
    const user_id = faker.random.number({
      min: 1,
      max: 100,
    });
    const overall_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const food_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const service_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const ambience_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const value_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const date_dined = faker.date.between('2015-01-01', '2019-03-31');
    const review = faker.lorem.sentence();
    const user_recommended = faker.random.boolean();
    Models.Review.create({
      restaurant_id,
      user_id,
      overall_score,
      food_score,
      service_score,
      ambience_score,
      value_score,
      date_dined,
      review,
      user_recommended,
    })
      .catch(err => console.error(err));
  }
};
// sync required if tables have not been created yet in db
db.sync()
  .then(() => {
    seedRestaurants();
    seedUsernames();
    seedReviews();
    seedReviewsHigher();
  })
  .catch((err) => {
    console.error(err);
    db.close();
  });
