const { User, Transaction, Cart } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserCtrl {
  static async register(req, res, next) {
    try {
      let {name, email, password} = req.body
      await User.create({
        name,
        email,
        password
      })
      res.status(201).json({msg: `user ${email} registered successfully`})
    } catch(err) {
      // console.log(err, '>>>>>>>>register user');
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) throw { msg: 'Email is not registered', status: 404}
      let comparedPass = comparePass(password, user.password)
      if (!comparedPass) throw { msg: 'Invalid email or password', status: 401}
      let payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      let token = generateToken(payload)
      res.status(200).json({ access_token: token, id: user.id, name: user.name })
    } catch(err) {
      // console.log(err, '>>>>>>>>login user');
      next(err)
    }
  }

  static async read(req,res, next) {
    try {
      const data = await User.findAll({
        where: {
          role: 'customer'
        }
      })
      res.status(200).json({ users: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read user');
      next(err)
    }
  }
  
  static async delete(req,res, next) {
    try {
      await User.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'User deleted' })
    } catch(err) {
      next(err)
    }
  }


  // transaction

  static async readTrans(req,res, next) {
    try {
      const data = await Transaction.findAll({
        include: {
          model: Cart
        },
        where: {
          UserId: req.userData.id
        }
      })
      res.status(200).json({ transaction: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read transaction');
      next(err)
    }
  }

  static async readTransAdm(req,res, next) {
    try {
      const data = await Transaction.findAll({
        include: {
          model: Cart
        }
      })
      res.status(200).json({ transaction: data })
    } catch(err) {
      console.log(err, '>>>>>>>>> error read transaction adm');
      next(err)
    }
  }
  
  static async deleteTrans(req,res, next) {
    try {
      await Transaction.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ msg: 'Transaction deleted' })
    } catch(err) {
      console.log(err, '>>>>>>>>> error delete transaction');
      next(err)
    }
  }
}

module.exports = UserCtrl