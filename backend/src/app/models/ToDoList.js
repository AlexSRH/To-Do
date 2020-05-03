const { DataTypes, Model } = require('sequelize')

class ToDoList extends Model {
  static init (sequelize) {
    super.init({
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.ToDo, {
      foreignKey: 'to_do_list_id',
      as: 'to_dos'
    })
  }
}

module.exports = ToDoList
