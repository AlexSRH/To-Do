const { factory } = require('factory-girl')
const faker = require('faker')

require('../../src/database')
const User = require('../../src/app/models/User')
const ToDoList = require('../../src/app/models/ToDoList')
const ToDoItem = require('../../src/app/models/ToDoItem')

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define('ToDoList', ToDoList, {
  name: 'Tarefas de Casa'
})

factory.define('ToDoItem', ToDoItem, {
  text: 'Tarefa de Matemática'
})

module.exports = factory
