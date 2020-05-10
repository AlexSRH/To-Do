const { Model, DataTypes } = require('sequelize')
const { v4 } = require('uuid')

class ToDoList extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: DataTypes.STRING(35)
    },
    {
      hooks: {
        beforeSave: toDoList => {
          toDoList.id = v4()
        }
      },
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' })
    this.hasOne(models.ToDoItem, { foreignKey: 'to_do_list_id', as: 'to_dos' })
  }
}

module.exports = ToDoList
