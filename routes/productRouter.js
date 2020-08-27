const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/productCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationAdm} = require('../middlewares/authorization')


router.get('/', productCtrl.read)
router.use(authentication)
router.use(authorizationAdm)
router.post('/', productCtrl.create)
router.put('/:id', productCtrl.update)
router.delete('/:id', productCtrl.delete)


module.exports = router