const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cartCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationCartItem, authUser} = require('../middlewares/authorization')


router.use(authentication)
router.use(authUser)

router.post('/', cartCtrl.createItem)
router.get('/', cartCtrl.readItem)

router.use(authorizationCartItem)
router.put('/:id', cartCtrl.updateItem)
router.delete('/:id', cartCtrl.deleteItem)

module.exports = router