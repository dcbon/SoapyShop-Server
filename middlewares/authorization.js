const { Cart, Order } = require('../models')

async function authorizationAdm(req, res, next) {
  try {
    if (req.userData.role == 'admin') next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author');
    next(err)
  }
}

async function authorizationCart(req, res, next) {
  try {
    let id = req.params.id
    const cart = await Cart.findByPk(id)
    if (!cart) throw { msg: 'Cart not found', status: 404 }
    else if (req.userData.id == cart.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author');
    next(err)
  }
}

async function authorizationOrder(req, res, next) {
  try {
    let id = req.params.id
    const order = await Order.findByPk(id)
    if (!order) throw { msg: 'Order not found', status: 404 }
    else if (req.userData.id == order.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author');
    next(err)
  }
}

module.exports = { 
  authorizationAdm, authorizationCart, authorizationOrder
}