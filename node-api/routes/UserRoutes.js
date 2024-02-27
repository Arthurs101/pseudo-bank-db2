const userControll = require('../controllers/UserController')
const { Router } = require("express")
const router = Router();

router.post('/login', userControll.login)
router.put('/update', userControll.updateUser)
router.post('/new', userControll.createUser)
router.delete('/phone', userControll.deletePhone)
router.post('/phone', userControll.addPhone)
router.put('/phone', userControll.updatePhone)
router.post('/address',userControll.addAddress)
router.put('/address',userControll.updateAddress)
router.delete('/address', userControll.deleteAddress)
router.post('/account', userControll.addAccount)
module.exports = router;