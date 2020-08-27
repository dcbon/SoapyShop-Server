const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationAdm, authUser} = require('../middlewares/authorization')



router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)

router.use(authentication)

router.get('/:user/transaction', authUser, userCtrl.readTrans)

router.use(authorizationAdm)
router.get('/all-transaction', userCtrl.readTransAdm)
router.delete('/transaction/:id', userCtrl.deleteTrans)
router.get('/', userCtrl.read)
router.delete('/:id', userCtrl.delete)


module.exports = router