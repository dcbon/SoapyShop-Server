const { Cart, CartItem, Product } = require('../models')

class CartCtrl {
  static async create(req,res, next) {
    try {
      let UserId = req.userData.id
      let { status, subtotal, promo, discount, total } = req.body
      const data = await Cart.create({
        UserId, status, subtotal, promo, discount, total
      })
      res.status(201).json({ cart: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add cart');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      // console.log(req.userData.id, '===userdata');
      const data = await Cart.findAll({
        include: {
          model: Product
        },
        where: {
          UserId: req.userData.id
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
      let { status, subtotal, promo, discount, total } = req.body
      const data = await Cart.update({
        UserId, status, subtotal, promo, discount, total
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


  // cart-item 
  static async createItem(req,res, next) {
    try {
      let { CartId, ProductId, quantity, active } = req.body
      const data = await CartItem.create({
        CartId, ProductId, quantity, active
      })
      res.status(201).json({ item: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add item');
      next(err)
    }
  }

  static async readItem(req,res, next) {
    try {
      const data = await CartItem.findAll({
        include: {
          model: Product
        },
        where: {
          UserId: req.userData.id
        }
      })
      res.status(200).json({ items: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read item');
      next(err)
    }
  }

  static async updateItem(req,res, next) {
    try {
      let { CartId, ProductId, quantity, active } = req.body
      const data = await CartItem.update({
        CartId, ProductId, quantity, active
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      res.status(200).json({ item: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error update item');
      next(err)
    }
  }
  
  static async deleteItem(req,res, next) {
    try {
      await CartItem.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'Item deleted' })
    } catch(err) {
      console.log(err, '>>>>>>>>> error delete item');
      next(err)
    }
  }
}

module.exports = CartCtrl