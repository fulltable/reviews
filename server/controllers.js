/*eslint-disable*/
const db = require('../database/index');
const Models = require('../database/Models');

module.exports.post = (req, res) => {
  const { restaurant_id } = req.params;
  const { body } = req;

  Models.Review.create({
    restaurant_id,
    user_id: body.user_id,
    overall_score: body.overall_score,
    food_score: body.food_score,
    service_score: body.service_score,
    ambience_score: body.ambience_score,
    value_score: body.value_score,
    date_dined: body.date_dined,
    review: body.review,
    user_recommended: body.user_recommended,
  })
    .then(() => {
      db.query('UPDATE users SET review_count = review_count + 1 WHERE id = ?;',
        { replacements: [body.user_id] }
      );
    })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.get = (req, res) => {
  const { restaurant_id } = req.params;
  db.query('SELECT reviews.*, users.* FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE restaurant_id = ?;',
    { replacements: [restaurant_id] }
  )
   .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.patch = (req, res) => {
  const { review_id } = req.params;
  Models.Review.update(req.body, { where: { id: review_id } })
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}

module.exports.delete = (req, res) => {
  const { review_id } = req.params;
  db.query('SELECT user_id FROM reviews where id = ?;',
    { replacements: [review_id] }
  )
    .then((result) => {
      console.log(result[0]);
      db.query('UPDATE users SET review_count = review_count - 1 WHERE id = ?',
        {replacements: [result[0][0].user_id] } // index into result object
      );
    })
    .then(() => {
      db.query('DELETE FROM reviews WHERE id = ?',
        { replacements: [review_id] }
      )
    })
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
