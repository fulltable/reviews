const router = require('express').Router();

const Reviews = require('./controllers/reviews');

router.get('/restaurants/:restaurant_id', Reviews.get);
router.post('/restaurants/:restaurant_id', Reviews.post);
router.patch('/reviews/:id', Reviews.patch);
router.delete('/reviews/:id', Reviews.delete);

module.exports = router;
