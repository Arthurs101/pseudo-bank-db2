const userControll = require('../controllers/UserController')
const { Router } = require("express")
const router = Router();

router.post('/login', userControll.login)
router.post('/update', userControll.updateUser)
module.exports = router;