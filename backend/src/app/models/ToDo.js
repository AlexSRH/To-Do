const { Model, DataTypes } = require('sequelize')

class ToDo extends Model {
  static init (sequelize) {
    super.init({
      to_do_list_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, { sequelize })
  }

  static associate (models) {
    this.belongsTo(models.ToDoList, {
      foreignKey: 'to_do_list_id',
      as: 'to_do_list'
    })
  }
}

module.exports = ToDo
