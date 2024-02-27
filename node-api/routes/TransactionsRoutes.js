const {Router} = require('express');
const router = Router();
const transactionController = require('../controllers/TransactionsController')

router.post('/',transactionController.newTransaction);
router.get('/usermade',transactionController.getUserTransactions);
router.get('/usergot',transactionController.getUserRecived);
router.post('/loans')
router.put('/loans')
module.exports = router