const { Cart, Product } = require('../models')

class CartCtrl {
  static async create(req,res, next) {
    try {
      let { UserId, ProductId, quantity, status } = req.body
      let product = await Product.findByPk(ProductId)
      let subtotal = quantity * product.price
      console.log(subtotal, '===subtotal');
      const [data, created] = await Cart.findOrCreate({
        where: { ProductId },
        defaults: { UserId, ProductId, quantity, status, subtotal }
      });
      let newData = null
      if (!created) {
        newData = await Cart.update({ quantity: quantity, subtotal: subtotal }, {
          where: {
            ProductId, UserId
          }, 
          returning: true
        })
      } else newData = data
      console.log(data, '===ini data');
      console.log(newData, '===ini newdata');
      res.status(201).json({ cart: newData })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add cart');
      next(err)
    }
  }

  static async checkOut (req, res, next) {
    try {
      let UserId = req.userData.id
      // let { UserId, ProductId, quantity, status } = req.body
      const data = await Cart.findAll({
        where: { UserId }
      })
      data.forEach(e => {
        let newStock = data.Product.stock - data.quantity
        Product.update({ stock: newStock }, { where: { id: e.ProductId }})
        Cart.update({status: true}, {where: {status: false}})
      });
      res.status(200).json({ cart: data })
    }
    catch(err) {
      console.log(err, '===create checkout cart');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Cart.findAll({
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
      let { ProductId, quantity } = req.body
      const data = await Cart.update({
        quantity
      }, {
        where: { 
          UserId,
          ProductId 
        }, 
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
      let UserId = req.userData.id
      let { ProductId } = req.body
      await Cart.destroy({
        where: { 
          UserId,
          ProductId 
        }
      })
      res.status(200).json({ msg: 'Cart deleted' })
    } catch(err) {
      console.log(err, '>>>>>>>>> error delete cart');
      next(err)
    }
  }

  static async orderHistory(req,res, next) {
    try {
      const data = await Cart.findAll({
        include: [{ 
          model: Product
        }],
        where: {
          UserId: req.userData.id,
          status: true
        }
      })
      res.status(200).json({ carts: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read cart');
      next(err)
    }
  }

  static async orderHistoryAdm(req,res, next) {
    try {
      const data = await Cart.findAll({
        include: [{ 
          model: Product
        }],
        where: {
          status: true
        }
      })
      res.status(200).json({ carts: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read cart');
      next(err)
    }
  }

  
}

module.exports = CartCtrl