const { factory } = require('factory-girl')
const { v4 } = require('uuid')

require('../src/database')
const User = require('../src/app/models/User')

factory.define('User', User, {
  id: v4(),
  name: 'Alexsandro',
  email: 'aalexo1313@gmail.com',
  password: '123456'
})

module.exports = factory
