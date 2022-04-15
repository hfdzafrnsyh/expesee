'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todos.init({
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'todos',
  });

  todos.associate = function (models) {
    todos.belongsTo(models.categories, { foreignKey: 'categoryId', as: 'categories' })
  }

  return todos;
};