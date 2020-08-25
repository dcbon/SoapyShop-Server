const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/productCtrl')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.get('/', productCtrl.read)
router.use(authorization)
router.post('/', productCtrl.create)
router.put('/:id', productCtrl.update)
router.delete('/:id', productCtrl.delete)


module.exports = router