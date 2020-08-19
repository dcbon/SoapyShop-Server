const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserCtrl {
  static async register(req, res, next) {
    try {
      let {email, password} = req.body
      await User.create({
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

      if (!user) throw { msg: 'Invalid email or password', status: 404}
      let comparedPass = comparePass(password, user.password)
      if (!comparedPass) throw { msg: 'Invalid email or password', status: 401}
      let payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      let token = generateToken(payload)
      res.status(200).json({ access_token: token })
    } catch(err) {
      // console.log(err, '>>>>>>>>login user');
      next(err)
    }
  }}

module.exports = UserCtrl