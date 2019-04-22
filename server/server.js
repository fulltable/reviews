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

app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/restaurants/:restaurant_id', controllers.get);
app.post('/restaurants/:restaurant_id', controllers.post);
app.patch('/reviews/:id', controllers.patch);
app.delete('/reviews/:id', controllers.delete);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
