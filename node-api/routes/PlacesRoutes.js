const {Router} = require('express');
const router = Router();
const transactionController = require('../controllers/placesController')

router.get('/', transactionController.getPlaces)

module.exports = router;