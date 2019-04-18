const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');

const db = require('../database/index');

const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.use('/api/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
