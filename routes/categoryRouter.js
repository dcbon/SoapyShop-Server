const express = require('express')
const router = express.Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.get('/', categoryCtrl.read)


router.post('/', authorization, categoryCtrl.create)
router.put('/:id', authorization, categoryCtrl.update)
router.delete('/:id', authorization, categoryCtrl.delete)


module.exports = router