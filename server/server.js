const express = require('express');
const morgan = require('morgan');
const controllers = require('./controllers');

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/restaurants/:id', express.static('client/dist'));
app.use('/', express.static('client/dist'));

app.post('/api/restaurants/:restaurant_id', controllers.post);
app.get('/api/restaurants/:restaurant_id', controllers.get);
app.patch('/api/reviews/:review_id', controllers.patch);
app.delete('/api/reviews/:review_id', controllers.delete);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
