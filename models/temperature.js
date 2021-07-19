'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temperature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Temperature.init({
    number: DataTypes.INTEGER,
    temperature: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Temperature',
  });
  return Temperature;
};