const {Router} = require('express');
const router = Router();
const transactionController = require('../controllers/TransactionsController')

router.post('/transaction',transactionController.newTransaction);
router.post('/loans')
router.put('/loans')
module.exports = router