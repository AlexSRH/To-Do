const bcrypt = require('bcryptjs')
const { Model, DataTypes } = require('sequelize')
const { v4 } = require('uuid')

class User extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      name: DataTypes.STRING(60),
      email: DataTypes.STRING(90),
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING(140)
    },
    {
      hooks: {
        beforeSave: async user => {
          user.id = v4()

          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      },
      sequelize
    })
  }
}

module.exports = User
