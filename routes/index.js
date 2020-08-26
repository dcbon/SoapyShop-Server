const router = require('express').Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const cartRouter = require('./cartRouter')
const itemRouter = require('./itemRouter')


router.get('/', (req,res) => res.status(200).json({msg: 'connected'}))
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/cart', cartRouter)
router.use('/item', itemRouter)


module.exports = router