const userControll = require('../controllers/UserController')
const { Router } = require("express")
const router = Router();

router.get('/login', userControll.login)
router.post('/update', userControll.updateUser)
router.get('/transactions', userControll.getUserTransactions)
router.post('/new', userControll.createUser)
router.delete('/phone', userControll.deletePhone)
router.post('/phone', userControll.addPhone)
router.put('/phone', userControll.updatePhone)
router.post('/address',userControll.addAddress)
router.put('/address',userControll.updateAddress)
router.delete('/address', userControll.deleteAddress)
module.exports = router;