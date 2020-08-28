const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cartCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationCart, authUser, authorizationAdm} = require('../middlewares/authorization')


router.use(authentication)

router.post('/', cartCtrl.create)
router.get('/', authUser, cartCtrl.read)
router.get('/history', authUser, cartCtrl.orderHistory)
router.get('/order-history', authorizationAdm, cartCtrl.orderHistoryAdm)

router.use(authorizationCart)
router.put('/checkout', cartCtrl.checkOut)
router.put('/', cartCtrl.update)
router.delete('/', cartCtrl.delete)

module.exports = router