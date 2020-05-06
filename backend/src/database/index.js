const Sequelize = require('sequelize')

const dbConfig = require('../config/database')

const UserModel = require('../app/models/User')

const connection = new Sequelize(dbConfig)

UserModel.init(connection)

module.exports = connection
