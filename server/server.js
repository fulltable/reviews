require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const controllers = require('./controllers');

const port = process.env.PORT || 3001;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/restaurants/:id', express.static('client/dist'));
app.use('/', express.static('client/dist'));

app.get('/loaderio-3d3088ddc0ff5e3f736d9af2b3c81ff8/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/loaderio-3d3088ddc0ff5e3f736d9af2b3c81ff8.txt'));
})

app.post('/api/restaurants/:restaurant_id/reviews', controllers.post);
app.get('/api/restaurants/:restaurant_id/reviews', controllers.get);
app.patch('/api/restaurants/:restaurant_id/reviews/:review_id', controllers.patch);
app.delete('/api/restaurants/:restaurant_id/reviews/:review_id', controllers.delete);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
