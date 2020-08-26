const { Cart, Product, User } = require('../models')

class CartCtrl {
  static async create(req,res, next) {
    try {
      let { UserId, status } = req.body
      const data = await Cart.create({
        UserId, status
      })
      res.status(201).json({ cart: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add cart');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Cart.findAll({
        include: {
          model: User, Product
        },
        where: {
          UserId: req.params.UserId
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
      let { UserId, status } = req.body
      const data = await Cart.update({
        UserId, status
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