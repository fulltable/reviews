const Models = require('../../database/Models');

module.exports = {
  post: //todo,

  get: function(req, res) {
    const { id } = req.params;
    Models.Restaurants.findOne({ where: { restaurant_id: id }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
  },
  
  put: //todo,

  delete://todo,
}