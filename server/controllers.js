const Models = require('../database/models/PGModels');

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
    .then(() => res.end())
    .catch((err) => {
      console.log(err);
      res.end(500);
    });
};

module.exports.get = (req, res) => {
  const { restaurant_id } = req.params;
  Models.Review.findAll({ where: { restaurant_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
};

module.exports.patch = (req, res) => {
  const { review_id } = req.params;
  Models.Review.update(req.body, { where: { review_id } })
    .then(() => res.send('updated'))
    .catch((err) => {
      console.log(err);
      res.end();
    });
}

module.exports.delete = (req, res) => {
  const { review_id } = req.params;
  Models.Review.destroy({ where: { review_id } })
    .then(() => res.send('deleted'))
    .catch((err) => {
      console.log(err);
      res.end();
    });
};
