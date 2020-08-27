const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cartCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationCart, authorizationTrans, authUser} = require('../middlewares/authorization')


router.use(authentication)
router.use(authUser)

router.post('/', cartCtrl.create)
router.get('/', cartCtrl.read)

router.post('/:user/transaction', authorizationTrans, cartCtrl.checkOut)

router.use(authorizationCart)
router.put('/:id', cartCtrl.update)
router.delete('/:id', cartCtrl.delete)

module.exports = router