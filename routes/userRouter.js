const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')


router.post('/login', userCtrl.login)


module.exports = router