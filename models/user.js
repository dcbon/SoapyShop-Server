'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 12],
          msg: 'Password must be 6 to 12 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        notNull: {
          msg: 'Please enter your password'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashPass(user.password)
        if (!user.role) user.role = 'customer'
        if (!user.name) user.name = 'No Name'
      }
    },
    modelName: 'User',
  });
  return User;
};