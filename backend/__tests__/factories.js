const { factory } = require('factory-girl')
const faker = require('faker')

require('../src/database')
const User = require('../src/app/models/User')

factory.define('user', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

module.exports = factory
