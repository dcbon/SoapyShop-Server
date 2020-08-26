const express = require('express')
const router = express.Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const authentication = require('../middlewares/authentication')
const {authorizationAdm} = require('../middlewares/authorization')


router.use(authentication)
router.get('/', categoryCtrl.read)
router.use(authorizationAdm)
router.post('/', categoryCtrl.create)
router.put('/:id', categoryCtrl.update)
router.delete('/:id', categoryCtrl.delete)


module.exports = router