const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize })
  }

  static associate (models) {
    this.hasMany(models.ToDoList, { foreignKey: 'user_id', as: 'to_do_lists' })
  }
}

module.exports = User
