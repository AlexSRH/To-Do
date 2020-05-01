const Sequelize = require('sequelize')

const dbConfig = require('../config/database')

const User = require('../app/models/User')

const connection = new Sequelize(dbConfig)

User.init(connection)

module.exports = connection
