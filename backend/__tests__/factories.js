const { factory } = require('factory-girl')
const { v4 } = require('uuid')
const faker = require('faker')

require('../src/database')
const User = require('../src/app/models/User')

factory.define('User', User, {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

module.exports = factory
