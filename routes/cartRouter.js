const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cartCtrl')
const authentication = require('../middlewares/authentication')
const {authUser, authorizationAdm, authorizationCart } = require('../middlewares/authorization')


router.use(authentication)

router.post('/', cartCtrl.create)
router.get('/', authUser, cartCtrl.read)
router.get('/history', authUser, cartCtrl.orderHistory)
router.get('/order-history', authorizationAdm, cartCtrl.orderHistoryAdm)

router.put('/checkout', cartCtrl.checkOut)
router.put('/', authorizationCart, cartCtrl.update)
router.delete('/', authorizationCart, cartCtrl.delete)

module.exports = router