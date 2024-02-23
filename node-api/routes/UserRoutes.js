const userControll = require('../controllers/UserController')
const { Router } = require("express")
const router = Router();

router.get('/login', userControll.login)
router.post('/update', userControll.updateUser)
router.get('/transactions', userControll.getUserTransactions)
router.post('/new', userControll.createUser)
module.exports = router;