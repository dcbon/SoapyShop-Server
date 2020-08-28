const { Cart } = require('../models')

async function authorizationAdm(req, res, next) {
  try {
    if (req.userData.role == 'admin') next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author adm');
    next(err)
  }
}

async function authUser(req, res, next) {
  try {
    let id = req.userData.id
    const data = Cart.findAll({
      where: {
        id
      }
    })
    if (data) next()
    else throw { msg: 'Cart Not Found', status: 404 }
  }
  catch(err) {
    console.log(id), '===ids';
    console.log(err, '>>>>>>>> author user');
    next(err)
  }
}

async function authorizationCart(req, res, next) {
  try {
    let id = req.params.id
    const cart = await Cart.findOne({
      where: {
        id
      }
    })
    if (!cart) throw { msg: 'Cart not found', status: 404 }
    else if (req.userData.id == cart.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author cart');
    next(err)
  }
}

module.exports = { 
  authorizationAdm, 
  authorizationCart, 
  authUser
}