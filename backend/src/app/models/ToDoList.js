const { DataTypes, Model } = require('sequelize')

class ToDoList extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize })
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = ToDoList
