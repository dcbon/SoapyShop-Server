const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/productCtrl')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.get('/', productCtrl.read)


router.post('/', authorization, productCtrl.create)
router.put('/:id', authorization, productCtrl.update)
router.delete('/:id', authorization, productCtrl.delete)


module.exports = router