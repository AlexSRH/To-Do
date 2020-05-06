const { Model, DataTypes } = require('sequelize')

class ToDoList extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING(35)
    }, { sequelize })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' })
  }
}

module.exports = ToDoList
