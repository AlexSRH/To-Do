const Sequelize = require('sequelize')

const dbConfig = require('../config/database')

const User = require('../app/models/User')
const ToDoList = require('../app/models/ToDoList')
const ToDo = require('../app/models/ToDo')

const connection = new Sequelize(dbConfig)

User.init(connection)
ToDoList.init(connection)
ToDo.init(connection)

User.associate(connection.models)
ToDoList.associate(connection.models)
ToDo.associate(connection.models)

module.exports = connection
