const { Model, DataTypes } = require('sequelize')

class ToDoItem extends Model {
  static init (sequelize) {
    super.init({
      text: DataTypes.STRING(35),
      checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'to_do_list_id', as: 'to_do_lists' })
  }
}

module.exports = ToDoItem
