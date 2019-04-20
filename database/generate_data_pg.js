const faker = require('faker');
const fs = require('fs');
const moment = require('moment');
const db = require('./index');

// manage build up of write stream buffer
const writeNTimes = (writer, dataGenerator, encoding, callback, start, stop) => {
  let i = start;
  stop = stop || 0;
  write();
  function write() {
    let ok = true;
    do {
      const data = dataGenerator(i) + '\n';
      i--;
      if (i === stop) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > stop && ok);
    if (i > stop) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
};

const createReview = (id) => {
  const restaurant_id = faker.random.number({
    min: 1,
    max: 10000000,
  });
  const user_id = faker.random.number({
    min: 1,
    max: 10000000,
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
  const date_dined = moment().format('MMMM DD YYYY');
  const review = faker.lorem.sentence();
  const user_recommended = faker.random.boolean();
  
  let reviewData = [];
  reviewData.push(
    id,
    restaurant_id,
    user_id,
    overall_score,
    food_score,
    service_score,
    ambience_score,
    value_score,
    date_dined,
    review,
    user_recommended
  );
  return reviewData.join(',');
};

const createRestaurant = (id) => {
  let restaurantData = [];
  const restaurant_id = id;
  const restaurant_name = faker.commerce.productAdjective() + ' ' + faker.commerce.product();

  restaurantData.push(
    restaurant_id,
    restaurant_name
  );

  return restaurantData.join(',');
};

const createUser = (id) => {
  let userData = [];
  const user_id = id;
  const username = faker.name.firstName();
  const review_count = faker.random.number({
    min: 1,
    max: 50,
  });
  const location = faker.address.cityPrefix();
  const vip = faker.random.boolean();

  userData.push(
    user_id,
    username,
    review_count,
    location,
    vip
  );

  return userData.join(',');
};

//const restaurantsWriteStream = fs.createWriteStream('restaurants.csv');
//const usersWriteStream = fs.createWriteStream('users.csv');
const reviewsWriteStream = fs.createWriteStream('reviews.csv');

//writeNTimes(restaurantsWriteStream, createRestaurant, 'utf8', () => console.log('created restaurants'), 10000000);
//writeNTimes(usersWriteStream, createUser, 'utf8', () => console.log('created users'), 10000000);
writeNTimes(reviewsWriteStream, createReview, 'utf8', () => console.log('created reviews'), 30000000, 20000000);
