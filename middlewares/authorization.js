const { Cart, CartItem, Transaction, User } = require('../models')

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
    if (req.userData.id == id) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author user');
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
    console.log(err, '>>>>>>>> author cart');
    next(err)
  }
}

async function authorizationCartItem(req, res, next) {
  try {
    let id = req.params.id
    const item = await CartItem.findByPk(id)
    if (!item) throw { msg: 'item not found', status: 404 }
    else if (req.userData.id == item.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author cart');
    next(err)
  }
}

async function authorizationTrans(req, res, next) {
  try {
    let id = req.params.id
    const trans = await Transaction.findByPk(id)
    if (!trans) throw { msg: 'trans not found', status: 404 }
    else if (req.userData.id == trans.UserId) next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author trans');
    next(err)
  }
}

module.exports = { 
  authorizationAdm, 
  authorizationCart, 
  authorizationCartItem,
  authorizationTrans,
  authUser
}