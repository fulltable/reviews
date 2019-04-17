const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const Models = require('../database/Models');
const Reviews = require('./Controllers/reviews');

const db = require('../database/index');

// db.sql.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch(err => console.log('Database connection error: ' + err));

const port = 3001;
const app = express();

app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(morgan('dev'));

app.get('/api/reviews/:id/', (req, res) => {
  Reviews.get(req, res);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
