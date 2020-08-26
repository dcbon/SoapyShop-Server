const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cartCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationCart} = require('../middlewares/authorization')


router.use(authentication)

router.post('/', cartCtrl.create)
router.get('/:UserId', authorizationCart, cartCtrl.read)
router.put('/:id', authorizationCart, cartCtrl.update)
router.delete('/:id', authorizationCart, cartCtrl.delete)

module.exports = router