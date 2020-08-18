const { Product } = require('../models')

async function authorization(req, res, next) {
  try {
    let id = req.params.id
    const product = await Product.findByPk(id)
    if (!product) throw { msg: 'Product not found', status: 404 }
    else if (req.userData.id == product.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author');
    next(err)
  }
}

module.exports = authorization