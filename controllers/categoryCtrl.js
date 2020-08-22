const { Category, Product } = require('../models')

class CategoryCtrl {
  static async create(req,res, next) {
    try {
      let { name } = req.body
      const data = await Category.create({
        name
      })
      res.status(201).json({ category: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error add category');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await Category.findAll({
        include: {
          model: Product
        }
      })
      res.status(200).json({ categories: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read category');
      next(err)
    }
  }

  static async update(req,res, next) {
    try {
      let { name } = req.body
      const data = await Category.update({
        name
      }, {
        where: { id: req.params.id }, 
        returning: true
      })
      res.status(200).json({ category: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error update category');
      next(err)
    }
  }
  
  static async delete(req,res, next) {
    try {
      await Category.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'Category deleted' })
    } catch(err) {
      console.log(err, '>>>>>>>>> error delete category');
      next(err)
    }
  }
}

module.exports = CategoryCtrl