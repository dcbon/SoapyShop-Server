const { Product, User } = require('../models')

class ProductCtrl {
  static async create(req,res, next) {
    try {
      let { name, image_url, price, stock } = req.body
      const data = await Product.create({
        name, 
        image_url, 
        price,
        stock
      })
      res.status(201).json({ product: data })
    } catch(err) {
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Product.findAll({
        include: {
          model: User
        }
      })
      res.status(200).json({ products: data })
    } catch(err) {
      next(err)
    }
  }

  static async update(req,res, next) {
    try {
      let { name, image_url, price, stock } = req.body
      const data = await Product.update({
        name, 
        image_url, 
        price, stock
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      res.status(200).json({ product: data })
    } catch(err) {
      next(err)
    }
  }
  
  static async delete(req,res, next) {
    try {
      const data = await Product.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'Product deleted' })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = ProductCtrl