const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cartCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationCart, authUser} = require('../middlewares/authorization')


router.use(authentication)

router.post('/', cartCtrl.create)
router.get('/', authUser, cartCtrl.read)

// router.post('/:user/transaction', cartCtrl.checkOut)

router.use(authorizationCart)
router.put('/:id', cartCtrl.update)
router.delete('/:id', cartCtrl.delete)

module.exports = router