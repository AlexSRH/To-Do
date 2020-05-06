const Sequelize = require('sequelize')

const dbConfig = require('../config/database')

const User = require('../app/models/User')
const ToDoList = require('../app/models/ToDoList')
const ToDoItem = require('../app/models/ToDoItem')

const connection = new Sequelize(dbConfig)

User.init(connection)
ToDoList.init(connection)
ToDoItem.init(connection)

User.associate(connection.models)
ToDoList.associate(connection.models)
ToDoItem.associate(connection.models)

module.exports = connection
