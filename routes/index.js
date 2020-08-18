const router = require('express').Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')


router.get('/', (req,res) => res.status(200).json({msg: 'connected'}))
router.use('/products', productRouter)
router.use('/users', userRouter)


module.exports = router