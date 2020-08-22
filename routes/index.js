const router = require('express').Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')


router.get('/', (req,res) => res.status(200).json({msg: 'connected'}))
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)


module.exports = router