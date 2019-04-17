const Models = require('../../database/Models');

module.exports = {
  post: null,

  get: function(req, res) {
    const { id } = req.params;
    Models.Review.findAll({ where: { restaurant_id: id }, include: [Models.User] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
  },
  
  put: null,

  delete: null,
}
