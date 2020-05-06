const { v4 } = require('uuid')
const { Router } = require('express')

const User = require('./app/models/User')

const routes = Router()

User.create({
  id: v4(),
  name: 'Alexsandro G Bezerra',
  email: 'aalexo1313@gmail.com',
  password_hash: '123456'
})

module.exports = routes
