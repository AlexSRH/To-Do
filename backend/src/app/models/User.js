const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,

    }, {
    hooks: {
      beforeSave: async user => {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    },
    sequelize})
  }

  static associate (models) {
    this.hasMany(models.ToDoList, { foreignKey: 'user_id', as: 'to_do_lists' })
  }

  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }
}

module.exports = User
