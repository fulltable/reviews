const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

// manage build up of write stream buffer
const writeNTimes = (writer, dataGenerator, encoding, callback, start, stop) => {
  let i = start;
  stop = stop || 0;
  write();
  function write() {
    let ok = true;
    do {
      const data = dataGenerator(i).concat('\n');
      i -= 1;
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
  const restaurant_id = Math.floor(Math.random() * 10000000) + 1;
  const user_id = Math.floor(Math.random() * 10000000) + 1;
  const overall_score = Math.floor(Math.random() * 5) + 1;
  const food_score = Math.floor(Math.random() * 5) + 1;
  const service_score = Math.floor(Math.random() * 5) + 1;
  const ambience_score = Math.floor(Math.random() * 5) + 1;
  const value_score = Math.floor(Math.random() * 5) + 1;
  const date_dined = moment().format('YYYY-MM-DD');
  const review = faker.lorem.sentence();
  const user_recommended = faker.random.boolean();

  const reviewData = [];
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

  return reviewData.join('@');
};

const createRestaurant = (id) => {
  const restaurant_name = faker.commerce.productAdjective() + ' ' + faker.commerce.product();

  const restaurantData = [];
  restaurantData.push(
    id,
    restaurant_name
  );

  return restaurantData.join('@');
};

const createUser = (id) => {
  const username = faker.name.firstName();
  const review_count = Math.floor(Math.random() * 50) + 1;
  const location = faker.address.country();
  const vip = faker.random.boolean();

  const userData = [];
  userData.push(
    id,
    username,
    review_count,
    location,
    vip
  );

  return userData.join('@');
};

const reviewsWriteStream = fs.createWriteStream('reviews.csv');
const usersWriteStream = fs.createWriteStream('users.csv');
const restaurantsWriteStream = fs.createWriteStream('restaurants.csv');


// initial seeding parameters below, alter start and stop values to increase number of records generated
writeNTimes(reviewsWriteStream, createReview, 'utf8', () => console.log('created reviews'), 10000000);
writeNTimes(usersWriteStream, createUser, 'utf8', () => console.log('created users'), 10000000);
writeNTimes(restaurantsWriteStream, createRestaurant, 'utf8', () => console.log('created restaurants'), 10000000);
