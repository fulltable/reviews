/* table schemas for referece */

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER, /* foreign key to restaurant table */
  user_id INTEGER, /* foreign key to user table */
  overall_score INTEGER,
  food_score INTEGER,
  service_score INTEGER,
  ambience_score INTEGER,
  value_score INTEGER,
  date_dined DATE,
  review VARCHAR,
  user_recommended BOOLEAN
);

CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  restaurant_name varchar
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  review_count INTEGER,
  location VARCHAR,
  vip BOOLEAN
);

/*

Foreign key commands:
ALTER TABLE reviews ADD CONSTRAINT restaurant_fk FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) ON DELETE CASCADE;
ALTER TABLE reviews ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

Update autoincrement values after seeding:
SELECT setval('reviews_id_seq', 100000000);
SELECT setval('restaurants_id_seq', 10000000);
SELECT setval('users_id_seq', 10000000);

Create Indexes to speed up queries:

CREATE INDEX idx_restaurant_id ON reviews(restaurant_id);
CREATE INDEX idx_restaurant_name ON restaurants(restaurant_name);
CREATE INDEX idx_user_name ON users(username);

*/