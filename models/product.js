'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    image_url: DataTypes.STRING(1234),
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING(1234),
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Please insert numeric price'
        },
        min: {
          args: [0],
          msg: 'Price cannot be less than 0'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        notNull: {
          msg: 'Price is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Please insert numeric stock'
        },
        min: {
          args: [0],
          msg: 'Stock cannot be less than 0'
        },
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        notNull: {
          msg: 'Stock is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        },
        notNull: {
          msg: 'Category is required'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (product, opt) => {
        if (!product.image_url) product.image_url = 'https://faculty.iiit.ac.in/~indranil.chakrabarty/images/empty.png'
      }
    },
    modelName: 'Product',
  });
  return Product;
};