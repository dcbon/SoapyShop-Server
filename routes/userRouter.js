const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')



router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.use(authentication)
router.use(authorization)
router.get('/', userCtrl.read)
router.delete('/:id', userCtrl.delete)


module.exports = router