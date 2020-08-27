const router = require('express').Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const cartRouter = require('./cartRouter')


router.get('/', (req,res) => res.status(200).json({msg: 'connected'}))
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/cart', cartRouter)


module.exports = router