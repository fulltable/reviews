const express = require('express');
const morgan = require('morgan');
const path = require('path');
const controllers = require('./controllers');

const db = require('../database/index');

const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/restaurants/:id', express.static('client/dist'));
app.use('/', express.static('client/dist'));

app.get('/api/restaurants/:restaurant_id', controllers.get);
app.post('/api/restaurants/:restaurant_id', controllers.post);
app.patch('/api/restaurants/:restaurant_id/reviews/:review_id', controllers.patch);
app.delete('/api/restaurants/:restaurant_id/reviews/:review_id', controllers.delete);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
