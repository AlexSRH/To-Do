const { Router } = require('express')

const UserController = require('./app/controllers/UserController')

const routes = Router()

routes.post('/users', UserController.store)

module.exports = routes
