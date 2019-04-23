const faker = require('faker');
const fs = require('fs');
const moment = require('moment');
const cassandra = require('express-cassandra');

// manage build up of write stream buffer
const writeNTimes = (writer, dataGenerator, db, encoding, callback, start, stop) => {
  let i = start;
  stop = stop || 0;
  write();
  function write() {
    let ok = true;
    do {
      const data = dataGenerator(i, db).concat('\n');
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

const createReview = (i, db) => {
  const overall_score = Math.floor(Math.random() * 5) + 1;
  const food_score = Math.floor(Math.random() * 5) + 1;
  const service_score = Math.floor(Math.random() * 5) + 1;
  const ambience_score = Math.floor(Math.random() * 5) + 1;
  const value_score = Math.floor(Math.random() * 5) + 1;
  const date_dined = moment().format('YYYY-MM-DD');
  const review = faker.lorem.sentence();
  const user_recommended = faker.random.boolean();
  const username = faker.name.firstName();
  const review_count = Math.floor(Math.random() * 50) + 1;
  const vip = faker.random.boolean();
  const location = faker.address.country();
  const restaurant_id = Math.floor(Math.random() * 10000000) + 1;
  const id = (db === 'pg') ? i : cassandra.timeuuid();

  const reviewData = [];

  if (db === 'pg') {
    reviewData.push(
      id,
      restaurant_id,
      overall_score,
      food_score,
      service_score,
      ambience_score,
      value_score,
      date_dined,
      user_recommended,
      review,
      username,
      review_count,
      location,
      vip
    );
  } else {
    reviewData.push(
      restaurant_id, // partition key for cassandra
      id, // clustering key for cassandra
      ambience_score,
      date_dined,
      food_score,
      location,
      overall_score,
      review,
      review_count,
      service_score,
      user_recommended,
      username,
      value_score,
      vip
    );
  }
  return reviewData.join('@');
};

const reviewsWriteStream = fs.createWriteStream('reviews_pg.csv');

writeNTimes(reviewsWriteStream, createReview, 'ca', 'utf8', () => console.log('created reviews'), 10);
