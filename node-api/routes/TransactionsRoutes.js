const {Router} = require('express');
const router = Router();
const transactionController = require('../controllers/TransactionsController')

router.post('/new',transactionController.newTransaction);
module.exports = router