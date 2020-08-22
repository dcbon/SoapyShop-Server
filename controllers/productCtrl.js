const { Product, Category } = require('../models')

class ProductCtrl {
  static async create(req,res, next) {
    try {
      let { name, image_url, price, stock, CategoryId } = req.body
      const data = await Product.create({
        name, 
        image_url, 
        price,
        stock,
        CategoryId
      })
      res.status(201).json({ product: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add product');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Product.findAll({
        include: {
          model: Category
        }
      })
      res.status(200).json({ products: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read product');
      next(err)
    }
  }

  static async update(req,res, next) {
    try {
      let { name, image_url, price, stock, CategoryId } = req.body
      const data = await Product.update({
        name, 
        image_url, 
        price, 
        stock,
        CategoryId
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      res.status(200).json({ product: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error update product');
      next(err)
    }
  }
  
  static async delete(req,res, next) {
    try {
      await Product.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'Product deleted' })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = ProductCtrl