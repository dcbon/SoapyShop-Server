const { Cart, Product, Transaction } = require('../models')

class CartCtrl {
  static async create(req,res, next) {
    try {
      let UserId = req.userData.id
      let { ProductId, quantity, status } = req.body
      const data = await Cart.findAll()
      let cart = null
      data.forEach(e => {
        if (e.ProductId === ProductId) e.quantity++
        else cart = await Cart.create(UserId, ProductId, quantity, status)
      });
      console.log(cart, '===cart');
      res.status(201).json({ cart: cart })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add cart');
      next(err)
    }
  }

  static async checkOut (req, res, next) {
    try {
      let UserId = req.userData.id
      let { ProductId, quantity, status } = req.body
      const data = await Product.findByPk(ProductId)
      let updQty = data.quantity - quantity
      let updStat = true
      const updCart = Cart.update({
        UserId, ProductId, updQty, updStat
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      const trans = await Transaction.create({
        CartId: req.params.id,
        UserId,
        updStat
      })
      res.status(200).json({ cart: updCart, trans: trans })
    }
    catch(err) {
      console.log(err, '===create trans upd cart');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Cart.findAll({
        // { include: [{ model: Model1, as: 'Alias' }]}
        include: [{ 
          model: Product
        }],
        where: {
          UserId: req.userData.id,
          status: false
        }
      })
      res.status(200).json({ carts: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read cart');
      next(err)
    }
  }

  static async update(req,res, next) {
    try {
      let UserId = req.userData.id
      let { ProductId, quantity, status } = req.body
      const data = await Cart.update({
        UserId, ProductId, quantity, status
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      res.status(200).json({ cart: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error update cart');
      next(err)
    }
  }
  
  static async delete(req,res, next) {
    try {
      await Cart.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'Cart deleted' })
    } catch(err) {
      console.log(err, '>>>>>>>>> error delete cart');
      next(err)
    }
  }
}

module.exports = CartCtrl