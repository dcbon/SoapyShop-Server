const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')
const authentication = require('../middlewares/authentication')



router.get('/', authentication, userCtrl.read)
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)


module.exports = router