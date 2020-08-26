'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsToMany(models.Product, {
        through: 'CartItem', 
        foreignKey: 'CartId' 
      });
    }
  };
  Cart.init({
    status: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    promo: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};